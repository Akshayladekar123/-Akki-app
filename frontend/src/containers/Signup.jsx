import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { signUp } from "../reducks/users/operations";

import uploadImage from "../assets/img/upload-area.svg";
const SignUp = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    gender: "",
    date_of_birth:"",
    contact_no:""
  };

  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const inputFile = useRef(null);
  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  console.log(values);

 


  const inputImage = (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setImage(file);
  };

  const signUpHandler = async () => {
    if (
      !values.email.trim() ||
      !values.password.trim() ||
      !values.username.trim() ||
      !values.gender.trim() ||
      !values.date_of_birth.trim() ||
      !values.contact_no.trim() ||
      !image
    ) {
      alert(`Please fill out all required form.`);
      return;
    }
    setIsLoading(true);
    await dispatch(signUp({ ...values, main_image: image }));
    setIsLoading(false);
    history.push("/");
  };

  return (
    <React.Fragment>
      <div className="signup">
        <div className="content">
          <h1>Create new account</h1>
          <form action="">
            <input
              onChange={handleInputChange}
              type="text"
              name="username"
              value={values.username}
              placeholder="Name"
            />
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
            <select
              value={values.gender}
              onChange={handleInputChange}
              name="gender"
            >
              <option value="gender">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              onChange={handleInputChange}
              type="date"
              name="date_of_birth"
              placeholder="Date Of Birth"
            />
            
            <input
							onChange={handleInputChange}
							value={values.contact_no}
							name="contact_no"
							type="text"
							placeholder="Enter Phone Number"
						/>

             
            <p>Choose your profile picture</p>
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputFile}
              onChange={inputImage}
            />
            <img
              onClick={onButtonClick}
              name="image"
              type="file"
              src={previewImage ? previewImage : uploadImage}
              className={`upload-area ${previewImage ? "preview-image" : ""}`}
              alt="Upload"
            />
            <button type="button" onClick={signUpHandler} className="btn">
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            <Link to="/sign-in">Already have an account? Sign In</Link>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
