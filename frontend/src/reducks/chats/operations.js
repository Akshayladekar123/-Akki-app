import API from '../../API';
import { addChatAction, fetchChatsAction, resetChatAction } from './actions';

const api = new API();

export const fetchChats = (query) => {
    return (dispatch) => {
        return api.getChats(query)
            .then((chats) => {
                dispatch(fetchChatsAction(chats))
            }).catch((error) => {
                alert("Failed to connect API: /chats/")
            });
    }
}

export const resetChats = () => {
    return resetChatAction()
}

export const addChat = (chatBody) => {
    return (dispatch) => {
        return api.addChat(chatBody)
            .then((chats) => {
                dispatch(addChatAction(chats))
            }).catch((error) => {
                alert("Failed to connect API: /chats/add/")
            });
    }
}
