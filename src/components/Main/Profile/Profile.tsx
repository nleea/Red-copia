import React, { useEffect, useContext, useState, useRef } from "react";
import { context } from "../../../context/context";
import { useHistory } from "react-router-dom";
import { instance } from "../../../instance-axios";
import { instance_user } from "../../../instance-axios";
import "./profile.css";

const url =
  "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";

export const Profile: React.FC = () => {
  const [post, setPost] = useState<any[]>();
  const { valuesctx, dispatch } = useContext(context);
  const ref = useRef(null);
  const history = useHistory();
  const [user, SetUser] = useState<any>({ name: "" });
  let galery = [<div key={0}></div>];

  useEffect(() => {
    if (!valuesctx) {
      history.replace("/signin");
    } else {
      SetUser(valuesctx);
      const dataprofilePage = async () => {
        try {
          const token = localStorage.getItem("token");
          const datas = await instance.get(
            "http://localhost:3001/post/myPosts",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { data } = datas.data;
          setPost(data);
        } catch (error) {
          console.log("cancel");
        }
      };
      dataprofilePage();
    }
  }, [history, valuesctx]);

  const deletedPost = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await instance.delete(
        `http://localhost:3001/post/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newData = post?.filter((p) => p._id !== res.data.post);
      setPost(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const fileReader = (e: any, reader: any) => {
    let dataUrl: any;
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      dataUrl = reader.result;
      submitHandler(dataUrl);
    };
  };

  function dataURItoBlob(dataURI: string) {
    var binary = atob(dataURI.split(",")[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  const submitHandler = async (src: any) => {
    try {
      if (!src) return;
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", dataURItoBlob(src));
      const res = await instance_user.patch(
        "/profile/image/" + valuesctx._id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.error) {
        return;
      }
      const { email, followers, following, profile, user, _id } = res.data.resp;
      dispatch({
        type: "USER",
        payload: { email, followers, following, profile, user, _id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlerChangeProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      let reader = new FileReader();
      fileReader(e, reader);
    }
  };

  if (post) {
    galery = post.map((v) => (
      <div className={"card"} key={v._id}>
        <div className="card-image waves-effect waves-block waves-light">
          <img
            alt="perfil"
            style={{ width: "160px", height: "160px", margin: "13px 10px" }}
            src={v.url}
            loading="lazy"
            className="activator"
          />
        </div>
        <div className="card-reveal">
          <div>
            <i className="card-title material-icons right">close</i>
            <button className="card-button" onClick={() => deletedPost(v._id)}>
              <i className="material-icons">deleted</i>
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <main
        style={{
          margin: "10px auto",
          minWidth: "300px",
          maxWidth: "550px",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #ccc",
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
          }}
        >
          <section>
            <img
              alt="perfil"
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={
                valuesctx ? (valuesctx.profile ? valuesctx.profile : url) : url
              }
              loading="lazy"
              onClick={() => (ref.current as any).click()}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={ref}
              onChange={handlerChangeProfilePicture}
            />
          </section>
          <section className="infor">
            <h4>{user.user}</h4>
            <section className="infor__data">
              <h6>{post?.length} post</h6>
              <h6>{user.followers ? user.followers.length : 0} follower</h6>
              <h6>{user.following ? user.following.length : 0} following</h6>
            </section>
          </section>
        </div>
        <div>
          <section className="gallery">{galery}</section>
        </div>
      </main>
    </>
  );
};
