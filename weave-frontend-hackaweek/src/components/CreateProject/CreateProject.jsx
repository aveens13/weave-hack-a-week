import "./createproject.css";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Member from "./Member";
import { Button, Select } from "antd";
import { UserContext } from "../../App";
export default function CreateProject(props) {
  const user = React.useContext(UserContext);
  const [members, setMembers] = useState([user.data.email]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [org, setOrg] = useState(null);
  const [fillValue, setFillValue] = useState([
    {
      value: null,
      label: "Personal Project",
    },
  ]);
  const [loading, setLoading] = useState(false);
  // Run this code only once when the component mounts or when `props.notificationforcall.data` changes
  useEffect(() => {
    if (props.notificationforcall?.data) {
      const newValues = props.notificationforcall.data.map((notification) => {
        const formattedDeadline = new Date(
          notification.timeOfDeliver
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return {
          value: `Kathmandu University (${formattedDeadline})`,
          label: `Kathmandu University (${formattedDeadline})`,
        };
      });

      setFillValue((prev) => [...prev, ...newValues]);
    }
  }, [props.notificationforcall?.data]);

  function handleAddmember(event) {
    event.preventDefault();
    fetch(`/api/checkmail/${email}`).then((response) => {
      if (response.ok) {
        response.json().then((e) => {
          setError(false);
          setMembers((prev) => {
            return [...prev, email];
          });
        });
      } else {
        setError(true);
      }
    });
  }

  useEffect(() => {
    console.log(members);
  }, [members]);

  function handleaddEmail(event) {
    setEmail(event.target.value);
  }

  //Handle the cross button on the member
  function handleCross(id) {
    setMembers((prev) => {
      return prev.filter((email) => {
        return email != id;
      });
    });
  }

  function handleChange(value) {
    setOrg(value.value);
  }
  // Handle the form
  const handleForm = async (event) => {
    setLoading(true);
    console.log("called");
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    let circulartoPlain = Object.fromEntries(formData);
    circulartoPlain = {
      ...circulartoPlain,
      members: members,
      organization: org,
    };
    const formDataJsonString = JSON.stringify(circulartoPlain);

    const response = await fetch("http://localhost:8000/api/create-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString,
    });

    response.json().then((e) => {
      setLoading(false);
      props.close();
    });
  };
  return (
    <div className="create_projects_main">
      <div className="project_card">
        <form onSubmit={handleForm}>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            name="projectTitle"
            id="Title"
            placeholder="Project Title"
          />
          <div className="deadline_section">
            <div className="date">
              <label htmlFor="date">Deadline</label>
              <input type="date" name="deadline" id="date" />
            </div>
            <div className="tags">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="nodejs, python"
              />
            </div>
          </div>
          <label htmlFor="organization">
            If you are creating this project for Organization choose your
            organization with deadline shown in the bracket as organization
            deadline for the call.
          </label>

          <Select
            labelInValue
            defaultValue={{
              value: null,
              label: "Personal Project",
            }}
            style={{
              width: "20rem",
            }}
            onChange={handleChange}
            options={fillValue}
          />
          <label htmlFor="add-members">Add members</label>
          <input
            type="email"
            id="add-members"
            name="members"
            placeholder="Member email"
            onChange={handleaddEmail}
          ></input>
          <button
            className={
              members.length === 0 && !error
                ? "add-button"
                : "add-button update"
            }
            onClick={handleAddmember}
          >
            <AddIcon fontSize="1rem" /> Add
          </button>
          <p className={error ? "email-error" : "email"}>
            User with that mail does not exist
          </p>
          <ul className="member-card">
            {members.map((member) => (
              <Member member={member} handleCross={handleCross} />
            ))}
          </ul>
          <div className="create-button">
            <Button
              type="primary"
              htmlType="submit"
              color="default"
              variant="solid"
              loading={loading}
            >
              Create
            </Button>
            {/* <input type="submit" value="Create" /> */}
          </div>
        </form>
      </div>
    </div>
  );
}
