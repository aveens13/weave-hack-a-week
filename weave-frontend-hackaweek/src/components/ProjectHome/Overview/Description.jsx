import "./description.css";
import document from "../../../assets/documents.png";
import { useState, useEffect } from "react";
import image from "../../../assets/image.jpg";
import pdf from "../../../assets/pdf.svg";
import { ModeCommentTwoTone } from "@mui/icons-material";
import Textarea from "./message_component/text_area";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload, Modal } from "antd";
import { UserContext } from "../../../App";

export default function Description({ project, taskInfo }) {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = React.useContext(UserContext);
  //For modal
  const showModal = () => {
    setOpen(true);
  };
  console.log(taskInfo);

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(info);
    fetch(`/api/update/${project.projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: info,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((e) => {
          console.log(e);
        });
      }
    });
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <div className='description--hero'>
      {project.description ? (
        <div className='project-brief'>
          <div className='wrapper-brief'>
            <div className='image-section'>
              <img src={'../../../../public/5.jpg'} alt='' />
            </div>
            <div className='brief-section'>
              <h2 style={{ margin: 16 }}>Project Brief</h2>
              <p>{project.description}</p>
              <div className='file-section'>
                <ul>
                  <li>
                    <img src={pdf} alt='' />
                    <p>Weave-Proposal.pdf</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='key-resources'>
          <h3>Key Resources</h3>
          <div className='resource--card'>
            <div className='image-div'>
              <img src={document} alt='' />
            </div>
            <div className='add-items'>
              <p>
                Allign your team with shared vision with a project brief and
                supporting files.
              </p>
              <div className='add-buttons'>
                <button className='create' onClick={showModal}>
                  Create Project brief
                </button>
                <Upload


                  action={`/api/fileupload/${project.projectId}/${user.data.userId}/proposal`}
                  listType="picture"

                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Proposal</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='completed-tasks'>
        <h3>Completed Tasks</h3>

        <ul>
          {taskInfo.map(
            (task) =>
              task.status === 'completed' && (
                <li>
                  <div className='card-completed-task'>
                    <p className='card-title'>{task.title}</p>
                    <p>{task.info}</p>
                    <div className='footer-section'>
                      <p>{task.name.name}</p>
                      <div className='comments-hero'>
                        <ModeCommentTwoTone />
                      </div>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
      <Modal
        title='Project Description'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Textarea onChange={(info) => setInfo(info)} />
      </Modal>
    </div>
  );
}

import React from 'react';

// const App: React.FC = () => (
//   <Space direction="vertical" style={{ width: '100%' }} size="large">
//     <Upload
//       action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//       listType="picture"
//       maxCount={1}
//     >
//       <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
//     </Upload>
//     <Upload
//       action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//       listType="picture"
//       maxCount={3}
//       multiple
//     >
//       <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
//     </Upload>
//   </Space>
// );

// export default App;
