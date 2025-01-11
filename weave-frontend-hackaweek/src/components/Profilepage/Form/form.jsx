import React from "react";
import "./form.css";
import { FiMail } from "react-icons/fi";

const Form = (props) => {
  return (
    <>
      {/* form */}
      <form action="" className="userdetail-form">
        <div className="input-area">
          <label className="input-label" htmlFor="alias">
            Alias
          </label>
          <input type="text" id="alias" />
        </div>
        <div className="input-area">
          <label
            className="input-label"
            htmlFor="username"
            placeholder={props.user.name}
          >
            Username
          </label>
          <input type="text" id="username" />
        </div>
        <div className="input-area">
          <label
            htmlFor="email"
            className="input-label"
            placeholder={props.user.email}
          >
            Email
          </label>
          <input type="text" id="email" />
        </div>
        <div style={{ display: "flex" }}>
          <label htmlFor="image-input" className="input-label">
            Upload a picture:
          </label>
          <input
            type="file"
            id="image-input"
            name="image"
            className="image-inputbox"
          ></input>
        </div>
        <div className="bio-div">
          <label className="input-label" htmlFor="bio-input">
            Add a short bio
          </label>
          <textarea
            className="bio-input"
            type="text"
            id="bio-input"
            placeholder="Add your bio..."
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Form;
