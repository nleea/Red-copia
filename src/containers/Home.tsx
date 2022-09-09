import React, { useState, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { context } from "../context/context";
import { useHistory } from "react-router-dom";
import { instance } from "../instance-axios";
import { CardImage } from "./card-image/card_image";
import "./home.css";

export const Home: React.FC = () => {
  const [post, setPost] = useState<any[]>();
  const { valuesctx } = useContext(context);
  const [user, setUser] = useState();
  const history = useHistory();
  let postContent = null;

  useEffect(() => {
    if (!valuesctx) {
      history.replace("/signin");
    } else {
      setUser(valuesctx.user);
      const dataHomePage = async () => {
        try {
          const token = localStorage.getItem("token");
          const datas = await instance.get("/sub/all/post", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { data } = datas.data;
          setPost(data);
        } catch (error) {
          console.log("cancel");
        }
      };
      dataHomePage();
    }
    return () => {
      //cancelToken.cancel("request is cancel");
    };
  }, [history, valuesctx]);

  const like = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const post = await instance.put(
        `/like/${id}`,
        { s: "sss" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  const unlike = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const post = await instance.put(
        `/unlike/${id}`,
        { s: "sss" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  const makeComment = async (text: string, postId: string) => {
    try {
      const token = localStorage.getItem("token");
      return await instance.put(
        `/comment/${postId}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (post) {
    postContent = Object.values(post).map((v, i) => {
      let _like = false;
      if (v.likes) {
        (v.likes as []).forEach((ownerLike: any) => {
          if (ownerLike.name === user) {
            return (_like = true);
          }
        });
      }
      const _date = v.postedAt.split(" ").join("/");
      return (
        <CardImage
          _like={_like}
          image={v}
          like={like}
          unlike={unlike}
          makecomment={makeComment}
          index={i}
          key={i}
          oldLike={v.likes ? v.likes.length : 0}
          createdAt={_date}
        />
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {postContent}
    </>
  );
};
