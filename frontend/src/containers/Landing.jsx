import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/img/icon.svg";
const Landing = () => {
  let history = useHistory();

  const signInHandler = () => {
    history.push("sign-in");
  };

  const signUpHandler = () => {
    history.push("sign-up");
  };

  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="landing-content">
          <img src={logo} alt="E-link Logo" />
          <button onClick={signInHandler} className="btn green-btn">
            Sign In
          </button>
          <button onClick={signUpHandler} className="btn">
            Sign Up
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;
