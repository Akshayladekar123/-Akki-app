import initialState from '../store/initialState';
import * as Actions from './actions';

export const ChatsReducer = (state = initialState.chats, action) => {
    switch (action.type) {
        case Actions.FETCH_CHATS:
            return {
                ...state,
                ...action.payload.chats,
                results: [...action.payload.chats.results, ...state.results]
            }
        case Actions.ADD_CHAT:
            return {
                ...state,
                results: [...state.results, action.payload.chat]
            };
        case Actions.RESET_CHAT:
            return {
                results: [],
                count: 0,
                next: null,
                previous: null,
            };
        default:
            return state;
    }
}
