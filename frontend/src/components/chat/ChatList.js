
const ChatList = (props) => {
    const { chat, userId } = props.data
	//?NOTE* class right is sender, class left is receiver
	const chatClassName = userId === chat.send_user_id.id ? 'right' : 'left';
    
    if (chatClassName === 'right') {
        return (
            <li key={chat.id} className={chatClassName}>
                <div className="message">{chat.body}</div>
                <img src={chat.send_user_id.main_image} alt="" />
            </li>
        )
    } else {
        return (
            <li key={chat.id} className={chatClassName}>
                <img src={chat.send_user_id.main_image} alt="" />
                <div className="message">{chat.body}</div>
            </li>
        )
    }
}

export default ChatList;