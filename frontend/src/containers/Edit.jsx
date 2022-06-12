import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../reducks/users/selectors';
import { editPost } from '../reducks/posts/operations';
import taskRequest from '../requests/post-request';
import postRequest from '../../src/requests/post-request';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { getPosts } from '../reducks/posts/selectors';
import { Route, Redirect } from 'react-router';

const Edit = () => {
    
    const [values, setValues] = useState({
        post_id: '',
        name: '',
        body:'',
        image:''
    });
    // const [posts, setPosts] = useState([]);
    const  { id } = useParams();
    const dispatch = useDispatch();

    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState([]);


    const selector = useSelector(state => state);
    const postDetails = getPosts(selector);
    
    useEffect(()=>{

        let finpost =  postDetails.results.filter(
            res =>{
                return id == res.id
                }
        )
        setValues(finpost[0]);
    },[]);
    
    console.log("Posts", posts)
    console.log("values",values)


    const handleOnchange = e => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [previewImage, setPreviewImage] = useState(null);
    
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };

      const inputImage = (event) => {
        const file = event.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
        setImage(file);
        setValues({ ...values, image: null });
      };

      const previewImages = values.image;
      console.log(previewImage);

      const inputFile = useRef(null);
        const onButtonClick = () => {
        inputFile.current.click();
  };

    const editPostHandler = async () => {
      console.log("editPostHandler");
      await dispatch(editPost({ ...values, image: image }, values.id));
    
    };

  return (
    <section className="post_form">
            <textarea
                name="body"
                value={values.body}
                placeholder="Tell us anything"
                onChange={handleInputChange}
                required
            ></textarea>
            {/* <input type="file" ref={inputFile} onChange={inputImage} /> */}
            <p>Update Image</p>
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
        
            
            <a href="http://localhost:3000/">
                {' '}
                <button type="button" onClick={editPostHandler}>
                    UPDATE
                </button>
            </a>
        </section>
  )
}

export default Edit;