import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  AntDesignOutlined,
  UserOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Avatar, Tooltip, Badge, Progress, Button } from "antd";
export default function ProjectComp({ handleClick, project, formatDate }) {
  return (
    <div className="project-component-hero">
      <div className="overview-info-comp">
        <VisibilityOutlinedIcon
          style={{
            fontSize: "small",
            padding: "0.125rem 0.25rem",
          }}
        />{" "}
        Under Review
      </div>
      <div className="projectInfoComp">
        <div className="projectHead">
          <span>Project Name</span>
          <span>Description</span>
          <span>Asignee</span>
          <span>Due Date</span>
          <span>Status</span>
          <span>Progress</span>
        </div>
        {project.map((p) => (
          <div className="projectComponent-hero">
            <span onClick={() => handleClick(p)} className="projectname-css">
              {p.projectTitle}
            </span>
            <span>{p.description}</span>
            <span>
              <Avatar.Group
                max={{
                  count: 2,
                  style: {
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  },
                }}
              >
                {p.members.map((member) => (
                  <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                    }}
                  >
                    {Array.from(member.name)[0]}
                  </Avatar>
                ))}
              </Avatar.Group>
            </span>
            <span>{formatDate(p.deadline)}</span>
            <span>
              <Badge
                status="success"
                text="Urgent"
                style={{
                  border: "1px solid #fff2f2",
                  padding: "0.12rem 0.5rem",
                  borderRadius: "0.25rem",
                }}
              />
            </span>
            <span>
              <Progress
                percent={50}
                size="small"
                status="exception"
                style={{ width: "8rem" }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
