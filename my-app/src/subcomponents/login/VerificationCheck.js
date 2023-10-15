import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVerification, checkVerification } from "../../redux/UserSlice";
import { TextInput } from "flowbite-react";

function VerificationCheck(props) {
    let dispatch = useDispatch();
    const [verificationToken, setVerificationToken] = useState("");
    const [sendCodeTimer, setSendCodeTimer] = useState(false)

    function onHandleSendVerificationCode() {
        setSendCodeTimer(true)
        const timer = setTimeout(() => {
            setSendCodeTimer(false);
        }, 30000); 
        dispatch(
            getVerification()
        ).then((response) => {
            if (response.payload["status"] == "OK") {
                alert("sended verification code")
            } else {
                props.setStatusMessage(response.payload["status"]);
            }
        });
    }

    function onHandlePressVerification() {
        // props.setStatusMessage("");
        props.setStatusMessage("");
        if (!verificationToken) {
            props.setStatusMessage("Must enter an email address");
        } else {
            dispatch(
                checkVerification({ verificationCode: verificationToken })
            ).then((response) => {
                console.log(response.payload["status"])
                if (response.payload["status"] == "OK") {
                    if ("token" in response.payload) {
                        localStorage.setItem("verificationToken", response.payload["token"]);
                        window.location.reload();
                    }
                } else {
                    props.setStatusMessage(response.payload["status"]);
                }
            });
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Check Email</h1>
            <p className={"resetPasswordText"}>
                Enter Verification Code
            </p>
            <TextInput
                className="searchBoxCommon LoginForm"
                placeholder="Enter Password"
                onChange={(e) => {
                    setVerificationToken(e.target.value);
                }}
                type="password"
                id="dsearch"
                name="dsearch"
            />
            <button
                onClick={() => {
                    onHandleSendVerificationCode();
                }}
                style={{ marginTop: "20px" }}
                className="ButtonType6"
                disabled={sendCodeTimer}
            >
                Send Code
            </button>
            <button
                onClick={() => {
                    onHandlePressVerification();
                }}
                style={{ marginTop: "20px" }}
                className="ButtonType6"
            >
                Confirm
            </button>
            {props.statusMessage && (
                <p style={{ color: "#F65F50" }}>{props.statusMessage}</p>
            )}
        </div>
    );
}

export default VerificationCheck;
