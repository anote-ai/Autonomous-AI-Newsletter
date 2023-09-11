import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import CheckLogin from "./components/CheckLogin";
import PaymentsComponent from "./subcomponents/payments/PaymentsComponent";
import PaymentsProduct from "./subcomponents/payments/PaymentsProduct";
import { BrowserRouter as Router } from "react-router-dom";
import { loginPagePath, mainPagePath, DetailPagePath } from "./constants/RouteConstants";
import {
  accountPath,
  pricingRedirectPath,
} from "./constants/RouteConstants";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";
import { Flowbite } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useUser, viewUser } from "./redux/UserSlice";
import { getDeatil, setCompanyName, setNewsLetterDetail, setIndustry } from './redux/DetailSlice'
import { Routes, Route, Navigate } from "react-router-dom";
import DetailSession from "./subcomponents/UserDetail/DetailSession";

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [haveDeatil, setHaveDetail] = useState(true);
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

  var haveUserDetail = haveDeatil;
  var showRestrictedRouteRequiringUserSession = isLoggedIn;

  let dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(viewUser());
      async function getDeatilData() {
        let data = await dispatch(getDeatil())
        console.log(data);
        if (data.payload !== false) {
          dispatch(setCompanyName(data.payload.companyName))
          dispatch(setNewsLetterDetail(data.payload.newsLetterDetail))
          dispatch(setIndustry(data.payload.industry))
          setHaveDetail(true);
        }
        else {
          setHaveDetail(false);
        }
      }
      getDeatilData();
      // dispatch(refreshCredits());
    }
  }, [isLoggedIn]);

  let user = useUser();

  var showRestrictedRouteRequiringPayments = false;
  if (user && user["paid_user"] != 0) {
    showRestrictedRouteRequiringPayments = true;
  }

  // if (user && user["email"]) {
  //   var userEmail = user["email"];
  //   if (
  //     userEmail == "t.clifford@wustl.edu" ||
  //     userEmail == "vidranatan@gmail.com" ||
  //     userEmail == "raghuwanshi.rajat10@gmail.com"
  //   ) {
  //     showRestrictedRouteRequiringPayments = true;
  //   }
  // }

  var routes = [
    <Route
      index
      element={
        <CheckLogin darkTheme={darkTheme} setIsLoggedInParent={setIsLoggedIn} showRestrictedRouteRequiringPayments={showRestrictedRouteRequiringPayments} haveUserDetail={haveUserDetail} />
      }
    />,
    showRestrictedRouteRequiringUserSession && showRestrictedRouteRequiringPayments ? (
      <Route path={DetailPagePath} element={<DetailSession />} />
    ) : null,
    showRestrictedRouteRequiringUserSession && showRestrictedRouteRequiringPayments ? (
      <Route path={mainPagePath} element={<Feed darkTheme={darkTheme}  />} />
    ) : null,
    showRestrictedRouteRequiringUserSession ? (
      <Route path={accountPath} element={<PaymentsComponent />} />
    ) : null,
    showRestrictedRouteRequiringUserSession ? (
      <Route path={pricingRedirectPath} element={<PaymentsProduct />} />
    ) : null,
  ];

  return (
    <Router>
      <Flowbite
        theme={{
          dark: darkTheme,
        }}
      >
        <div className="DashboardView flex flex-col min-h-screen">
          <div id="wrapperDiv" className="flex-grow">
            {isLoggedIn && (
              <MainNav
                // darkTheme={darkTheme}
                // setDarkTheme={setDarkTheme}
                setIsLoggedInParent={setIsLoggedIn}
              />
            )}
            <Helmet>
              <title>Ai News Letter</title>
            </Helmet>
            {/* {isLoggedIn && <Header />} */}
            {/* {isLoggedIn && <SideNav setIsLoggedInParent={setIsLoggedIn} />} */}
            <Routes>
              {routes}
              {/* <Route path={tosPath} element={<TermsOfService />} />
              <Route path={privatePolicyPath} element={<PrivatePolicy />} />
              <Route path={optOutPath} element={<OptOut />} /> */}
              <Route path={DetailPagePath} element={<DetailSession></DetailSession>}></Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
            {/* {!showRestrictedRouteRequiringPayments && <Navigate to={accountPath} />}, */}
          </div>
          <Footer />
        </div>
      </Flowbite>
    </Router>
  )
  // return (
  //   <Router>
  //     <Flowbite
  //     theme={{
  //       dark: darkTheme,
  //     }}>
  //       <Routes>
  //         <Route path={loginPagePath} element={<CheckLogin darkTheme={darkTheme} setIsLoggedInParent={setIsLoggedIn} showRestrictedRouteRequiringPayments={showRestrictedRouteRequiringPayments} />}></Route>
  //         <Route path = {DetailPagePath} element = {<DetailSession></DetailSession>}></Route>
  //         <Route path={mainPagePath} element={<Feed />} />
  //       </Routes>
  //     </Flowbite>
  //   </Router >
  // );
}

export default App;
