import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Chat from "./containers/Chat";
import Home from "./containers/Home";
import Landing from "./containers/Landing";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/Signup";
import Match from "./containers/Match";
import { fetchUserFromLocalStorage } from "./reducks/users/operations";
import { getUser } from "./reducks/users/selectors";
import MyProfile from "./containers/Profile";
import PostInst from "./containers/PostInst";
import Edit from "./containers/Edit";


const Router = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUser(selector);
  const token = user ? user.token : null;
  useEffect(() => {
    dispatch(fetchUserFromLocalStorage());
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Switch>
        
        <Route exact path={"/"} component={token ? Home : Landing} />
        <Route exact path={"/sign-up"} component={token ? Home : SignUp} />
        <Route exact path={"/sign-in"} component={token ? Home : SignIn} />
        <Route exact path={"/matches"} component={token ? Match : SignIn} />
        <Route exact path={"/matches/:{id}"} component={token ? Chat : Landing} />
        <Route exact path={"/profile"} component={ MyProfile} />
        <Route exact path={'/postinst'} component={PostInst} />
        <Route exact path={"/edit/:{id}/"}/><Edit/><Route/>
        
      </Switch>
    </React.Fragment>
  );
};
export default Router;
