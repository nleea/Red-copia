import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { toast, ToastContainer } from "react-toastify";
import { instance } from "../../../instance-axios";
import { context } from "../../../context/context";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

interface DataStruct {
  email: string;
  password: string;
}

const dataUser: DataStruct = {
  email: "",
  password: "",
};

const Signin: React.FC = () => {
  const [data, Setdata] = useState<DataStruct>(dataUser);
  const { dispatch } = useContext(context);
  const history = useHistory();
  const changeDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    Setdata({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    const dataUser = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await instance.post(
        "http://localhost:3001/signin",
        dataUser
      );
      if (response.data.error) {
        if (response.data.error > 1) {
          response.data.error.forEach((message: any) => {
            toast.error(`${message.msg} ${message.param}`);
          });
        } else {
          for (let i = 0; i < response.data.error.length; i++) {
            toast.error(`${response.data.error}`);
          }
        }
        return;
      }
      localStorage.setItem("token", response.data.token);
      delete response.data.user.password;
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({ type: "USER", payload: response.data.user });
      history.replace("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Red Signin</h2>
          <Input
            type="email"
            options={{ placeholder: "email", name: "email" }}
            change={changeDataHandler}
          />
          <Input
            type="password"
            options={{
              placeholder: "Password",
              className: "input-field",
              name: "password",
            }}
            change={changeDataHandler}
          />
          <Button
            options={{ className: "btn waves-effect #64b5f6 blue lighten-2" }}
            submit={submitHandler}
          >
            Login
            <i className="material-icons right">send</i>
          </Button>
          <h5>
            <NavLink to="/signup">Don´t have an acount?</NavLink>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Signin;
