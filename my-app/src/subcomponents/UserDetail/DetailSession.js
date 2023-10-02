// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Detail.css";
import DetailPage from "./DetailPage";
import { useLocation, Link } from "react-router-dom";
import { updateDetail } from "../../redux/DetailSlice"
import { Modal, ModalBody, ModalHeader, Button, Progress } from 'flowbite-react';
import { mainPagePath } from "../../constants/RouteConstants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { questionList } from "../../constants/questionList"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour, setPageOneQuestion, setPageTwoQuestion, setPageThreeQuestion, setPageFourQuestion } from "../../redux/DetailSlice"

function DetailSession(props) {

    const pageTotal = 4;
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [pageState, setPageState] = useState(1);
    const location = useLocation();
    let firstPageDataFRedux = useDetailPageOne();
    let secondPageDataFRedux = useDetailPageTwo();
    let thirdPageDataFRedux = useDetailPageThree();
    let fourthPageDataFRedux = useDetailPageFour();
    const [firstPageData, setFirstPageData] = useState(firstPageDataFRedux);
    const [secondPageData, setSecondPageData] = useState(secondPageDataFRedux);
    const [thirdPageData, setThirdPageData] = useState(thirdPageDataFRedux);
    const [fourthPageData, setFourthPageData] = useState(fourthPageDataFRedux);
    const [progressValue, setProgressVaule] = useState(0);


    // useEffect(() => {
    //     let temValue = progressValue
    //     let progressInterval = setInterval(() => {
    //         if (parseInt(temValue) === parseInt(100 * (pageState / pageTotal))) {
    //             clearInterval(progressInterval);
    //         }
    //         else if (parseInt(temValue) < parseInt(100 * (pageState / pageTotal))) {
    //             setProgressVaule(temValue += 0.5)
    //         }
    //         else {
    //             setProgressVaule(temValue -= 0.5)
    //         }
    //     }, 0.5)
    // }, [pageState])

    let routes = []
    routes = [
        "Basic Information",
        "Additional Information",
        "Specific Information",
        "Interview Questions"
    ];


    function MfirstPageData(info) {
        // console.log(info)
        setFirstPageData(info);
        // console.log(firstPageData)
        dispatch(setPageOneQuestion(info));
        // dispatch(updateDetail({ payload: info, tableName: 'userDetailPageOne' }))

    }
    function MsecondPageData(info) {
        setSecondPageData(info);
        dispatch(setPageTwoQuestion(info));
        // dispatch(updateDetail({ payload: info, tableName: 'userDetailPageTwo' }))
    }
    function MthirdPageData(info) {
        setThirdPageData(info);
        dispatch(setPageThreeQuestion(info));
        // dispatch(updateDetail({ payload: info, tableName: 'userDetailPageThree' }))
    }
    function MfourthPageData(info) {
        setFourthPageData(info);
        dispatch(setPageFourQuestion(info));
        // dispatch(updateDetail({ payload: info, tableName: 'userDetailPageFour' }))
    }

    async function getPreviousStep() {
        if (pageState > 1) {
            let tem = pageState;
            setPageState(tem -= 1);
        }
    }
    async function getNextStep() {
        if (pageState == 4) {
            try {
                await dispatch(updateDetail({ payload: firstPageData, tableName: 'userDetailPageOne' }))
                await dispatch(updateDetail({ payload: secondPageData, tableName: 'userDetailPageTwo' }))
                await dispatch(updateDetail({ payload: thirdPageData, tableName: 'userDetailPageThree' }))
                await dispatch(updateDetail({ payload: fourthPageData, tableName: 'userDetailPageFour' }))
                // let returnBack = await dispatch(updateDetail({ companyName: companyName, newsLetterDetail: newsLetterDetail, industry: industry }));
                alert("update success")
                window.location.href = '/';
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
    function Step({ number, text, isActive, index, currentIndex, total }) {
        return (
            <li
                className={`flex items-center ${index <= currentIndex
                    ? " text-sky-500"
                    : "text-gray-500 dark:text-gray-400"
                    }`}
            >
                {index >= currentIndex ? (
                    <span
                        className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full shrink-0 ${index <= currentIndex
                            ? "border-sky-500"
                            : "border-gray-500 dark:border-gray-400"
                            }`}
                    >
                        {number}
                    </span>
                ) : (
                    <svg
                        class="w-6 h-6 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                )}
                <span
                    className={`capitalize text-xl ${index === currentIndex ? "font-semibold" : ""
                        } `}
                >
                    {text}
                </span>
                {index < total && (
                    <div
                        className={`ml-2 h-px w-12 border ${index >= currentIndex
                            ? "border-gray-500 bg-gray-500"
                            : "border-sky-500 bg-sky-500"
                            } `}
                    ></div>
                )}
            </li>
        );
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

        <div className="flex flex-col h-[94%] mt-auto w-screen bg-gray-600">
            <div class="w-3/4 mx-auto text-white my-auto">
                <div class="bg-gray-900 relative min-h-[90vh] rounded-xl border-gray-300 border-2 text-center pt-3">
                    <div className="mb-2">
                        <ol className="flex justify-center items-center w-full p-3 space-x-2 text-xl font-medium text-center text-gray-500 shadow-sm dark:text-gray-400 sm:space-x-4">
                            {routes.map((route, index) => (
                                <Step
                                    number={index + 1}
                                    text={route}
                                    isActive={pageState === index}
                                    index={index}
                                    currentIndex={pageState - 1}
                                    total={routes.length - 1}
                                />
                            ))}
                        </ol>
                    </div>
                    {/* <Progress
                        className="w-2/3 mx-auto my-5"
                        color="dark"
                        progress={progressValue}
                        size="lg"
                    /> */}
                    {pageState == 1 && (
                        <div className="h-[68vh] max-h-[68vh] overflow-y-scroll bg-gray-800 pt-8">
                        <DetailPage
                            qestionTitle={"Basic Information"}
                            dataCurrent={firstPageData}
                            pageNumber={pageState === pageTotal}
                            questionList={firstPageData}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={(data) => {
                                MfirstPageData(data);
                                getNextStep()
                            }}
                        />
                        </div>
                    )}
                    {pageState == 2 && (
                        <div className="h-[68vh] max-h-[68vh] overflow-y-scroll bg-gray-800 pt-8">
                        <DetailPage
                            qestionTitle={"Basic Information"}
                            dataCurrent={secondPageData}
                            pageNumber={pageState === pageTotal}
                            questionList={secondPageData}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={(data) => {
                                MsecondPageData(data);
                                getNextStep()
                            }}

                        />
                        </div>
                    )}
                    {pageState == 3 && (
                        <div className="h-[68vh] max-h-[68vh] overflow-y-scroll bg-gray-800 pt-8">
                        <DetailPage
                            qestionTitle={"Brand Specific Information"}
                            dataCurrent={thirdPageData}
                            pageNumber={pageState === pageTotal}
                            questionList={thirdPageData}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={(data) => {
                                MthirdPageData(data);
                                getNextStep()
                            }}
                        />
                        </div>
                    )}
                    {pageState == 4 && (
                        <div className="h-[68vh] max-h-[68vh] overflow-y-scroll bg-gray-800 pt-8">
                        <DetailPage
                            qestionTitle={"Brand Persona Interview Questions"}
                            dataCurrent={fourthPageData}
                            pageNumber={pageState === pageTotal}
                            questionList={fourthPageData}
                            previousPage={() => { getPreviousStep() }}
                            nextPage={(data) => {
                                MfourthPageData(data)
                                getNextStep()
                            }}
                        />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default DetailSession;
