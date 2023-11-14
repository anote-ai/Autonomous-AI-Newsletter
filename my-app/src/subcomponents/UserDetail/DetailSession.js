// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
// import "../../styles/Detail.css";
import DetailPage from "./DetailPage";
import { useLocation, Link } from "react-router-dom";
import { updateDetail } from "../../redux/DetailSlice"
import { Modal, ModalBody, ModalHeader, Button, Progress } from 'flowbite-react';
import { mainPagePath } from "../../constants/RouteConstants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { questionList } from "../../constants/questionList"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour, setPageOneQuestion, setPageTwoQuestion, setPageThreeQuestion, setPageFourQuestion } from "../../redux/DetailSlice"
import { clearData, setBackgroundColor } from "../../redux/newsLetterSlice";

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
        // dispatch(setBackgroundColor(info[6].data))
        setFirstPageData(info);
        // console.log(firstPageData)
        dispatch(setPageOneQuestion(info));
        // dispatch(updateDetail({ payload: info, tableName: 'userDetailPageOne' }))

    }
    function MsecondPageData(info) {
        setSecondPageData(info);
        console.log(info);
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
                dispatch(clearData())
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
                className={`flex items-center justify-start ml-4 ${index <= currentIndex
                    ? " text-sky-500 m-0"
                    : "text-gray-500 dark:text-gray-400 m-0"
                    }`}
            >
                {index >= currentIndex ? (
                    <span
                        className={`flex items-center justify-center w-6 h-6 text-xs shrink-0 ${index <= currentIndex
                            ? "border-sky-500"
                            : "border-gray-500 dark:border-gray-400"
                            }`}
                    >
                        |
                    </span>
                ) : (
                    <svg
                        class="w-6 h-6 m-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8 pb-20.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                )}
                <span
                    className={`capitalize text-xl m-0 ${index === currentIndex ? "font-semibold" : ""
                        } `}
                >
                    {text}
                </span>
                {/* {index < total && (
                    <div
                        className={`ml-2 h-px w-12 border ${index >= currentIndex
                            ? "border-gray-500 bg-gray-500"
                            : "border-sky-500 bg-sky-500"
                            } `}
                    ></div>
                )} */}
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

        <div className="flex flex-col h-[94%] mt-auto w-screen bg-white">
            <div class="w-3/4 mx-auto text-white my-auto flex justify-between">
                <div class="bg-white relative min-h-[90vh] border-zinc-950 border-2 text-center w-1/3 mr-2">
                    <div className="h-full w-full">
                        <div className="pt-48">
                            <div className="w-full flex items-start px-9 flex-col">
                                <p className="text-[#FE603D] font-bold">Basic Information</p>
                                <h2 className="font-['Gambarino'] text-black text-2xl text-left">Tell us a little more about your newsletter</h2>
                            </div>
                            <ol className="flex justify-center items-start ml-7 flex-col w-full space-x-2 text-xl font-medium text-center text-gray-500 shadow-sm dark:text-gray-400 sm:space-x-4">
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
                    </div>
                    {/* <Progress
                        className="w-2/3 mx-auto my-5"
                        color="dark"
                        progress={progressValue}
                        size="lg"
                    /> */}
                </div>
                <div className="bg-white relative min-h-[90vh] border-zinc-950 border-2 text-center w-2/3">
                    {pageState == 1 && (
                        <div className="h-[90vh] max-h-[90vh] overflow-y-scroll bg-white pt-8 pb-20 text-black">
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
                        <div className="h-[90vh] max-h-[90vh] overflow-y-scroll bg-white pt-8 pb-20 text-black">
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
                        <div className="h-[90vh] max-h-[90vh] overflow-y-scroll bg-white pt-8 pb-20 text-black">
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
                        <div className="h-[90vh] max-h-[90vh] overflow-y-scroll bg-white pt-8 pb-20 text-black">
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
