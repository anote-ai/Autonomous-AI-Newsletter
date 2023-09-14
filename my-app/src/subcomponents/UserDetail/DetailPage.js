import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
// import { login } from "../../redux/UserSlice";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function LoginComponent(props) {

    const [text, setText] = useState(props.dataCurrent);
    useEffect(() => {
        props.changeState(text);
    }, [text]);
    // function getText() {
    //     props.changeState(text);
    // }

    return (
        <div>
            <div className="flex flex-col items-center">
                <h1>{props.qestionTitle}</h1>
                <TextInput
                    id="dsearch"
                    name="dsearch"
                    required
                    type="text"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    style={{ color: "black", width: "100%" }}
                    className="my-2 w-1/2 mx-auto"
                    value={text}
                ></TextInput>
            </div>
            <div className="flex flex-row items-center justify-around">
                <button
                    onClick={() => {
                        // getText();
                        props.previousPage();
                    }}
                    className="ButtonType6"
                >
                    Previous
                </button>
                <button
                    onClick={() => {
                        // getText();
                        props.nextPage();
                    }}
                    className="ButtonType6"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default LoginComponent;
