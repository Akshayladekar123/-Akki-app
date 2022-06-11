export const FETCH_CHATS = "FETCH_CHATS";
export const fetchChatsAction = (chats) => {
    return {
        type: FETCH_CHATS,
        payload: { chats }
    }
}

export const ADD_CHAT = "ADD_CHAT";
export const addChatAction = (chat) => {
    return {
        type: ADD_CHAT,
        payload: { chat }
    }
}

export const RESET_CHAT = "RESET_CHAT";
export const resetChatAction = () => {
    return {
        type: RESET_CHAT
    }
}
