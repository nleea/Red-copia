import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { context } from "../../../context/context";

export const Logout = () => {
  const history = useHistory();
  const { dispatch } = useContext(context);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.replace("/signin");
    dispatch({ type: "", payload: null });
  });
  return <></>;
};
