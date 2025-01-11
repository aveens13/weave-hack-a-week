import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  AccessTimeFilledOutlined,
  FilterListOutlined,
  ArrowDropDown,
} from "@mui/icons-material";
import ProjectCard from "./Explore/ProjectCard/ProjectCard";
import CalendarSection from "./Dashboard/calendar";
import DashboardTaskDue from "./Dashboard/dashboard_task_due";
import { Modal, Button, notification } from "antd";
import CreateProject from "./CreateProject/CreateProject";
import { UserContext } from "../App";
function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const user = React.useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState();
  const [task, settask] = useState([]);
  const [create, setCreate] = useState(false);
  const [notificationForcall, setNotificationforcall] = useState([]);
  // const [proj, setProj] = useState([]);
  const [projects, setProjects] = useState([
    // {
    //   projectId: 8,
    //   projectTitle: "Finance Tracker",
    //   tags: ["Finance", "Tools"],
    //   languages: ["Java", "Spring"],
    //   members: [{ name: "Anna" }],
    //   image: "../../../public/3.jpg",
    //   pinned: true,
    // },
  ]);

  useEffect(() => {
    fetch(`/api/project/${user.data.userId}`).then((response) => {
      response.json().then((e) => {
        setProjects(e);
        console.log(e);
      });
    });
  }, [create]);

  useEffect(() => {
    fetch(`/api/${user.data.userId}/tasks`).then((response) => {
      response.json().then((e) => {
        settask(e);
        console.log(e);
      });
    });
  }, []);

  function markRead(key) {
    fetch(`/api/readnotification/${user.data.userId}/${key}`);
    api.destroy(key);
  }

  useEffect(() => {
    fetch(`/api/notification/${user.data.userId}`).then((response) => {
      response.json().then((res) => {
        if (res.success) {
          setNotificationforcall(res);
          res.data.map((resp) => {
            const key = resp.notificationID;
            const btn = (
              <Button
                color="default"
                variant="solid"
                onClick={() => markRead(key)}
              >
                Mark as read
              </Button>
            );
            const deadline = new Date(resp.timeOfDeliver).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
            api["info"]({
              message: "Organization Notice",
              description:
                resp.description +
                "You can create project and choose organizatin corresponding to recent deadline. The deadline is " +
                deadline,
              key,
              btn,
              pauseOnHover: true,
            });
          });
        }
      });
    });
  }, []);

  // Function to toggle the pinned state of a project
  const handlePinToggle = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.projectId === projectId
          ? { ...project, pinned: !project.pinned }
          : project
      )
    );
  };

  function handleClick(id) {
    console.log(id);
    if (open == id) setOpen();
    else setOpen(id);
  }

  return (
    <div className="dashboard_main">
      {contextHolder}
      <div className="dashboard_project_section">
        <div className="dashboard_project_cards">
          {/* Pinned Projects */}
          <div className="dashboard_pinned_projects">
            {projects.some((project) => project.pinned) && (
              <div className="dashboard_pinned_title">
                <h3>Pinned Projects</h3>
                <button
                  id="create_project_pinned"
                  onClick={() => setCreate(true)}
                >
                  <AddIcon /> New Project
                </button>
              </div>
            )}
            <div className="dashboard_pinned_cards">
              {projects
                .filter((project) => project.pinned)
                .map((project) => (
                  <ProjectCard
                    className="project_card_dashboard"
                    key={project.projectId}
                    // tags={project.tags}
                    // languages={project.languages}
                    title={project.projectTitle}
                    // authors={project.members.map((member) => member.name)}
                    // posterUrl={project.image}
                    // pinned={project.pinned}
                    onPinToggle={() => handlePinToggle(project.projectId)}
                  />
                ))}
            </div>
          </div>
          {/* Unpinned Projects */}
          <div className="dashboard_unpinned_projects">
            <div className="dashboard_unpinned_title">
              <h3>My Projects</h3>
              {!projects.some((project) => project.pinned) && (
                <button
                  id="create_project_pinned"
                  onClick={() => setCreate(true)}
                >
                  {" "}
                  <AddIcon /> New Project{" "}
                </button>
              )}
            </div>
            <div className="dashboard_unpinned_cards">
              {projects
                .filter((project) => !project.pinned)
                .map((project) => (
                  <>
                    <ProjectCard
                      className="project_card_dashboard"
                      key={project.projectId}
                      tags={project.tags.split(",")}
                      // languages={project.languages}
                      title={project.projectTitle}
                      authors={project.members.map((member) => member.name)}
                      // posterUrl={project.image}
                      // pinned={project.pinned}
                      onPinToggle={() => handlePinToggle(project.projectId)}
                      handleClick={(id) => {
                        props.handleClick(id);
                        navigate("/project");
                      }}
                      projectId={project.projectId}
                    />
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard_tasks_calendar">
        <DashboardTaskDue tasks={task} />
        <CalendarSection />
      </div>
      <Modal
        title="Create a project"
        // centered
        open={create}
        onOk={() => setCreate(false)}
        onCancel={() => setCreate(false)}
        footer={null}
        // bodyStyle={{ height: 600 }}
        // width={500}
      >
        <CreateProject
          close={() => setCreate(false)}
          notificationforcall={notificationForcall}
        />
      </Modal>
    </div>
  );
}

export default Home;
