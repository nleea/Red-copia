import React, { useState, useEffect } from "react";
import { instance } from "../../../instance-axios";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { Spinner } from "../../UI/Spinner/Spinner";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./createPost.css";
import "react-toastify/dist/ReactToastify.css";

interface StructObject {
  title: string;
  body: string;
  image: any;
  url: string;
}

const Data: StructObject = {
  body: "",
  title: "",
  image: "",
  url: "",
};

const CreatePost: React.FC = () => {
  const [data, Setdata] = useState<StructObject>(Data);
  const [loading, setloading] = useState(false);
  const [src, Setsrc] = useState("");
  const [token, setToken] = useState<string | null>();
  const history = useHistory();
  let content = <div></div>;
  const fileReader = (e: any, reader: any) => {
    let dataUrl: any;
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      dataUrl = reader.result;
      Setsrc(dataUrl);
    };
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      let reader = new FileReader();
      fileReader(e, reader);
      // Setdata({ ...data, [e.target.name]: e.target.files[0] });
    }
    Setdata({ ...data, [e.target.name]: e.target.value });
  };

  function dataURItoBlob(dataURI: string) {
    var binary = atob(dataURI.split(",")[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  const submitHandler = async () => {
    try {
      if (!src) return;
      setloading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("body", data.body);
      formData.append("file", dataURItoBlob(src));
      const res = await instance.post(
        "http://localhost:3001/post/create",
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
      toast.success("new post create");
      Setdata({ body: "", title: "", image: "", url: "" });
      history.replace("/");
    } catch (error) {
      toast.error("hoho wrong");
    }
  };

  content = (
    <div className="card input-field input_style">
      <Input
        type="text"
        options={{ placeholder: "Title", name: "title" }}
        change={changeHandler}
        value={data.title}
      />
      <Input
        type="text"
        options={{ placeholder: "Body", name: "body" }}
        change={changeHandler}
        value={data.body}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Image</span>
          <Input
            type="file"
            options={{ name: "image" }}
            change={changeHandler}
            value={data.image}
          />
        </div>
        <div className="file-path-wrapper">
          <Input
            type="text"
            options={{ className: "file-path validate", name: "file" }}
            change={changeHandler}
            value={data.image}
          />
          <Button
            options={{
              className: "btn waves-effect waves-light #64b5f6 blue darken-1",
            }}
            submit={submitHandler}
          >
            Submit Post
            <i className="material-icons right send">send</i>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      {loading ? <Spinner /> : content}
    </>
  );
};

export default CreatePost;
