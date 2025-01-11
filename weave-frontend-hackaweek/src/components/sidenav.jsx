import Logo from "../assets/weave-logo.png";
import Kvothe from "../assets/profile.jpeg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  TaskAltOutlined,
  ExploreOutlined,
  InboxOutlined,
  PushPin,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./sidenav.css";
import { useContext } from "react";
import { UserContext } from "../App";

function SideNav(props) {
  const user = useContext(UserContext);
  return (
    <div className="main_box">
      <div className="logo">
        <img src={Logo} id="logo"></img>
        <span className="text">Weave</span>
      </div>
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
        {/* <a href="#" className="static_option">
          <div className="icon_text">
            <InboxOutlined className="icon" />
            <span>Inbox</span>
          </div>
        </a> */}
      </div>

      {/* <div className="inline_text">Pinned</div>
      <div className="dynamic_options">
        {user.data.pinnedProjects.map((project) => (
          <Link
            to="/project"
            className="dynamic_option"
            onClick={() => props.handlePin(project.projectId)}
          >
            <PushPin />
            <div className="icon_text">{project.projectTitle}</div>
          </Link>
        ))}
      </div> */}
      <div style={{ borderTop: "1px solid #000000" }}></div>
      <div className="profile">
        <div className="image">
          <img src={Kvothe} id="pp"></img>
        </div>
        <Link to="/profile" className="info">
          <p>{user.data.name}</p>
          <p className="userEmail">{user.data.email}</p>
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
