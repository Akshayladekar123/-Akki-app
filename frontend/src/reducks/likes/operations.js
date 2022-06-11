import API from "../../API"
import { addLikeAction } from "./actions";

const api = new API();

export const addLike = (receive_user_id) => {
    return async (dispatch) => {
        return api.addLike(receive_user_id)
            .then(() => dispatch(addLikeAction(receive_user_id)))
            .catch((error) => alert(error));
    }
}
