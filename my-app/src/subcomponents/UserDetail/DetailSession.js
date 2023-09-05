// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Detail.css";
import DetailPage from "./DetailPage";
import { useLocation } from "react-router-dom";
import {postUserDetail} from "../../http/RequestConfig"
import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';

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
    const [pageState, setPageState] = useState(1);
    const location = useLocation();
    const [companyName, setCompanyName] = useState("");
    const [newsLetterDetail, setNewsLetterDetail] = useState("");
    const [industry, setIndustry] = useState("");

    function MsetCompany(info) {
        setCompanyName(info);
    }
    function MnewsLetter(info) {
        setNewsLetterDetail(info);
    }
    function Mindustry(info) {
        setIndustry(info);
    }

    function changePage(pageNumber) {
        setPageState(pageNumber);
    }
    async function getNextStep(){
        if(pageState == 3){
            try{
                let returnBack = await postUserDetail({companyName:companyName, newsLetterDetail:newsLetterDetail, industry:industry});
                alert("update success")
            }
            catch(e){
                alert(e);
            }
        }
        else{
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
            <div className="flex-grow" style={{height:"100%"}}>
                <div id="mySidenav" class="sidenav">
                    <div className="h1box">
                        <img src="logo_dark.png" className="w-10 h-10" alt="logo" />
                        <span>nwsltr.ai</span>
                    </div>

                    <a onClick={() => { changePage(1) }}>Step 1</a>
                    <a onClick={() => { changePage(2) }}>Step 2</a>
                    <a onClick={() => { changePage(3) }}>Step 3</a>
                </div>

                <div className="rightContainer">
                    <div class="w-full md:w-1/3 mx-auto text-white py-8">
                        <div class="bg-gray-900 rounded-xl border-gray-300 border-2 text-center pt-3">
                            {pageState == 1 && (
                                <DetailPage
                                    qestionTitle={"Tell Us About Company"}
                                    dataCurrent= {companyName}
                                    changeState={(info) => {MsetCompany(info) }}
                                    pageNumber={pageState === 3}
                                    nextPage = {()=>{getNextStep()}}
                                />
                            )}
                            {pageState == 2 && (
                                <DetailPage
                                    qestionTitle={"Tell Us About Newsletter You Want To Write"}
                                    dataCurrent= {newsLetterDetail}
                                    changeState={(info) => { MnewsLetter(info) }}
                                    pageNumber={pageState === 3}
                                    nextPage = {()=>{getNextStep()}}
                                />
                            )}
                            {pageState == 3 && (
                                <DetailPage
                                    qestionTitle={"Tell Us about your industry"}
                                    dataCurrent= {industry}
                                    changeState={(info) => { Mindustry(info) }}
                                    pageNumber={pageState === 3}
                                    nextPage = {()=>{getNextStep()}}
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
