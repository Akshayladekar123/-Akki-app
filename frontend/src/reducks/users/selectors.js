import { createSelector } from "reselect";

const usersSelector = (state) => state.users;
export const getUsers = createSelector(
    [usersSelector],
    state => state
);

const userSelector = (state) => state.users;
export const getUser = createSelector(
    [userSelector],
    state => state.current_user
);

