import React, { useState } from "react";
import "./profilepage.css";
import { profileData } from "./data";
import Form from "./Form/form";
import Projects from "./Project/projects";
import Overview from "./Overview/overview";
import { UserContext } from "../../App";
const Profilepage = () => {
  const info = React.useContext(UserContext);
  const [user, setUser] = useState(profileData);
  const [component, showComponent] = useState(<Overview />);
  const [button, setButton] = useState({
    setting: false,
    overview: true,
    project: false,
  });
  let x = 10;
  const { profile, coverPicture, bio, username, alias } = user;

  const handelSetting = () => {
    setButton({ setting: true, overview: false, project: false });
    showComponent(<Form number="x" user={info.data} />);
  };

  const handelProject = () => {
    setButton({ setting: false, overview: false, project: true });
    showComponent(<Projects />);
  };

  const handelOverview = () => {
    setButton({ setting: false, project: false, overview: true });
    showComponent(<Overview />);
  };

  return (
    <div className="profilepage-container">
      {/* <div className='dummy-nav'></div> */}
      <div className="profile-section">
        <img className="cover-image" src={coverPicture} alt="cover picture" />
        <div className="picture-section">
          <img src={profile} alt="profile picture" />
          <h2>{info.data.name}</h2>
          <p>{bio}</p>
        </div>
        {/* navigation*/}
        <div className="profile-navbar-section">
          <button
            className={
              button.overview ? "projects-button active" : "projects-button"
            }
            type="button"
            onClick={handelOverview}
          >
            Overview
          </button>
          <button
            className={
              button.project ? "projects-button active" : "projects-button"
            }
            type="button"
            onClick={handelProject}
          >
            Project
          </button>
          <button
            className={
              button.setting ? "projects-button active" : "projects-button"
            }
            type="button"
            onClick={handelSetting}
          >
            Settings
          </button>
        </div>
        <div className="component-container">{component}</div>
      </div>
    </div>
  );
};

export default Profilepage;
