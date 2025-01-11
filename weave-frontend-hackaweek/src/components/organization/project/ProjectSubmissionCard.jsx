import React, { useEffect, useState } from "react";
import { Badge, Button, Avatar, Tooltip } from "antd";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
export default function ProjectSubmissionCard({ infoProject, info }) {
  const [userAction, setUseraction] = useState("comment");
  //   useEffect(setUseraction("comment"), [info]);
  return (
    <div className="card-submit-hero-main">
      <div className="top-submit-navUI">
        <h2>{infoProject.name}</h2>
        <span>
          <Badge status="warning" />
        </span>
      </div>
      <div className="card-action-org">
        <Button
          color="default"
          variant="filled"
          style={{
            fontSize: "small",
          }}
        >
          <CheckCircleOutlinedIcon
            style={{
              fontSize: "small",
            }}
          />
          Accept Project
        </Button>
        <Button
          color="danger"
          variant="filled"
          style={{
            fontSize: "small",
          }}
        >
          <CancelOutlinedIcon
            style={{
              fontSize: "small",
            }}
          />
          Reject Project
        </Button>
        {/* <OpenInFullOutlinedIcon
          style={{
            fontSize: "small",
          }}
        /> */}
      </div>
      <div className="submit-info-project">
        <h3>{infoProject.description}</h3>
        <div className="projectSubmit-status">
          <span>Status</span>
          <div className="status-info-project">In progress</div>
        </div>
        <div className="projectSubmit-status">
          <span>Deadline</span>
          <div className="deadline-info-project">24 Feb, 2025</div>
        </div>
        <div className="projectSubmit-status">
          <span>Members</span>
          <div className="avatar-info-project">Hari , Shyam , Ram</div>
        </div>
        <div className="projectSubmit-status">
          <span>Labels</span>
          <div className="labels-info-project">
            <span>Node.js</span>
            <span>Python</span>
            <span>Backend</span>
          </div>
        </div>
        <div className="user-action-submit">
          <div
            className={userAction == "comment" ? "action-border-bottom" : ""}
          >
            <Button
              color="default"
              variant="text"
              onClick={() => setUseraction("comment")}
            >
              <MapsUgcOutlinedIcon
                style={{
                  fontSize: "small",
                }}
              />{" "}
              Comments
            </Button>
          </div>
          <div
            className={userAction == "details" ? "action-border-bottom" : ""}
          >
            <Button
              color="default"
              variant="text"
              onClick={() => setUseraction("details")}
            >
              <InfoOutlinedIcon
                style={{
                  fontSize: "small",
                }}
              />{" "}
              Details
            </Button>
          </div>
          <div
            className={userAction == "attachment" ? "action-border-bottom" : ""}
          >
            <Button
              color="default"
              variant="text"
              onClick={() => setUseraction("attachment")}
            >
              <AttachFileOutlinedIcon
                style={{
                  fontSize: "small",
                }}
              />
              Attachments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
