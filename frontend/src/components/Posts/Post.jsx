 import React from 'react';
import IconUser from '../../assets/img/user-icon.jpg';
import IconSmallMenu from '../../assets/img/icon-small-menu.svg';
import { deletePost } from '../../reducks/posts/operations';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../reducks/users/selectors';


const Post = React.forwardRef((props, ref) => {
    const { post } = props;
    const dispatch = useDispatch();
    const [menuToggle, setMenuToggle] = useState(false);

    const deleteHandler = () => {
        dispatch(deletePost(post.id));
    };

    const settingHandler = () => {
        setMenuToggle(!menuToggle);
    };

    const getDate = date => {
        return new Date(date).toLocaleDateString('en-Us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const selector = useSelector((state) => state);
    const user = getUser(selector);



    return (
        <li ref={ref}>
            <img className="menu_icon" onClick={settingHandler} src={IconSmallMenu} alt="setting" />
            {menuToggle && (
                <div className="menu">
                
                    <Link to={`/edit/` + post.id}>
                          <button class="button"> Edit</button>
                    </Link>
                    <br/>
                    <br/>
                    <button onClick={deleteHandler}>Delete</button>
                </div>
            )}
            <div className="logo">
                <img src={user.main_image} alt="user-profile" />
            </div>
            <div className="name_body">
                <div className="name">{post.name}</div>
                <div className="datetime">{getDate(post.created_at)}</div>
                <p className="body">{post.body}</p>
                {post.image && (
                    <a href={post.image} target="_blank" rel="noopener noreferrer">
                        <img className="post-image" src={post.image} alt="thumbnail" />
                    </a>
                )}
            </div>
        </li>
    );
});

export default Post;
