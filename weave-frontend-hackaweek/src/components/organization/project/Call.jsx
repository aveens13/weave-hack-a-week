import React, { useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { Input, Timeline } from "antd";
const { TextArea } = Input;
export default function Call(props) {
  const user = React.useContext(UserContext);

  // Handle the form
  const handleForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    let circulartoPlain = Object.fromEntries(formData);
    const formDataJsonString = JSON.stringify(circulartoPlain);
    console.log(formDataJsonString);
    const response = await fetch("/api/pushcallforproposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString,
    });
    // props.close();
    console.log(response);
  };
  return (
    <div className="create_projects_main">
      <div className="project_card">
        <form onSubmit={handleForm}>
          <label htmlFor="Title">Proposal Description</label>
          {/* <textarea
            type="text"
            name="projectTitle"
            id="Title"
            placeholder="Add project description to your users"
                  /> */}
          <TextArea
            placeholder="Add project description to your users"
            autoSize
            name="projectDescription"
          />
          <div className="deadline_section">
            <div className="date">
              <label htmlFor="date">Deadline</label>
              <input type="date" name="deadline" id="date" />
            </div>
          </div>
          <div className="timeline-call">
            <Timeline
              style={{ fontSize: "small" }}
              items={[
                {
                  children: "Call for proposals on 2025-01-13",
                },
                {
                  children: "Submit Project by 2025-01-20",
                },
                {
                  children: "Project Review Completion 2025-02-01",
                },
                {
                  children: "Supervisor allocation  2025-02-05",
                },
              ]}
            />
          </div>
          <div className="create-button">
            <input type="submit" value="Call" />
          </div>
        </form>
      </div>
    </div>
  );
}