import React, { createRef, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import ChatList from "../components/chat/ChatList";
import Empty from "../components/default/Empty";
import { addChat, fetchChats, resetChats } from "../reducks/chats/operations";
import { getChats } from "../reducks/chats/selectors";
import { getUser } from "../reducks/users/selectors";
import backBtn from "./../assets/img/icon-arrow.svg";
import chatIcon from "./../assets/img/icon-chat.svg";

const Chat = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const chatRef = createRef()
    let history = useHistory();

    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [body, setBody] = useState("");

    const chats = getChats(selector);
    const user = getUser(selector);

    const matchId = props.match.params.id;

    // Use last chat ID instead of for to filter chat list (Prevent duplicate chat in redux store)
    const lastChats = chats.results[0];
    const chatId = lastChats ? lastChats.id : null;

    useEffect(() => {
        dispatch(resetChats());
        dispatch(fetchChats({ matchId, chatId }));
        // eslint-disable-next-line
    }, []);

    const onNextChat = () => {
        if (!chats.next) return setHasMoreItems(false);
        dispatch(fetchChats({ matchId, chatId }));
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const bodyChatHandler = async () => {
        if (!body.trim()) return;

        // back to the bottom of the chat when send new chat
        chatRef.current.scrollTop = chatRef.current.scrollHeight;

        await dispatch(addChat({ body, matchId }));
        setBody("");
    };

    const backHandler = () => {
        dispatch(resetChats());
        history.goBack()
    };

    // Handle when user click enter type. keyCode 13 => Enter Key
    const onTypeEnter = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            bodyChatHandler()
        }
    };

    return (
        <React.Fragment>
            <div className="chat">
                <header className="chat">
                    <img onClick={backHandler} src={backBtn} alt="" />
                    <div className="name">{props.location.state.partnerName}</div>
                </header>

                <div className="content">
                    <div
                        ref={chatRef}
                        id="scrollableDiv"
                        className="scroll-div"
                        style={{ overflow: "auto", display: "flex", flexDirection: "column-reverse" }}
                    >
                        <InfiniteScroll
                            dataLength={chats.results.length} // Set the length of the data
                            next={onNextChat} // Function to be called to fetches the next data
                            style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                            inverse={true} // Set infinite scroll on top
                            hasMore={hasMoreItems} // Trigger component on whether to call next function or stop
                            scrollableTarget="scrollableDiv"
                        >
                            <ul>
                                {
                                    chats.results.length > 0
                                        ? chats.results.map((chat) => <ChatList key={chat.id} data={{ chat, userId: user.id }} />)
                                        : <Empty icon={chatIcon} message="No chats here yet..." />
                                }
                            </ul>
                        </InfiniteScroll>
                    </div>

                    <div className="send-message">
                        <textarea
                            autoFocus
                            value={body}
                            onChange={handleBodyChange}
                            onKeyDown={(e) => onTypeEnter(e)}
                            name="body"
                            placeholder="Start typing..."
                        ></textarea>
                        <button onClick={bodyChatHandler} type="button"> Send </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Chat;
