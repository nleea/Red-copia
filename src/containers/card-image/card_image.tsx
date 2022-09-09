import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../../context/context";

export const CardImage: React.FC<{
  image: any;
  index: number;
  like: (id: string) => Promise<any>;
  unlike: (id: string) => Promise<any>;
  makecomment: (text: string, postId: string) => Promise<any>;
  _like: boolean;
  oldLike: number;
  createdAt: string;
}> = (props) => {
  const { valuesctx } = useContext(context);
  const [_like, setLike] = useState(props._like);
  const [likes, setLikes] = useState(props.oldLike);
  const [comment, setComment] = useState<any>({ text: "" });
  const [comments, setComments] = useState<any>(null);

  const handlrerLike = (id: string) => {
    if (_like) {
      props.unlike(id).then((c) => {
        setLikes(c.data.newPost.likes.length);
        setLike((l) => !l);
      });
    } else {
      props.like(id).then((c) => {
        setLikes(c.data.newPost.likes.length);
        setLike((l) => !l);
      });
    }
  };

  const seeComment = (comments: string, postId: string) => {
    props.makecomment(comments, postId).then((c) => {
      const { newPost } = c.data;
      setComments(newPost.comments);
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({ [e.target.name]: e.target.value });
  };

  return (
    <main className="home" key={props.index}>
      <div className="card card-home">
        <h5>
          {props.image.postedBy.name === valuesctx.user ? (
            "TU"
          ) : (
            <NavLink to={{ pathname: `/profile/${props.image.postedBy.id}` }}>
              {props.image.postedBy.name}
            </NavLink>
          )}
        </h5>
        <section className="card-image">
          <img src={props.image.url} alt="" loading="lazy" />
        </section>
        <section>Posted At: {props.createdAt}</section>
        <section className="card-content">
          <i
            className="material-icons utils_margin utils_click"
            onClick={() => handlrerLike(props.image._id)}
            style={_like ? { color: "red" } : { color: "black" }}
          >
            favorite
          </i>
          <i className="material-icons utils_margin">forum</i>
          <i className="material-icons utils_margin">link</i>
          <h6 className="home_likes">{likes} Likes More...</h6>
          <h6>{props.image.title}</h6>
          <p>{props.image.body}</p>
          {comments !== null
            ? comments.map((c: any, index: number) => {
                if (index >= 3) return null;
                return (
                  <h6 key={index}>
                    <span style={{ fontWeight: "bold" }}>
                      {c.postedBy.name}
                    </span>
                    <span>{c.text}</span>
                  </h6>
                );
              })
            : props.image.comments
            ? props.image.comments.map((c: any, index: number) => {
                if (index >= 3) return null;
                return (
                  <h6 key={index}>
                    <span style={{ fontWeight: "bold" }}>
                      {c.postedBy.name}
                    </span>
                    <span>{c.text}</span>
                  </h6>
                );
              })
            : null}
          <input
            type="text"
            placeholder="add a coment"
            onChange={changeHandler}
            name="text"
            value={comment.text}
          />
          <button
            type="submit"
            onClick={() => {
              seeComment(comment, props.image._id);
              setComment({ text: "" });
            }}
          >
            Submit
          </button>
        </section>
      </div>
    </main>
  );
};
