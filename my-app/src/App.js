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
  testPage,
  allnewsletter,
  eachNewsletterPath
} from "./constants/RouteConstants";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";
import { Flowbite } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useUser, viewUser, useNumCredits, refreshCredits } from "./redux/UserSlice";
import { getDeatil, setCompanyName, setNewsLetterDetail, setIndustry } from './redux/DetailSlice'
import { Routes, Route, Navigate } from "react-router-dom";
import DetailSession from "./subcomponents/UserDetail/DetailSession";
import GenerateSession from "./subcomponents/generate/GenerateSession";
import Profile from './components/Profile'
import LeftNav from "./components/LeftNav";
import Allnewsletter from "./subcomponents/allNewsletter/Allnewsletter"
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
      async function getDeatilData() {
        try {
          let allData = await dispatch(getAllIdeas());
          // console.log('aaaaaaaa', allData.payload)
          dispatch(setIdeas(allData.payload))
          let data = await dispatch(getDeatil())
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
      getDeatilData()
      // getDeatilData();
      // let getIdeas = async () => {
      //   try {
      //     let allData = await dispatch(getAllIdeas());
      //     // console.log('aaaaaaaa', allData.payload)
      //     dispatch(setIdeas(allData.payload))
      //   }
      //   catch (e) {
      //     alert('error:' + e)
      //   }
      // }
      // getIdeas();
      // // dispatch(refreshCredits());
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
  // console.log("haveDeatil",haveDeatil)

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

  return (
    <Router>
      <Flowbite
        theme={{
          dark: darkTheme,
        }}
      >
        <div className="DashboardView flex flex-col h-screen w-screen">
          <div id="wrapperDiv" className="flex-grow h-full">
            {isLoggedIn && (
              <MainNav
                setIsLoggedInParent={setIsLoggedIn}
              // darkTheme={darkTheme}
              // setDarkTheme={setDarkTheme}
              />
            )}
            <Helmet>
              <title>NWSLTR.AI</title>
            </Helmet>
            {/* {isLoggedIn && <Header />} */}
            {/* {isLoggedIn && <SideNav setIsLoggedInParent={setIsLoggedIn} />} */}
            <Routes>
              {routes}
              {/* <Route path={tosPath} element={<TermsOfService />} />
              <Route path={privatePolicyPath} element={<PrivatePolicy />} />
              <Route path={optOutPath} element={<OptOut />} /> */}
              {/* <Route path={testPage} element={<Profile></Profile>}></Route> */}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
            {/* {!showRestrictedRouteRequiringPayments && <Navigate to={accountPath} />}, */}
          </div>
          {/* <Footer /> */}
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
