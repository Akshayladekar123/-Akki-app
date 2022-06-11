import { createSelector } from "reselect";

const chatsSelector = (state) => state.chats;
export const getChats = createSelector(
    [chatsSelector],
    state => state
);
