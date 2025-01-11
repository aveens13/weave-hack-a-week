import React, { useEffect, useState, useRef } from "react";
import "./landingpage.css";
import Featurebox from "./feature-box/feature-box";
import boxData from "./feature-box/box-data";
import image from "../../assets/title-picture.png";
import Login from "../login/Login";
import Signup from "../signup/Signup";
// import Modal from "../Modal/Modal";
import { Modal } from "antd";
export const Landingpage = (props) => {
  const [feature, setFeature] = useState(boxData);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  return (
    <div className="landingPage">
      <div className="landingWrapper">
        <nav>
          <h3 className="navbar-weave">Weave</h3>
          <ul className="navbar-links">
            <li>
              <a href="#" className="navbar-link">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link">
                About
              </a>
            </li>
            <li>
              <a href="#" className="navbar-link">
                Contact
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="navbar-signup-button"
            onClick={() => setLogin(true)}
          >
            Sign up/ login
          </button>
        </nav>
        {/* title section */}

        <div className="title-section">
          <article className="title-container">
            <h1 className="title-text">Streamline your</h1>
            <h1 className="title-text second">Project workflow</h1>
            <p className="title-paragraph">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis, unde labore impedit recusandae quae voluptatum ut
              nulla? Ex, necessitatibus error!
            </p>
            <div className="button-container">
              <button
                type="button"
                className="title-button signup"
                onClick={() => setLogin(true)}
              >
                Sign up / login
              </button>
              <button type="button" className="title-button">
                Learn more
              </button>
            </div>
          </article>
          <aside className="title-picture">
            <img src={image} alt="title-picture" />
          </aside>
        </div>
        {/* small box container section */}
        <section className="feature-box">
          {feature.map((feature) => {
            return <Featurebox key={feature.id} {...feature} />;
          })}
        </section>
        <Modal open={login} footer="" onCancel={() => setLogin(false)}>
          <Login
            setState={(status) => props.state(status)}
            handleSignup={() => {
              setSignup(true);
              setLogin(false);
            }}
          />
        </Modal>
        <Modal open={signup} footer="" onCancel={() => setSignup(false)}>
          <Signup
            setState={(status) => props.state(status)}
            handleLogin={() => {
              setSignup(false);
              setLogin(true);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Landingpage;
