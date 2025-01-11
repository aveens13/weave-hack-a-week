import { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDown from "../ProjectHome/Dropdown";

import Overview from "../ProjectHome/Overview/Overview";
import Loader from "../Loader";

export default function ProjectInfo(props) {
  const [drop, setDrop] = useState(false);
  const [loading, setLoading] = useState(true);

  const [projectData, setProjectData] = useState({});

  //Fetch the project data
  const fetchProject = () => {
    fetch(`/api/projectinfo/${props.projectId}`).then((response) => {
      response.json().then((e) => {
        console.log(e);
        setLoading(false);
        setProjectData(e);
      });
    });
  };
  useEffect(fetchProject, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="project-home-hero">
      <div className="document-section">
        <div className="document--hero">
          <div className="top-document-info">
            <ul>
              <li className="top-document">
                <div
                  className="drop-icon"
                  onClick={() =>
                    setDrop((prev) => {
                      return !prev;
                    })
                  }
                >
                  <ArrowDropDownIcon />
                </div>
              </li>
            </ul>
          </div>
          {drop && (
            <DropDown
              project={projectData}
              handleClick={() => setDrop(false)}
            />
          )}
        </div>
      </div>
      <Overview project={projectData} />
    </div>
  );
}
