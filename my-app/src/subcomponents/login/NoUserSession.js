import { useDispatch } from "react-redux";
import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import VerificationCheck from "./VerificationCheck"
import PasswordReset from "./PasswordReset";
import { useLocation } from "react-router-dom";
import googleIcon from '../../assets/google_button_blue_enh.png';
import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';
import pic8 from '../../Images/pic8.png'
import pic9 from '../../Images/pic9.png'

function NoUserSession(props) {
  let dispatch = useDispatch();
  const onLogin = () => {
    dispatch(
      login({
        product_hash: props.productHash,
        free_trial_code: props.freeTrialCode,
      })
    );
  };

  // 1: login
  // 1: sign up
  // 1: forget password
  const [pageState, setPageState] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  function setPageStateWithReset(newState) {
    setPageState(newState);
    setStatusMessage("");
  }

  const location = useLocation();
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordCode, setForgotPasswordCode] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    const codeParam = queryParams.get("passwordResetCode");

    if (emailParam && codeParam) {
      setForgotPasswordEmail(emailParam);
      setForgotPasswordCode(codeParam);
      setPageState(4);
    }
  }, []);

  return (
    // <div className=" bg-gray-800 min-h-screen">
    <div className="flex min-h-screen justify-start w-full bg-white">
      <div className="flex-grow h-full w-2/5">
        <div className="NewsletterTitle">
          <div className="text-wrapper">NWSLTR.AI</div>
        </div>

        <div class="formBox z-50 relative">
          <div class="formContent">
            {pageState == 1 && (
              <LoginComponent
                setPageState={setPageStateWithReset}
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
              />
            )}
            {pageState == 2 && (
              <SignUpComponent
                setPageState={setPageStateWithReset}
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
              />
            )}
            {pageState == 3 && (
              <ForgotPasswordComponent
                setPageState={setPageStateWithReset}
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
              />
            )}
            {pageState == 4 && (
              <PasswordReset
                forgotPasswordEmail={forgotPasswordEmail}
                forgotPasswordCode={forgotPasswordCode}
                setPageState={setPageStateWithReset}
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
              />
            )}
            {pageState == 5 && (
              <VerificationCheck
                forgotPasswordEmail={forgotPasswordEmail}
                forgotPasswordCode={forgotPasswordCode}
                setPageState={setPageStateWithReset}
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
              />
            )}
            {pageState != 3 && pageState != 4 && pageState != 5 && (
              <p className="text-center my-4">
              </p>
            )}
            {pageState != 3 && pageState != 4 && pageState != 5 && (
              <button
                onClick={onLogin}
                type="button"
                className="login-with-google-btn-new"
                style={{ backgroundImage: `url(${googleIcon})`, textColor: "transparent" }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-2/5 ml-auto">
        <img src={pic8} alt="A person reading a newspaper" className="absolute right-0 top-0 -translate-x-1/2 z-30 w-2/6" />
        <img src={pic9} alt="A person reading a newspaper" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-3/6" />
      </div>
    </div>
  );
}

export default NoUserSession;
