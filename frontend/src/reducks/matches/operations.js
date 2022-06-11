import API from "../../API"
import { fetchMatchesAction } from "./actions";

const api = new API();

export const fetchMatches = (params = {}) => {
    return async (dispatch) => {
        return api.getMatches(params)
            .then((matches) => dispatch(fetchMatchesAction(matches)))
            .catch((error) => alert(error));
    }
}
