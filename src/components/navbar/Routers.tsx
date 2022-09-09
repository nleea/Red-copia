import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../../context/context";

export const Routers = () => {
  let routes: JSX.Element[] = [<div></div>];
  const { valuesctx } = useContext(context);

  if (valuesctx) {
    routes = [
      <nav key="nav1">
        <div className="nav-wrapper white">
          <NavLink to="/" activeClassName="brand-logo left">
            Red
          </NavLink>
          <ul id="nav-mobile" className="right">
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
            <li>
              <NavLink to="/all">All Post</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          </ul>
        </div>
      </nav>,
    ];
  } else {
    routes = [
      <nav key="nav2">
        <div className="nav-wrapper white">
          <NavLink to="/" activeClassName="brand-logo left">
            CIntagram
          </NavLink>
          <ul id="nav-mobile" className="right">
            <li>
              <NavLink to="/signin">Signin</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul>
        </div>
      </nav>,
    ];
  }
  return <>{routes}</>;
};
