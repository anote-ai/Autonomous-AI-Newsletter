import React from "react";
import { useDispatch } from "react-redux";
import { useState, useMemo, useRef } from "react";
import { login } from "../../redux/UserSlice";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function LoginComponent(props) {
  let dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onHandlePressLogin() {
    props.setStatusMessage("");
    if (!email) {
      props.setStatusMessage("Must enter an email address");
    } else if (!password) {
      props.setStatusMessage("Must enter a password");
    } else {
      dispatch(login({ email: email, password: password })).then((response) => {
        if (response.payload["status"] == "OK") {
          console.log(response);
          if ("token" in response.payload) {
            localStorage.setItem("sessionToken", response.payload["token"]);
            props.setPageState(5)
            localStorage.removeItem("verificationToken");
            // window.location.reload();
          }
        } else {
          props.setStatusMessage(response.payload["status"]);
        }
      });
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Log In</h1>
      <TextInput
        id="dsearch"
        name="dsearch"
        placeholder="Enter Email"
        required
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="my-2 w-1/2 mx-auto"
      />
      {/* <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="searchBoxCommonOld LoginForm m-2"
        placeholder="Enter Email"
        type="text"
        id="dsearch"
        name="dsearch"
      /> */}
      <TextInput
        id="dsearch"
        name="dsearch"
        placeholder="Enter Password"
        required
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="my-2 w-1/2 mx-auto"
      />
      {/* <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="searchBoxCommonOld LoginForm mb-4"
        placeholder="Enter Password"
        type="password"
        id="dsearch"
        name="dsearch"
      /> */}
      <p
        className={"UncursorableButton my-4"}
        onClick={() => {
          props.setPageState(3);
        }}
        style={{ color: "#defe47" }}
      >
        Forgot Password?
      </p>
      <button
        onClick={() => {
          onHandlePressLogin();
        }}
        className="ButtonType6"
      >
        Continue
      </button>
      {props.statusMessage && (
        <p style={{ color: "#F65F50" }}>{props.statusMessage}</p>
      )}
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <span
            className={"UncursorableButton"}
            onClick={() => {
              props.setPageState(2);
            }}
            style={{ color: "#defe47" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
