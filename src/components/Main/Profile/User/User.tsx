import React, { useEffect, useContext, useState } from "react";
import { context } from "../../../../context/context";
import { useParams, useHistory } from "react-router-dom";
import { instance_user } from "../../../../instance-axios";
import { Spinner } from "../../../UI/Spinner/Spinner";
import { Button } from "../../../UI/Button";
import { Backdrop } from "../../../UI/backdrop/backdrop";
import "../profile.css";

const ProfileUser: React.FC = () => {
  const [post, setPost] = useState<any[]>();
  const { valuesctx, dispatch } = useContext(context);
  const [loading, setLoading] = useState(false);
  const [backdrop, setbackdrop] = useState(false);
  const history = useHistory();
  const [user, SetUser] = useState<any>({ user: "" });
  const [user_, SetUser_] = useState<any>({ user: "" });
  let galery = [<div key={0}></div>];
  const { userId } = useParams<any>();

  useEffect(() => {
    if (!valuesctx) {
      history.replace("/signin");
    } else {
      setLoading(true);
      SetUser_(valuesctx);
      const userProfile = async () => {
        const token = localStorage.getItem("token");
        const { data } = await instance_user.get(`/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(data.post);
        SetUser(data.user);
        setLoading(false);
      };

      userProfile();
    }
  }, [userId, valuesctx, history]);

  const handlerFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await instance_user.put(
        "/follow",
        { folloId: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      SetUser((prev: any) => {
        return { ...prev, ...data.follow, followers: data.follow.followers };
      });
      dispatch({ type: "USER", payload: data.resp });
    } catch (error) {
      console.log(error);
    }
  };

  const handlerunFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await instance_user.put(
        "/unfollow",
        { folloId: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      SetUser({ ...data.follow, followers: data.follow.followers });
      dispatch({ type: "USER", payload: data.resp });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickClose = () => {
    setbackdrop((p) => !p);
  };

  if (post) {
    galery = post.map((v) => (
      <div className={"card"} key={v._id} onClick={() => setbackdrop(true)}>
        <div className="card-image waves-effect waves-block waves-light">
          <img
            alt="perfil"
            style={{ width: "160px", height: "160px", margin: "13px 10px" }}
            src={v.url}
            loading="lazy"
            className="activator"
          />
        </div>
      </div>
    ));
  }

  let button = (
    <Button
      options={{
        className: "btn waves-effect #64b5f6 blue lighten-2 btn-owner",
      }}
      submit={handlerFollow}
    >
      Follow
    </Button>
  );

  if (user.followers) {
    const follow = (user.followers as []).find((e: any) => {
      return e.id === user_._id;
    });
    if (follow) {
      button = (
        <Button
          options={{
            className:
              "btn btn-danger waves-effect #64b5f6  lighten-2 btn-owner",
          }}
          submit={handlerunFollow}
        >
          Unfollow
        </Button>
      );
    } else {
      button = (
        <Button
          options={{
            className: "btn  waves-effect #64b5f6 blue lighten-2 btn-owner",
          }}
          submit={handlerFollow}
        >
          follow
        </Button>
      );
    }
  }

  return loading ? (
    <Spinner />
  ) : (
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
                user
                  ? user.profile
                  : "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              }
              loading="lazy"
            />
          </section>
          <section className="infor">
            <h4>{user.user}</h4>
            <h4 style={{ fontSize: "20px" }}>{user.email}</h4>
            <section className="infor__data">
              <h6>{post?.length} post</h6>
              <h6>{user?.followers ? user?.followers.length : 0} follower</h6>
              <h6>{user?.following ? user?.following.length : 0} following</h6>
            </section>
            {button}
          </section>
        </div>
        <div>
          <section className="gallery">
            {galery.map((v, i) => {
              if (backdrop) {
                return <Backdrop key={i} close={handleClickClose} data={v} />;
              } else return v;
            })}
          </section>
        </div>
      </main>
    </>
  );
};

export default ProfileUser;
