import React, { useEffect, useState } from "react";
import "./organization.css";
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
  const [options, setOptions] = useState([
    {
      value: "Weave",
    },
    {
      value: "Locus-hackaweek",
    },
    {
      value: "Prompt Optimizer",
    },
  ]);

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

  const [project, setProject] = useState([
    {
      name: "Weave",
      description: "Project Management Software",
      priority: "Urgent",
      progress: 50,
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    },
    {
      name: "Locus-hackaweek",
      description: "Edutech Software",
      priority: "Success",
      progress: 100,
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    },
    {
      name: "Prompt Optimizer",
      description: "AI powered optimizer",
      priority: "Urgent",
      progress: 50,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    {
      name: "Generative AI",
      description: "AI powered Art Generator",
      priority: "Success",
      progress: 100,
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    },
  ]);
  return (
    <div className="organization--hero">
      <BrowserRouter>
        <div className="main-page-hero-organization">
          <div className="sidenav">
            <SideNav className="side_nav" />
          </div>
          <div className="org-main-hero">
            <div className="top-nav-org-hero">
              <AutoComplete
                style={{
                  width: "30rem",
                }}
                options={options}
                placeholder="Search for Projects"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
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
              <div
                className={action == "unsubmit" ? "action-border-bottom" : ""}
              >
                <Button type="text" onClick={() => setAction("unsubmit")}>
                  <UnsubscribeOutlinedIcon
                    style={{
                      fontSize: "small",
                    }}
                  />
                  Unsubmitted <Badge count={25} />
                </Button>
              </div>
              <div
                className={action == "approve" ? "action-border-bottom" : ""}
              >
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
              <ProjectComp handleClick={handleClick} project={project} />
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
                    <span
                      onClick={() => handleClick(p)}
                      className="projectname-css"
                    >
                      {p.name}
                    </span>
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
          <Call />
        </Modal>
        <Modal open={isInfotab} footer="" onCancel={() => setIsinfotab(false)}>
          <ProjectSubmissionCard infoProject={projectData} info={isInfotab} />
        </Modal>
      </BrowserRouter>
    </div>
  );
}
