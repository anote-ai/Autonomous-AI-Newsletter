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
    <div className="flex flex-col min-h-screen w-full bg-white">
      <div className="flex-grow h-full w-2/5">
        <div className="SababaTitle">
          <div className="text-wrapper">NWSLTR.AI</div>
        </div>
        {/* <h2 className="titleDescription">
        Search a keyword. Get related news.
      </h2> */}
        {/* <div className="label">
        <p className="text-wrapper">Search a keyword. Get related news.</p>
      </div> */}
        {/* <Button className="mx-auto mb-4" variant="primary" onClick={() => setShowVideoModal(true)}>
        See How It Works
      </Button>
      <Modal size={"7xl"} show={showVideoModal} onClose={() => setShowVideoModal(false)}>
          <Modal.Header className="bg-gray-800 text-white p-4">
              Watch Our Video
          </Modal.Header>
          <Modal.Body className="p-4">
          <div style={{position: "relative", width: "fit-content", height: "fit-content"}}>
              <a style={{position: "absolute", top: "20px", right: "1rem", opacity: 0.8}} href="https://clipchamp.com/watch/UoPz2Tjbykg?utm_source=embed&utm_medium=embed&utm_campaign=watch">
                  <img loading="lazy" style={{height: "22px"}} src="https://clipchamp.com/e.svg" alt="Made with Clipchamp" />
              </a>
              <iframe 
                  allow="autoplay;" 
                  allowFullScreen 
                  style={{border: "none"}} 
                  src="https://clipchamp.com/watch/UoPz2Tjbykg/embed" 
                  width="640" 
                  height="360">
              </iframe>
          </div>

          </Modal.Body>
          <Modal.Footer className="bg-gray-100 p-4">
              <Button color="gray" onClick={() => setShowVideoModal(false)}>
                  Close
              </Button>
          </Modal.Footer>
      </Modal> */}
        {/* <Button className="mx-auto mb-4" variant="primary" onClick={() => setShowVideoModal(true)}>
          See How It Works
      </Button> */}
        {/* <Modal size={"7xl"} show={showVideoModal} onClose={() => setShowVideoModal(false)}>
          <Modal.Header className="bg-gray-800 text-white p-4">
            See How It Works
          </Modal.Header>
          <Modal.Body className="p-4 flex items-center justify-center bg-gray-900"> 
              <div style={{position: "relative", width: "100%", paddingBottom: "56.25%"}}>
                  <a style={{position: "absolute", top: "20px", right: "1rem", opacity: 0.8}} href="https://clipchamp.com/watch/UoPz2Tjbykg?utm_source=embed&utm_medium=embed&utm_campaign=watch">
                      <img loading="lazy" style={{height: "22px"}} src="https://clipchamp.com/e.svg" alt="Made with Clipchamp" />
                  </a>
                  <iframe 
                      allow="autoplay;" 
                      allowFullScreen 
                      style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", border: "none"}} 
                      src="https://clipchamp.com/watch/UoPz2Tjbykg/embed"
                  ></iframe>
              </div>
          </Modal.Body>
      </Modal> */}


        <div class="formBox">
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
              // <button
              //   onClick={onLogin}
              //   type="button"
              //   className="login-with-google-btn mt-2"
              // >
              //   Continue with Google
              // </button>
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
      <div className="w-1/2">
        <img src={pic8} alt="A person reading a newspaper" className="absolute right-0 top-0 -translate-x-1/2 z-50" />
        <img src={pic9} alt="A person reading a newspaper" className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
      </div>
    </div>
  );
}

export default NoUserSession;
