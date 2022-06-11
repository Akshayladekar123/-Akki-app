import { createSelector } from "reselect";

const usersSelector = (state) => state.matches;
export const getMatches = createSelector(
    [usersSelector],
    state => state
);