import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../../reducks/users/operations";
import activeMenuIcon from "./../../assets/img/icon.svg";
import menuIcon from "./../../assets/img/icon-gray.svg";
import chatIcon from "./../../assets/img/icon-chat.svg";
import activeChatIcon from "./../../assets/img/icon-chat-green.svg";
import userIcon from "../../assets/img/icon-user.svg";

const Header = () => {
    const dispatch = useDispatch();
    const location = (useLocation());
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = () => {
        dispatch(signOut());
        setIsOpen(!isOpen);
    }

    return (
        <header>
            <Link to="/"><img src={location.pathname === '/' ? activeMenuIcon : menuIcon} alt="menu icon" /></Link>
            <div>
                <img src={userIcon} alt="User icon" onClick={() => setIsOpen(!isOpen)} />
                <Link to="/profile"><img src={location.pathname === '/matches' ? activeChatIcon : chatIcon} alt="chat icon" /></Link>
            </div>
            <div id='custom-modal' className={`custom-modal ${isOpen ? "" : "modal-hide"}`}>
                <div id="custom-modal-close" onClick={() => setIsOpen(!isOpen)} className="custom-modal--bg"></div>
                <div className="custom-modal--container">
                    <div className="custom-modal--content">
                        <div className="modal-content">
                            <strong>Are you sure to logout?</strong>
                            <div>
                                <button onClick={handleSignOut}>Ok</button>
                                <button onClick={() => setIsOpen(!isOpen)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;