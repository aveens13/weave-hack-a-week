import "../login/login.css";
import Google from "../../assets/google.svg";
import { Button, message, Radio } from "antd";
export default function Signup(props) {
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
      content: "Signing Up...",
    });
    const response = await fetch("/api/v1/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString,
    });
    if (response.ok) {
      response.json().then((e) => {
        console.log(e);
        messageApi.open({
          key,
          type: "success",
          content: "New User Created!",
          duration: 2,
        });
      });
    } else {
      response.json().then((e) => {
        console.log(e);
        messageApi.open({
          key,
          type: "error",
          content: "Error Signing you Up!",
          duration: 2,
        });
      });
    }
  }
  return (
    <>
      {contextHolder}
      <div className="login-registration-form">
        <div className="loginSection">
          <div className="login-card signup">
            <div className="top-section">
              <div>
                <h2>Welcome to Weave</h2>
              </div>
              <div className="grey">Manage your creative space</div>
            </div>
            <div className="signin-options">
              <div className="button-div">
                <img src={Google} alt="Google Logo" />
                <div className="text-button">Contine with google</div>
              </div>
            </div>
            <div className="grey">or</div>
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="username"
                  placeholder="Hari Sharma"
                />
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
                <div className="accountType">
                  <Radio.Group defaultValue="User" className="types">
                    <Radio value="User">User</Radio>
                    <Radio value="Organization">Organization</Radio>
                  </Radio.Group>
                </div>
                <div className="submitbutton">
                  <input
                    className="submitBtn"
                    type="submit"
                    value="Signup"
                  ></input>
                </div>
              </form>
            </div>
            <p className="grey">
              Already have an account?
              <b>
                <a onClick={props.handleLogin}>Login</a>
              </b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
