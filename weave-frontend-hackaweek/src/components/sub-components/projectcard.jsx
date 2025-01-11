import React from "react";
import "./projectcard.css";
import Progress from "./progress";
import { MoreHorizOutlined, ArrowDropDown } from "@mui/icons-material";
import { motion } from "framer-motion";
import tg from "../../assets/tag.png";
import avatar from "../../assets/avatars/5.png";
import { Dropdown, Space, notification } from "antd";

function ProCard(props) {
  const [api, contextHolder] = notification.useNotification();
  const tag = props.project.tags.split(",");
  const dateNow = new Date();
  let deadline = new Date(props.project.deadline);
  let daysRemaining = Math.ceil((deadline - dateNow) / (1000 * 60 * 60 * 24));
  const members = props.project.members;
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handlePinProject()}
        >
          Pin this project
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Add members +
        </a>
      ),
      disabled: true,
    },
    {
      key: "3",
      danger: true,
      label: "Delete this project",
      disabled: true,
    },
  ];

  function handlePinProject() {
    console.log("I am here");
    fetch(`/api/pinproject/${props.userId}/${props.project.projectId}`).then(
      (res) => {
        if (res.ok) {
          res.json().then((e) => {
            console.log(e);
            api.info({
              message: `Pinned`,
              description: "Added to your Pinned Projects",
              placement: "topRight",
            });
          });
        } else {
          console.log("Not pinned");
          api.info({
            message: `Already Pinned`,
            description:
              "This Project is already pinned as your pinned projects. Use side navbar to see your pinned projects",
            placement: "bottomRight",
          });
        }
      }
    );
  }

  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0.95 }}
      transition={{ type: "tween", duration: 0.5 }}
      className="main_card"
    >
      {contextHolder}

      <div className="tags">
        {tag.map((tag) => (
          <div className="tag">
            <span>{tag}</span>
          </div>
        ))}
        <div className="meatball_menu">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreHorizOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div
        className="project_info"
        onClick={() => props.handleClick(props.project.projectId)}
      >
        <h3>{props.project.projectTitle}</h3>
      </div>
      <div className="progress_bar">
        <Progress />
      </div>
      <div className="members">
        {members.map((member) => (
          <span>
            <img src={avatar} alt="" />
            <p className="hide">{member.name}</p>
          </span>
        ))}
        <div className="organization">
          <img src={tg} alt="" />
          {props.project.organization ?? <p>{props.project.organization}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export default ProCard;
