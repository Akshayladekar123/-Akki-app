import React, { useRef, useState, useEffect } from "react";
// import { Page, Section } from "react-page-layout";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../assets/img/add-profile.png";
import { updateProfile } from "../reducks/users/operations";
import { getUser } from "../reducks/users/selectors";


export default function MyProfile() {
  const [userValues, setUserValues] = useState({});
  const idval = userValues.id;

  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUser(selector);
  const [values, setValues] = useState({});

  useEffect(() => {
    return ( 
        setValues( {
            id: user.id,
            username: user.username,
            email: user.email,
            profile: user.main_image,
            date_of_birth: user.date_of_birth,
            contact_no: user.contact_no,
            gender: user.gender,
          })
    )
  }, []);
  console.log(user)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  console.log("values",values);

  const [previewImage, setPreviewImage] = useState(null);
  const previewImages = user.main_image

  const inputFile = useRef(null);
  const onButtonClick = () => {
    inputFile.current.click();
  };

  const inputImage = (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setImage(file);
    setValues({ ...values, profile: null });
  };
  const updateProfileHandler = async () => {
    
    setIsLoading(true);
    await dispatch(updateProfile({ ...values, profile: image }, values.id));
  setIsLoading(false);
  };

  return (values &&
        <div className="content">
          <form className="profile">
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
              src={previewImage ? previewImage : previewImages}
              className={`upload-area ${previewImage ? "preview-image" : ""}`}
              alt="Upload"
            />
            <label className="profile-input-label" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              value={values.username}
              name="username"
              className="profile-input"
              placeholder="Type your name"
            />
            <label className="profile-input-label" htmlFor="name">
              Email
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              value={values.email}
              name="email"
              className="profile-input"
              placeholder="Type your mail address"
            />
            <label className="profile-input-label" htmlFor="name">
              Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              value={values.password}
              placeholder="Password"
            />
            <label className="profile-input-label" htmlFor="name">
              Gender
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              name="gender"
              value={values.gender}
            />
            <label className="profile-input-label" htmlFor="name">
              Phone
            </label>
            <input
              onChange={handleInputChange}
              value={values.contact_no}
              name="contact_no"
              type="text"
              placeholder="Enter Phone Number"
            />
            <label className="profile-input-label" htmlFor="name">
              DOB
            </label>
            <input
              onChange={handleInputChange}
              type="date"
              name="date_of_birth"
              placeholder="Date Of Birth"
              value={values.date_of_birth}
            />
            <button
              onClick={updateProfileHandler}
              type="button"
              className="custom-btn"
            >
              Update
            </button>
          </form>
        </div>
  );
}
