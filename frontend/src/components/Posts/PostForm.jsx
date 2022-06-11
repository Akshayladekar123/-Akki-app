import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../reducks/users/selectors';
import { addPost } from '../../reducks/posts/operations';

const PostForm = () => {

    const selector = useSelector((state) => state);
    const user = getUser(selector);

    const dispatch = useDispatch();
    const initialValues = { name: '', body: '' };
    const [values, setValues] = useState(initialValues);
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputFile = useRef(null);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const inputImage = event => {
        const file = event.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
        setImage(file);
    };

    const addPostButton = async () => {
        if ( !values.body.trim()) {
            alert(`Please fill out all required form.`);
            return;
        }
        setIsLoading(true);
        console.log(user.username);
        await dispatch(addPost({ name: user.username, body: values.body, image }));

        setIsLoading(false);
        setValues({ name: '', body: '' });
        setPreviewImage(null);
        setImage([]);
        inputFile.current.value = '';
    };

    return (
        <section className="post_form">
            {/* <input
                type="text"
                name="name"
                value={values.name}
                placeholder="Name"
                onChange={handleInputChange}
                required
            /> */}
            <textarea
                name="body"
                value={values.body}
                placeholder="Tell us anything"
                onChange={handleInputChange}
                required
            ></textarea>
            <input type="file" ref={inputFile} onChange={inputImage} />
            {previewImage && (
                <div className="upload-area">
                    <img
                        name="image"
                        type="file"
                        src={previewImage}
                        className={`upload-image ${previewImage ? 'preview-image' : ''}`}
                        alt="Upload"
                    />
                </div>
            )}
            <a href="http://localhost:3000/">
                {' '}
                <button type="button" onClick={addPostButton}>
                    {isLoading ? 'Posing...' : 'Post'}
                </button>
            </a>
        </section>
    );
};

export default PostForm;
