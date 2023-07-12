import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";

const modalStyle = {
  position: "fixed",
  width: "400px",
  height: "400px",
  borderRadius: "10px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid white",
  boxShadow: " 1px 1px 7px white",

  padding: "40px",
  zIndex: "50",
};
const overlay = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: "50",
};

function Modal({ open, children, onClose, style }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={overlay} />
      <div style={{ ...modalStyle, ...style }}>
        <Button
          onClick={onClose}
          sx={{ position: "absolute", top: "0", right: "0", color: "white" }}
        >
          Close
        </Button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
