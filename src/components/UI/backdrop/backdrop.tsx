import React, { useEffect } from "react";
import "./backdrop.css";
import { instance } from "../../../instance-axios";
export const Backdrop = (props: any) => {
  useEffect(() => {
    const handlerPost = async () => {
      console.log(props.data);
      const token = localStorage.getItem("token");
      const resp = await instance.get("/view/post/" + props.data.key, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(resp);
    };
    handlerPost();
  });
  return (
    <div className="backdrop__" onClick={props.close}>
      <div className="backdrop_picture">{props.children}</div>
    </div>
  );
};
