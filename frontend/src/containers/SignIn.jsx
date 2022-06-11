import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../reducks/users/operations";

const SignIn = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const signInHandler = async () => {
    if (!values.email.trim()  || !values.password.trim()) {
      alert(`Please fill out Email and Password.`);
      return;
    }
    setIsLoading(true);
    await dispatch(signIn(values));
    setIsLoading(false);

    history.push("/postinst");
  };

  return (
    <React.Fragment>
      <div className="sign-in">
        <div className="content">
          <h1>Sign In</h1>
          <form action="">
            <input
              onChange={handleInputChange}
              type="email"
              name="email"
              value={values.email}
              placeholder="Email Address"
            />
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              value={values.password}
              placeholder="Password"
            />
            <button type="button" onClick={signInHandler} className="btn">
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            <Link to="/sign-up">Create an account? Sign Up</Link>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
