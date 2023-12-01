import React, { useState, useEffect } from "react";
import CheckLogin from "./components/CheckLogin";
import PaymentsComponent from "./subcomponents/payments/PaymentsComponent";
import PaymentsProduct from "./subcomponents/payments/PaymentsProduct";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { mainPagePath, DetailPagePath } from "./constants/RouteConstants";
import {
  accountPath,
  pricingRedirectPath,
  allnewsletter,
  eachNewsletterPath
} from "./constants/RouteConstants";
import { Helmet } from "react-helmet";
import { Flowbite } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useUser, viewUser, useNumCredits, refreshCredits } from "./redux/UserSlice";
import { getDetail } from './redux/DetailSlice'
import { Routes, Route, Navigate } from "react-router-dom";
import DetailSession from "./subcomponents/UserDetail/DetailSession";
import GenerateSession from "./subcomponents/generate/GenerateSession";
import AllnewsletterSession from "./subcomponents/allNewsletter/AllnewsletterSession"
import { questionList } from "./constants/questionList";
import { setPageOneQuestion, setPageTwoQuestion, setPageThreeQuestion, setPageFourQuestion } from "./redux/DetailSlice"
import { setIdeas, getAllIdeas } from "./redux/newsLetterSlice"
import MainNav from "./components/MainNav";
import EachNewsletter from "./components/EachNewsletter"

function App() {
  const pattern = /^\['.*'\]$/;
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [haveDeatil, setHaveDetail] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const sessionToken = localStorage.getItem("sessionToken");
  const verificationToken = localStorage.getItem("verificationToken")
  if ((accessToken || sessionToken) && verificationToken) {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
    }
  } else {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  }

  // var haveUserDetail = haveDeatil;
  let numCredits = useNumCredits();
  var showRestrictedRouteRequiringUserSession = isLoggedIn;

  let dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(viewUser());
      dispatch(refreshCredits())
      async function getDetailData() {
        try {
          let allData = await dispatch(getAllIdeas());
          // console.log('aaaaaaaa', allData.payload)
          dispatch(setIdeas(allData.payload))
          let data = await dispatch(getDetail())
          // console.log(data);
          let temData = JSON.parse(JSON.stringify(questionList));
          for (const pageName in data.payload) {
            const pageData = data.payload[pageName];
            const questions = temData[pageName];

            if (pageData && questions) {
              questions.forEach((question) => {
                const questionTitle = question.title;
                if (pageData.hasOwnProperty(questionTitle)) {
                  let fontData = pageData[questionTitle];
                  if (pattern.test(fontData)) {
                    fontData = fontData.replace(/'/g, '"');
                    fontData = JSON.parse(fontData);
                  }
                  question.data = fontData;
                }
              });
            }
          }
          // console.log(temData)
          dispatch(setPageOneQuestion(temData['pageOne']))
          dispatch(setPageTwoQuestion(temData['pageTwo']))
          dispatch(setPageThreeQuestion(temData['pageThree']))
          dispatch(setPageFourQuestion(temData['pageFour']))
          let flage = true
          temData['pageOne'].forEach((item) =>{
            if (item.require === true && item.data == ""){
              flage = false
            }
          })
          temData['pageThree'].forEach((item) =>{
            if (item.require === true && item.data == ""){
              flage = false
            }
          })
          // console.log("flage",flage)
          setHaveDetail(flage);
        }
        catch (e) {
          alert('error:' + e)
        }
      }
      getDetailData()
    }
  }, [isLoggedIn]);

  let user = useUser();

  var showRestrictedRouteRequiringPayments = false;
  if (user && user["paid_user"] != 0) {
    showRestrictedRouteRequiringPayments = true;
  }

  var isFreeTrial = false;
  if (user && user["is_free_trial"] == true) {
    isFreeTrial = true;
  }
  var numDaysLeft = "";
  if (user && user["end_date"]) {
    var currentDate = new Date();
    var endDate = new Date(user["end_date"]);
    var timeDifference = endDate - currentDate;
    var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    numDaysLeft = daysDifference.toString();
  }

  var routes = [
    <Route
      index
      element={
        <CheckLogin darkTheme={darkTheme} setIsLoggedInParent={setIsLoggedIn} showRestrictedRouteRequiringPayments={showRestrictedRouteRequiringPayments} haveUserDetail={haveDeatil} />
      }
    />,
    showRestrictedRouteRequiringUserSession && showRestrictedRouteRequiringPayments ? (
      <Route path={DetailPagePath} element={<DetailSession />} />
    ) : null,
    showRestrictedRouteRequiringUserSession && showRestrictedRouteRequiringPayments && haveDeatil && numCredits !== 0 ? (
      <Route path={mainPagePath} element={<GenerateSession />} />
    ) : null,
    showRestrictedRouteRequiringUserSession && showRestrictedRouteRequiringPayments ? (
      <Route path={allnewsletter} element={<AllnewsletterSession />} />
    ) : null,
    showRestrictedRouteRequiringUserSession && showRestrictedRouteRequiringPayments && haveDeatil? (
      <Route path={eachNewsletterPath} element={<EachNewsletter />} />
    ) : null,
    showRestrictedRouteRequiringUserSession ? (
      <Route path={accountPath} element={<PaymentsComponent />} />
    ) : null,
    showRestrictedRouteRequiringUserSession ? (
      <Route path={pricingRedirectPath} element={<PaymentsProduct />} />
    ) : null,
  ];

  var daysStr = "";
  if (numDaysLeft == "0") {
    daysStr = "less than a day";
  } else if (numDaysLeft == "1") {
    daysStr = "1 day";
  } else {
    daysStr = numDaysLeft.toString() + " days";
  }

  return (
    <Router>
      <Flowbite
        theme={{
          dark: darkTheme,
        }}
      >
        <div className="DashboardView flex flex-col h-screen w-screen">
          <div id="wrapperDiv" className="flex-grow h-full">
            {/* {isLoggedIn && isFreeTrial && <div className="mt-2 mb-2 ml-6" style={{color: "black", fontWeight: "bold"}}>
              Your free trial ends in {daysStr}
              <Link to={accountPath} className="ml-3 text-blue-500">Upgrade</Link>
            </div>} */}
            {isLoggedIn && (
              <MainNav
                setIsLoggedInParent={setIsLoggedIn}
              />
            )}
            <Helmet>
              <title>NWSLTR.AI</title>
            </Helmet>
            <Routes>
              {routes}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
        </div>
      </Flowbite>
    </Router>
  )
}

export default App;
