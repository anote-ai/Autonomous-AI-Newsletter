// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Detail.css";
import DetailPage from "./DetailPage";
import { useLocation } from "react-router-dom";
import { updateDetail } from "../../redux/DetailSlice"
import { Modal, ModalBody, ModalHeader, Button, Progress } from 'flowbite-react';
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

        <div className="flex flex-col h-screen w-5/6 ml-auto min-h-screen bg-gray-600">
            <div class="w-full w-2/3 mx-auto text-white my-64">
                <div class="bg-gray-900 rounded-xl border-gray-300 border-2 text-center pt-3">
                    <Progress
                        className="w-2/3 mx-auto my-5"
                        color="dark"
                        progress={100 * (pageState/3) + 1}
                        size="lg"
                    />
                    {pageState == 1 && (
                        <DetailPage
                            qestionTitle={"Tell Us About Company"}
                            dataCurrent={companyName}
                            changeState={(info) => { MsetCompany(info) }}
                            pageNumber={pageState === 3}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={() => { getNextStep() }}
                        />
                    )}
                    {pageState == 2 && (
                        <DetailPage
                            qestionTitle={"Tell Us About Newsletter You Want To Write"}
                            dataCurrent={newsLetterDetail}
                            changeState={(info) => { MnewsLetter(info) }}
                            pageNumber={pageState === 3}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={() => { getNextStep() }}

                        />
                    )}
                    {pageState == 3 && (
                        <DetailPage
                            qestionTitle={"Tell Us about your industry"}
                            dataCurrent={industry}
                            changeState={(info) => { Mindustry(info) }}
                            pageNumber={pageState === 3}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={() => { getNextStep() }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailSession;
