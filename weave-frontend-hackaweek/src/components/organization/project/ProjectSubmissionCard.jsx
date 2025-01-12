import React, { useEffect, useState } from "react";
import { Badge, Button, Avatar, Tooltip, Input, message } from "antd";
import pdf from "../../../assets/pdf.svg";
import docx from "../../../assets/docx.png";
import jpeg from "../../../assets/photo.png";
import "../../ProjectHome/File/file.css";
import xlsx from "../../../assets/xlsx.png";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
export default function ProjectSubmissionCard({
  infoProject,
  info,
  formatDate,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [userAction, setUseraction] = useState("comment");
  const [supervisor, setSupervisor] = useState(null);
  const [proposal, setProposal] = useState(null);
  //   useEffect(setUseraction("comment"), [info]);

  //Fetch the files
  useEffect(() => {
    setProposal(null);
    fetch(`/api/fileproposal/${infoProject.projectId}`).then((result) => {
      result.json().then((e) => {
        console.log(e.data);
        setProposal(e.data);
      });
    });
  }, [infoProject?.projectId]);

  const handleAccept = () => {
    if ((supervisor == "") | (supervisor == null)) {
      messageApi.open({
        type: "warning",
        content: "You need to allocate the supervisor to accept the project.",
      });
    } else {
      console.log(supervisor);
    }
  };

  //Download the file
  const downloadFileClicked = (id) => {
    fetch(`/api/file/${id}`)
      .then((result) => {
        const fileName = result.headers.get("Content-Disposition");
        return result.blob().then((blob) => ({ fileName, blob }));
      })
      .then(({ fileName, blob }) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      });
  };
  return (
    <div className="card-submit-hero-main">
      {contextHolder}
      <div className="top-submit-navUI">
        <h2>{infoProject.projectTitle}</h2>
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
          onClick={() => handleAccept()}
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
        <h3>
          {infoProject.description == null
            ? "This project has no description"
            : infoProject.description}
        </h3>
        <div className="projectSubmit-status">
          <span>Status</span>
          <div className="status-info-project">
            {infoProject.visibility.charAt(0).toUpperCase() +
              infoProject.visibility.slice(1)}
          </div>
        </div>
        <div className="projectSubmit-status">
          <span>Deadline</span>
          <div className="deadline-info-project">
            {formatDate(infoProject.deadline)}
          </div>
        </div>
        <div className="projectSubmit-status">
          <span>Members</span>
          <div className="avatar-info-project">
            {infoProject.members.map((member) => (
              <>{member.name}, </>
            ))}
          </div>
        </div>
        <div className="projectSubmit-status">
          <span>Labels</span>
          <div className="labels-info-project">
            {infoProject.tags.split(",").map((tag) => (
              <span key={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <div className="supervisor-assign">
          <Input
            placeholder="Assign a Supervisor"
            variant="filled"
            name="supervisor"
            onChange={(e) => setSupervisor(e.target.value)}
          />
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
        {proposal && userAction == "attachment" ? (
          <ul
            className="file-items"
            onClick={() => downloadFileClicked(proposal.fileId)}
          >
            <li className="file--name">
              {proposal.fileType == "application/pdf" ? (
                <img src={pdf} alt="" />
              ) : proposal.fileType == "docx" ? (
                <img src={docx} alt="" />
              ) : proposal.fileType == "xlsx/excel" ? (
                <img src={xlsx} alt="" />
              ) : (
                <img src={jpeg} alt="" />
              )}
              <div>
                {proposal.fileName?.length > 10
                  ? `${proposal.fileName.slice(0, 10)}...`
                  : proposal.fileName}
              </div>
            </li>
            <li>{proposal.fileType}</li>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
