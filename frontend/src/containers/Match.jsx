import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatches } from "../reducks/matches/selectors";
import { fetchMatches } from "../reducks/matches/operations";
import Header from "../components/default/Header";
import MatchList from "../components/match/MatchList";
import Empty from "../components/default/Empty";

import chatIcon from "./../assets/img/icon-chat.svg";

const Match = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const matches = getMatches(selector);

    let [page, setPage] = useState(1);

    const observer = useRef();
    const lastMatchElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && matches.next) {
                setPage(++page);
                dispatch(fetchMatches({ page }));
            }
        });
        if (node) observer.current.observe(node);
    }, [matches.next]);

    useEffect(() => {
        if (matches && matches.results.length === 0) {
            dispatch(fetchMatches({ page }));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="matches">
                <Header />
                {matches.results.length > 0 ?
                    <ul>
                        {matches.results.map((match, index) => {
                            return <MatchList
                                match={match}
                                key={match.id}
                                innerRef={matches.results.length === index + 1 ? lastMatchElementRef : null}
                            />
                        })}
                    </ul>
                    : <Empty icon={chatIcon} message="You haven't matched yet. Let's send likes" />
                }

            </div>
        </>
    )
}

export default Match;