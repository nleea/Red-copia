import React, { Suspense, useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Home } from "../../containers/Home";
import { Profile } from "../Main/Profile/Profile";
import { lazy } from "@loadable/component";
import { context } from "../../context/context";
import { Routers } from "./Routers";
import { Logout } from "../Main/Logout/Logout";
import { Spinner } from "../UI/Spinner/Spinner";
import "./Navbar.css";

const LazyLogin = lazy(() => import("../Main/Signin/Login"));
const LazySignup = lazy(() => import("../Main/Signup/Signup"));
const LazyFile = lazy(() => import("../Main/Post/createPost"));
const LazyProfileUser = lazy(() => import("../Main/Profile/User/User"));
const LazyAllPost = lazy(() => import("../../containers/all-post/Allpost"));

export const Navbar = () => {
  const history = useHistory();
  const { dispatch } = useContext(context);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (!userLocal) {
      history.push("/signin");
    } else {
      const user = JSON.parse(userLocal);
      if (user) {
        history.replace("/");
        dispatch({ type: "USER", payload: user });
      }
    }
  }, [dispatch, history]);

  return (
    <>
      <Routers />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/signin">
          <Suspense fallback={<Spinner />}>
            <LazyLogin />
          </Suspense>
        </Route>
        <Route path="/signup">
          <Suspense fallback={<Spinner />}>
            <LazySignup />
          </Suspense>
        </Route>
        <Route path="/create">
          <Suspense fallback={<Spinner />}>
            <LazyFile />
          </Suspense>
        </Route>
        <Route path="/profile/:userId">
          <Suspense fallback={<Spinner />}>
            <LazyProfileUser />
          </Suspense>
        </Route>
        <Route path="/all">
          <Suspense fallback={<Spinner />}>
            <LazyAllPost />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
};
