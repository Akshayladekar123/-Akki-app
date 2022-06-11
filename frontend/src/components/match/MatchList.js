import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "./../../reducks/users/selectors";

const MatchList = (props) => {

    const selector = useSelector((state) => state);
    const user = getUser(selector);

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', { month: 'short', day: '2-digit' })
    }

    let match = props.match;
    let partnerName = match.user_id_1.id !== user.id ? match.user_id_1.username : match.user_id_2.username;

    return (
        <Link to={{
            pathname: `/matches/${match.id}`,
            state: { partnerName }
        }}
            key={match.id}
            ref={props.innerRef} >
            <li>
                <img src={match.user_id_1.id !== user.id ? match.user_id_1.main_image : match.user_id_2.main_image} alt="profile" />
                <div className="right">
                    <strong className="name">{partnerName}</strong>
                    {match.latest_chat ?
                        <p className="message"> {match.latest_chat.body} &nbsp;
                            <span><strong>{formatDate(match.latest_chat.created_at)}</strong></span>
                        </p>
                        : null
                    }
                </div>
            </li>
        </Link>
    )
}

export default MatchList;