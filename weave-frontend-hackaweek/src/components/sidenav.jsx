import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/weave-logo.png";
import Kvothe from "../assets/profile.jpeg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  TaskAltOutlined,
  ExploreOutlined,
  InboxOutlined,
  PushPin,
} from "@mui/icons-material";
import { Button, message, Popconfirm } from "antd";
import { UserContext } from "../App";
import "./sidenav.css";
import { useNavigate } from "react-router-dom";
function SideNav(props) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    fetch("/api/v1/user/logout", {
      method: "POST",
    }).then((result) => {
      if (result.ok) {
        navigate("/");
        window.location.reload(true);
        result.json().then((e) => {
          console.log(e.message);
        });
      }
    });
  }
  return (
    <div className="main_box">
      {/* Logo Section */}
      <div className="logo">
        <img src={Logo} id="logo" alt="Weave Logo" />
        <span className="text">Weave</span>
      </div>

      {/* Menu Section */}
      <div className="inline_text">Menu</div>
      <div className="static_options">
        <Link to="/" className="static_option">
          <div className="icon_text">
            <HomeOutlinedIcon className="icon" fontSize="medium" />
            <span>Home</span>
          </div>
        </Link>
        <a href="#" className="static_option">
          <div className="icon_text">
            <TaskAltOutlined className="icon" />
            <span>Tasks</span>
          </div>
        </a>
        <Link to="/explore" className="static_option">
          <div className="icon_text">
            <ExploreOutlined className="icon" />
            <span>Explore</span>
          </div>
        </Link>
      </div>

      {/* Pinned Projects */}
      <div className="inline_text">Pinned</div>
      <div className="dynamic_options">
        {user.data.pinnedProjects.map((project) => (
          <Link
            to="/project"
            className="dynamic_option"
            onClick={() => props.handlePin(project.projectId)}
            key={project.projectId}
          >
            <PushPin />
            <div className="icon_text">{project.projectTitle}</div>
          </Link>
        ))}
      </div>

      {/* Profile Section */}
      <div className="profile">
        <div className="image">
          <img src={Kvothe} id="pp" alt="Profile" />
        </div>
        <Link to="/profile" className="info">
          <p className="userNameProfile">{user.data.name}</p>
          <p className="userEmail">{user.data.email}</p>
        </Link>
        <Popconfirm
          title="Logout"
          description="Are you sure to Logout?"
          onConfirm={handleLogout}
          okText="Yes"
          cancelText="No"
          color="#f9f9f9"
          okButtonProps={{
            style: {
              backgroundColor: "#ff9f00",
            },
          }}
        >
          <LogoutOutlinedIcon className="profile-logout" />
        </Popconfirm>
      </div>
    </div>
  );
}

export default SideNav;
