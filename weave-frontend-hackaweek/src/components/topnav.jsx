import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./topnav.css";
import {
  AccountCircle,
  NotificationAddOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import Settings from "./sub-components/Settings";

function TopNav() {
  const [settings, setSettings] = useState(false);
  return (
    <div className="top_nav">
      <div className="box">
        <SearchOutlined id="search_icon" />
        <input type="text" id="search" placeholder="Search" />
      </div>

      <div className="icons">
        <a href="#">
          <NotificationAddOutlined className="top_nav_icon" fontSize="medium" />
        </a>
        <a
          onClick={() =>
            setSettings((prev) => {
              return !prev;
            })
          }
        >
          <SettingsOutlined className="top_nav_icon" fontSize="medium" />
        </a>
        <Link to="/profile">
          <AccountCircle className="top_nav_icon" fontSize="medium" />
        </Link>
      </div>
      {settings && <Settings />}
    </div>
  );
}

export default TopNav;
