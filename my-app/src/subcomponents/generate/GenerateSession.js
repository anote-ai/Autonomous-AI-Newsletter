// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';
import Content from "./Content";
import StylePage from "./StylePage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DetailPagePath, mainPagePath } from "../../constants/RouteConstants";
import DetailPage from "../UserDetail/DetailPage"
import { setTopic, useData, useTopic, useStyleInfo } from "../../redux/DetailSlice"
import { red } from "@mui/material/colors";
// import { setCompanyName, setNewsLetterDetail, setIndustry, useCompanyName, useNewsLetterDetail, useIndustry } from "../../redux/DetailSlice"

function GenerateSession(props) {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [pageState, setPageState] = useState(4);
    const location = useLocation();
    let reduxUseData = useData();
    let reduxUseTopic = useTopic()
    const [typeQestion, setTypeQestion] = useState(reduxUseTopic);
    const [letterData, setLettterData] = useState(reduxUseData);
    let styleFromRedux = useStyleInfo()
    const [styleSheet, setStyleSheet] = useState(styleFromRedux);

    // let ddddd = useTopic();
    // console.log(ddddd)

    useEffect(() => {
        setStyleSheet(styleFromRedux);
    }, [styleFromRedux])
    function changePage(pageNumber) {
        setPageState(pageNumber);
    }
    async function getPreviousStep() {
        if (pageState > 4) {
            let tem = pageState;
            setPageState(tem -= 1);
        }
        else {
            navigate(DetailPagePath)
        }
    }
    async function getNextStep() {
        if (pageState == 4) {
            // console.log(typeQestion)
            dispatch(setTopic(typeQestion))
            let tem = pageState;
            setPageState(tem += 1);

        }
        else {
            let tem = pageState;
            setPageState(tem += 1);
        }
    }
    async function MsetLetterData(data) {
        setLettterData(data);
    }
    async function MsetTypeQestion(data) {
        setTypeQestion(data);
    }

    return (
        // <div className=" bg-gray-800 min-h-screen">

        <div className="flex flex-col min-h-screen bg-gray-800">
            <div className="flex-grow " style={{ height: "100%" }}>
                <div id="mySidenav" class="sidenav">
                    <div className="h1box">
                        <img src="logo_dark.png" className="w-10 h-10" alt="logo" />
                        <span>nwsltr.ai</span>
                    </div>

                    <a style={pageState === 4 ? { color: "#f1f1f1" } : {}} onClick={() => { changePage(4) }}>Step 4</a>
                    <a style={pageState === 5 ? { color: "#f1f1f1" } : {}} onClick={() => { changePage(5) }}>Step 5</a>
                    <a style={pageState === 6 ? { color: "#f1f1f1" } : {}} onClick={() => { changePage(6) }}>Step 6</a>
                </div>

                {pageState == 4 && (
                    <div class="w-full md:w-2/3 mx-auto text-white py-8">
                        <div class="bg-gray-900 rounded-xl border-gray-300 border-2 text-center pt-3">
                            <DetailPage
                                qestionTitle={"Tell Us What Does Your Newsletter Relate To?"}
                                changeState={(info) => { MsetTypeQestion(info) }}
                                dataCurrent={typeQestion}
                                pageNumber={pageState === 4}
                                previousPage={() => { getPreviousStep() }}
                                nextPage={() => { getNextStep() }}
                            />
                        </div>
                    </div>
                )}
                {pageState == 5 && (
                    <div class="w-full md:w-2/3 mx-auto text-white py-8">
                        <div class="bg-gray-900 rounded-xl border-gray-300 border-2 text-center pt-3">
                            <Content
                                qestionTitle={"Here is your newsletter content"}
                                pageNumber={pageState === 5}
                                changeState={(data) => { MsetLetterData(data) }}
                                previousPage={() => { getPreviousStep() }}
                                nextPage={() => { getNextStep() }}
                            />
                        </div>
                    </div>
                )}
                {pageState == 6 && (
                    <StylePage
                        qestionTitle={"Custom Your Style"}
                        pageNumber={pageState === 6}
                        previousPage={() => { getPreviousStep() }}
                        nextPage={() => { getNextStep() }}

                    />
                )}
            </div>
        </div>
    );
}

export default GenerateSession;
