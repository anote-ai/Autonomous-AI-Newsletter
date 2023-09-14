import React from "react";
import Feed from "./Feed";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoUserSession from "../subcomponents/login/NoUserSession";
import PaymentsComponent from "../subcomponents/payments/PaymentsComponent";
import { useLocation } from "react-router-dom";
import "../styles/Login.css";
import "../styles/MainLayout.css";
import { Checkbox } from "@mui/material";
import { pricingRedirectPath } from "../constants/RouteConstants";
import DetailSession from "../subcomponents/UserDetail/DetailSession";

function CheckLogin(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [productHash, setProductHash] = useState("");
  const [freeTrialCode, setFreeTrialCode] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const sessionToken = localStorage.getItem("sessionToken");
  if (accessToken || sessionToken) {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
    }
  } else {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  }
  if (isLoggedIn && productHash != null && productHash != "") {
    setProductHash("");
    var fullPath = pricingRedirectPath + "?product_hash=" + productHash;
    if (freeTrialCode != null && freeTrialCode != "") {
      setFreeTrialCode("");
      fullPath += "&free_trial_code=";
      fullPath += freeTrialCode;
    }
    navigate(fullPath);
  }

  var mainView = [];
  if (!isLoggedIn) {
    mainView = (
      <NoUserSession productHash={productHash} freeTrialCode={freeTrialCode} />
    );
  } else if (!props.showRestrictedRouteRequiringPayments) {
    mainView = <PaymentsComponent />;
  } else {
    mainView = <DetailSession />;
  }
  // else if (!props.haveUserDetail) {
  //   mainView = <DetailSession />;
  // } else {
  //   mainView = <Feed darkTheme={props.darkTheme} />;
  // }

  useEffect(() => {
    const accessToken = new URLSearchParams(location.search).get("accessToken");
    const refreshToken = new URLSearchParams(location.search).get(
      "refreshToken"
    );
    const productHashStr = new URLSearchParams(location.search).get(
      "product_hash"
    );

    if (productHashStr) {
      setProductHash(productHashStr);
    }
    const freeTrialCodeStr = new URLSearchParams(location.search).get(
      "free_trial_code"
    );

    if (freeTrialCodeStr) {
      setFreeTrialCode(freeTrialCodeStr);
    }

    // Save the tokens in local storage if they exist
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      props.setIsLoggedInParent(true);
      navigate("/");
    }
  }, [location]);

  return <div className="App">{mainView}</div>;
}

export default CheckLogin;
