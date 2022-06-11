import * as Actions from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.FETCH_USERS:
            return {
                ...state,
                ...action.payload,
                results: [...action.payload.results, ...state.results],
            }
        case Actions.SIGN_UP:
            return {
                ...state,
                current_user: action.payload,
            };
        case Actions.SIGN_IN:
            return {
                ...state,
                current_user: action.payload,
            };
        case Actions.SIGN_OUT:
            return {
                ...state,
                current_user: {},
            };
        case Actions.REMOVE_USER:
            return {
                ...state,
                results: state.results.filter((item) => item.id !== action.payload.id)
            };
        default:
            return state;
    }
}
