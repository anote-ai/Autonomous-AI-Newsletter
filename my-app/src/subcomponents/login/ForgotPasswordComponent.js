import React from "react";
import { useDispatch, useStore } from "react-redux";
import { useEffect, useState, useMemo, useRef } from "react";
import { forgotPassword } from "../../redux/UserSlice";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function ForgotPasswordComponent(props) {
  let dispatch = useDispatch();

  const [email, setEmail] = useState("");

  function onHandlePressForgotPassword() {
    props.setStatusMessage("");
    if (!email) {
      props.setStatusMessage("Must enter an email address");
    } else {
      dispatch(forgotPassword({ email: email }));
      props.setStatusMessage("Password reset link sent to email address");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl my-5 font-semibold">Reset Password</h1>
      <p className={"text-white mx-auto w-2/3 mb-3"}>
        Enter email address and we will send instructions to reset your password
      </p>
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
        className="searchBoxCommonOld LoginForm"
        placeholder="Enter Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        id="dsearch"
        name="dsearch"
      /> */}
      <button
        onClick={() => {
          onHandlePressForgotPassword();
        }}
        className="ButtonType6"
        style={{ marginTop: "20px" }}
      >
        Continue
      </button>
      <p
        className={"UncursorableButton mt-2 mb-4"}
        onClick={() => {
          props.setPageState(1);
        }}
        style={{ color: "#FE603D" }}
      >
        Back to Login
      </p>
      {props.statusMessage && (
        <p style={{ color: "#F65F50" }}>{props.statusMessage}</p>
      )}
    </div>
  );
}

export default ForgotPasswordComponent;
