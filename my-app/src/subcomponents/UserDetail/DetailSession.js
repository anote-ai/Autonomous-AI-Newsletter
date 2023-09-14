// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Detail.css";
import DetailPage from "./DetailPage";
import { useLocation } from "react-router-dom";
import { updateDetail } from "../../redux/DetailSlice"
import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';
import { mainPagePath } from "../../constants/RouteConstants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCompanyName, setNewsLetterDetail, setIndustry, useCompanyName, useNewsLetterDetail, useIndustry } from "../../redux/DetailSlice"

function DetailSession(props) {
    //   let dispatch = useDispatch();
    //   const onLogin = () => {
    //     dispatch(
    //       login({
    //         product_hash: props.productHash,
    //         free_trial_code: props.freeTrialCode,
    //       })
    //     );
    //   };
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [pageState, setPageState] = useState(1);
    const location = useLocation();
    let reduxCompanyName = useCompanyName();
    let reduxNewsLetterDetail = useNewsLetterDetail();
    let reduxIndustry = useIndustry();
    const [companyName, setCCompanyName] = useState(reduxCompanyName);
    const [newsLetterDetail, setCNewsLetterDetail] = useState(reduxNewsLetterDetail);
    const [industry, setCIndustry] = useState(reduxIndustry);
    // let reduxCompanyName = useCompanyName();
    // let reduxNewsLetterDetail = useNewsLetterDetail();
    // let reduxIndustry = useIndustry();
    // setCCompanyName(reduxCompanyName);
    // setCNewsLetterDetail(reduxNewsLetterDetail);
    // setCIndustry(reduxIndustry);

    // useEffect(() => {
    //     // let reduxCompanyName = useCompanyName();
    //     // let reduxNewsLetterDetail = useNewsLetterDetail();
    //     // let reduxIndustry = useIndustry();
    //     setCCompanyName(reduxCompanyName);
    //     setCNewsLetterDetail(reduxNewsLetterDetail);
    //     setCIndustry(reduxIndustry);
    // }, []);

    function MsetCompany(info) {
        setCCompanyName(info);
    }
    function MnewsLetter(info) {
        setCNewsLetterDetail(info);
    }
    function Mindustry(info) {
        setCIndustry(info);
    }

    function changePage(pageNumber) {
        setPageState(pageNumber);
    }
    async function getPreviousStep() {
        if (pageState > 1) {
            let tem = pageState;
            setPageState(tem -= 1);
        }
    }
    async function getNextStep() {
        if (pageState == 3) {
            try {
                // let returnBack = await dispatch(updateDetail({ companyName: companyName, newsLetterDetail: newsLetterDetail, industry: industry }));
                alert("update success")
                dispatch(setCompanyName(companyName));
                dispatch(setNewsLetterDetail(newsLetterDetail));
                dispatch(setIndustry(industry));
                navigate(mainPagePath)
            }
            catch (e) {
                alert(e);
            }
        }
        else {
            let tem = pageState;
            setPageState(tem += 1);
        }
    }
    //   useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search);
    //     const emailParam = queryParams.get("email");
    //     const codeParam = queryParams.get("passwordResetCode");

    //     if (emailParam && codeParam) {
    //       setForgotPasswordEmail(emailParam);
    //       setForgotPasswordCode(codeParam);
    //       setPageState(4);
    //     }
    //   }, []);

    return (
        // <div className=" bg-gray-800 min-h-screen">

        <div className="flex flex-col min-h-screen bg-gray-800">
            <div className="flex-grow" style={{ height: "100%" }}>
                <div id="mySidenav" class="sidenav">
                    <div className="h1box">
                        <img src="logo_dark.png" className="w-10 h-10" alt="logo" />
                        <span>nwsltr.ai</span>
                    </div>

                    <a style={pageState === 1 ? { color: "#f1f1f1" } : {}} onClick={() => { changePage(1) }}>Step 1</a>
                    <a style={pageState === 2 ? { color: "#f1f1f1" } : {}} onClick={() => { changePage(2) }}>Step 2</a>
                    <a style={pageState === 3 ? { color: "#f1f1f1" } : {}} onClick={() => { changePage(3) }}>Step 3</a>
                </div>

                <div className="rightContainer">
                    <div class="w-full md:w-1/3 mx-auto text-white py-8">
                        <div class="bg-gray-900 rounded-xl border-gray-300 border-2 text-center pt-3">
                            {pageState == 1 && (
                                <DetailPage
                                    qestionTitle={"Tell Us About Company"}
                                    dataCurrent={companyName}
                                    changeState={(info) => { MsetCompany(info) }}
                                    pageNumber={pageState === 3}
                                    previousPage ={() =>{getPreviousStep()}}
                                    nextPage={() => { getNextStep() }}
                                />
                            )}
                            {pageState == 2 && (
                                <DetailPage
                                    qestionTitle={"Tell Us About Newsletter You Want To Write"}
                                    dataCurrent={newsLetterDetail}
                                    changeState={(info) => { MnewsLetter(info) }}
                                    pageNumber={pageState === 3}
                                    previousPage ={() =>{getPreviousStep()}}
                                    nextPage={() => { getNextStep() }}

                                />
                            )}
                            {pageState == 3 && (
                                <DetailPage
                                    qestionTitle={"Tell Us about your industry"}
                                    dataCurrent={industry}
                                    changeState={(info) => { Mindustry(info) }}
                                    pageNumber={pageState === 3}
                                    previousPage ={() =>{getPreviousStep()}}
                                    nextPage={() => { getNextStep() }}
                                />
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default DetailSession;
