import React, { useState } from "react";
import Feed from "./components/Feed";
import CheckLogin from "./components/CheckLogin";
import { BrowserRouter as Router } from "react-router-dom";
import {loginPagePath, mainPagePath, DetailPagePath} from "./constants/RouteConstants";
import { Flowbite } from "flowbite-react";
import { Routes, Route, Navigate } from "react-router-dom";
import DetailSession from "./subcomponents/UserDetail/DetailSession";

function App() {
  // const [data, setData] = React.useState(null);
  const [darkTheme, setDarkTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  var showRestrictedRouteRequiringPayments = false;
  // change later
  // if (user && user["paid_user"] != 0) {
  //   showRestrictedRouteRequiringPayments = true;
  // }
  return (
    <Router>
      <Flowbite
      theme={{
        dark: darkTheme,
      }}>
        <Routes>
          <Route path={loginPagePath} element={<CheckLogin darkTheme={darkTheme} setIsLoggedInParent={setIsLoggedIn} showRestrictedRouteRequiringPayments={showRestrictedRouteRequiringPayments} />}></Route>
          <Route path = {DetailPagePath} element = {<DetailSession></DetailSession>}></Route>
          <Route path={mainPagePath} element={<Feed />} />
        </Routes>
      </Flowbite>
    </Router >
  );
}

export default App;
