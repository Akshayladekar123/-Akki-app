export const ADD_LIKE = "ADD_LIKE";
export const addLikeAction = (receive_user_id) => {
    return {
        type: "ADD_LIKE",
        payload: {
            receive_user_id
        }
    }
}