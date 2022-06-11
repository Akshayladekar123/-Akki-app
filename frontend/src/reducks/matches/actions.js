export const FETCH_MATCHES = "FETCH_MATCHES";
export const fetchMatchesAction = (matches) => {
    return {
        type: "FETCH_MATCHES",
        payload: {
            matches
        }
    }
}