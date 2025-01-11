import React from "react";
import "./projectBox.css";
import SellIcon from "@mui/icons-material/Sell";
const projectBox = ({ project }) => {
  const tags = project.tags.split(",");
  return (
    <>
      <div className="projectBox-container">
        <h3 className="project-tag">{project.organization}</h3>
        <div className="project-title-container">
          <h2 className="project-title">{project.projectTitle}</h2>
        </div>
        <ul className="language-tags">
          {tags.map((tag) => (
            <li>
              {" "}
              <span>
                <SellIcon />
                <p>{tag}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default projectBox;
