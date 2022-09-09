import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../../instance-axios";
import "./Signup.css";

interface DataStruct {
  email: string;
  password: string;
  user: string;
}

const dataStruct: DataStruct = {
  email: "",
  user: "",
  password: "",
};

const Signup: React.FC = () => {
  const [data, Setdata] = useState<DataStruct>(dataStruct);
  const history = useHistory();
  const changeDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    Setdata({ ...data, [event.target.name]: event.target.value });
  };

  const submitDataHandler = async () => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("user", data.user);
    try {
      const res = await instance.post(
        "http://localhost:3001/signup",
        {
          ...data,
        },
        {
          headers: {
            Accept: "application/json",
            type: "formData",
          },
        }
      );
      if (res.data.error) {
        for (const key in res.data.error) {
          toast.error(
            `${res.data.error[key].msg} ${res.data.error[key].param}`
          );
        }
        return;
      }
      history.replace("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Red Copy Signup</h2>
          <ToastContainer />
          <Input
            type="text"
            options={{ placeholder: "User", name: "user" }}
            change={changeDataHandler}
            value={data.user}
          />
          <Input
            type="email"
            options={{ placeholder: "Email", name: "email" }}
            change={changeDataHandler}
            value={data.email}
          />
          <Input
            type="password"
            options={{
              placeholder: "Password",
              name: "password",
              className: "input-field",
            }}
            change={changeDataHandler}
            value={data.password}
          />
          <Button
            options={{ className: "btn waves-effect #64b5f6 blue lighten-2" }}
            submit={submitDataHandler}
          >
            Signup
            <i className="material-icons right">send</i>
          </Button>
          <h5>
            <NavLink to="/signin">Already have an acount?</NavLink>
          </h5>
        </div>
      </div>
    </>
  );
};
export default Signup;
