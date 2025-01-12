import React, { useEffect, useState } from "react";
import "./organization.css";
import "../User/user.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import UnsubscribeOutlinedIcon from "@mui/icons-material/UnsubscribeOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CallToActionOutlinedIcon from "@mui/icons-material/CallToActionOutlined";
import { Input, Button, Modal, AutoComplete, Badge } from "antd";
import SideNav from "../sidenav";
import ProjectComp from "./project/Projectcomp";
import Call from "./project/Call";
import ProjectSubmissionCard from "./project/ProjectSubmissionCard";
export default function Organization() {
  const [isModal, setIsmodal] = useState(false);
  const [isInfotab, setIsinfotab] = useState(false);
  const [action, setAction] = useState("review");
  const [projectData, setProjectData] = useState({});
  const [options, setOptions] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // Use "short" for abbreviated month names like "Feb"
      day: "numeric",
    });
  };
  const handleClick = (projectInfo) => {
    setProjectData(projectInfo);
    setIsinfotab(true);
  };

  const studentsNotSubmitted = [
    {
      name: "Krishna Lamsal",
      email: "krishna@gmail.com",
      university: "Department of CIEG",
      projects: 14,
      status: "active",
      enrolled: "Dec 23, 2020",
    },
    {
      name: "Sashank Baral",
      email: "sashank@gmail.com",
      university: "Department of CSE",
      projects: 12,
      status: "inactive",
      enrolled: "Dec 23, 2020",
    },
    {
      name: "Avinav Bhattarai",
      email: "avinav@outlook.com",
      university: "Department of Che. Eng",
      projects: 9,
      status: "inactive",
      enrolled: "Jan 23, 2020",
    },
    {
      name: "Sulav Pokharel",
      email: "sulav@yahoo.com",
      university: "Department of Pharmacy",
      projects: 18,
      status: "active",
      enrolled: "March 23, 2020",
    },
  ];

  const [project, setProject] = useState([]);

  useEffect(() => {
    fetch(`/api/getorgprojects`).then((response) => {
      response.json().then((e) => {
        console.log(e);
        setProject(e.data);
      });
    });
  }, []);

  useEffect(() => {
    if (project.length > 0) {
      const searchQuery = project.map((p) => ({
        value: p.projectTitle,
      }));
      setOptions(searchQuery);
    }
  }, [project]);

  return (
    <div className="organization--hero">
      <div className="main-page-hero-organization">
        <div className="org-main-hero">
          <div className="top-nav-org-hero">
            <AutoComplete
              style={{
                width: "30rem",
              }}
              options={options}
              placeholder="Search for Projects"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              variant="filled"
            />
            {/* <Input
                placeholder="Search for projects"
                variant="filled"
                style={{
                  padding: "0.5rem 2rem",
                  width: "30rem",
                }}
              /> */}
            <div className="side-settings">
              <div className="padThis">
                <NotificationsActiveOutlinedIcon
                  style={{
                    fontSize: "1.125rem",
                  }}
                />
              </div>
              <Button
                color="default"
                variant="solid"
                onClick={() => setIsmodal(true)}
              >
                <CallToActionOutlinedIcon
                  style={{
                    fontSize: "small",
                  }}
                />{" "}
                Call for Proposals
              </Button>
            </div>
          </div>
          <div className="proposal-status-hero">
            <div className={action == "review" ? "action-border-bottom" : ""}>
              <Button type="text" onClick={() => setAction("review")}>
                <WatchLaterOutlinedIcon
                  style={{
                    fontSize: "small",
                  }}
                />
                Pending Review{" "}
                <Badge count={project.length} showZero color="#faad14" />
              </Button>
            </div>
            <div className={action == "unsubmit" ? "action-border-bottom" : ""}>
              <Button type="text" onClick={() => setAction("unsubmit")}>
                <UnsubscribeOutlinedIcon
                  style={{
                    fontSize: "small",
                  }}
                />
                Unsubmitted <Badge count={25} />
              </Button>
            </div>
            <div className={action == "approve" ? "action-border-bottom" : ""}>
              <Button type="text" onClick={() => setAction("approve")}>
                <CheckBoxOutlinedIcon
                  style={{
                    fontSize: "small",
                  }}
                />
                Approved
                <Badge
                  className="site-badge-count-109"
                  count={109}
                  style={{
                    backgroundColor: "#52c41a",
                  }}
                />
              </Button>
            </div>
          </div>
          {action == "review" ? (
            <ProjectComp
              handleClick={handleClick}
              project={project}
              formatDate={formatDate}
            />
          ) : (
            <div className="project-component-hero">
              <div className="overview-info-comp">
                These Students have yet not submitted projects...
              </div>
              <div className="projectInfoComp">
                <div className="projectHead">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Department</span>
                  <span>Projects</span>
                  <span>Status</span>
                  <span>Enrolled</span>
                </div>
              </div>
              {studentsNotSubmitted.map((p) => (
                <div className="projectComponent-hero">
                  <span className="projectname-css">{p.name}</span>
                  <span>{p.email}</span>
                  <span>{p.university}</span>
                  <span>{p.projects}</span>
                  <span
                    className={
                      p.status == "active"
                        ? "org-active-student"
                        : "org-inactive-student"
                    }
                  >
                    {p.status}
                  </span>
                  <span>{p.enrolled}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal open={isModal} footer="" onCancel={() => setIsmodal(false)}>
        <Call close={() => setIsmodal(false)} />
      </Modal>
      <Modal open={isInfotab} footer="" onCancel={() => setIsinfotab(false)}>
        <ProjectSubmissionCard
          infoProject={projectData}
          info={isInfotab}
          formatDate={formatDate}
        />
      </Modal>
    </div>
  );
}
