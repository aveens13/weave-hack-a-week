import React, { useState } from "react";
import "./uploader.css";
import { UserContext } from "../../../App";
export default function Uploader({ close, project }) {
  const [file, setFile] = useState("");
  const user = React.useContext(UserContext);
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function fileUpload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `/api/fileupload/${project.projectId}/${user.data.userId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      response.json().then((e) => {
        console.log(e);
        close();
      });
    }
  }
  return (
    <div className="container">
      <div className="uploader-card">
        <h3>Upload Files</h3>
        <div className="drop_box">
          <header>
            <h4>Select File here</h4>
          </header>
          <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
          <form>
            <input
              type="file"
              accept=".doc,.docx,.pdf"
              id="fileID"
              onChange={handleChange}
            />
            <button className="btn" onClick={fileUpload}>
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
