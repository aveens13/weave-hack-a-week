import "./login.css";
import { useRef, useEffect } from "react";
import { Button, message } from "antd";
import Google from "../../assets/google.svg";
export default function Login(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const circulartoPlain = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(circulartoPlain);
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    const response = await fetch("/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString,
    });
    if (response.ok) {
      response.json().then((e) => {
        messageApi.open({
          key,
          type: "success",
          content: "Loaded!",
          duration: 2,
        });
        props.setState("login");
      });
    } else {
      response.json().then((e) => {
        messageApi.open({
          key,
          type: "error",
          content: "Username or password incorrect!",
          duration: 2,
        });
      });
    }
  }
  return (
    <div className="login-registration-form">
      {contextHolder}
      <div className="loginSection">
        <div className="login-card">
          <div className="top-section">
            <div>
              <h2>Sign in to start Weaving again</h2>
            </div>
            <div className="grey">Manage your creative space</div>
          </div>
          <div className="signin-options">
            <div className="button-div">
              <img src={Google} alt="Google Logo" />
              <div className="text-button">Sign in with google</div>
            </div>
          </div>
          <div className="grey">or</div>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="user@gmail.com"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
              <div className="submitbutton">
                <input
                  className="submitBtn"
                  type="submit"
                  value="Login"
                ></input>
              </div>
            </form>
          </div>
          <p className="grey">
            Don't have an account?{" "}
            <b>
              <a onClick={props.handleSignup}>Signup</a>
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}
