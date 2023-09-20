// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
// import "../../styles/Detail.css";
import LeftNav from "./LeftNav";
import { Table } from 'flowbite-react'
// import { useLocation } from "react-router-dom";
// import { updateDetail } from "../../redux/DetailSlice"
// import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';
// import { mainPagePath } from "../../constants/RouteConstants";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useUser } from "../redux/UserSlice";
// import { setCompanyName, setNewsLetterDetail, setIndustry, useCompanyName, useNewsLetterDetail, useIndustry } from "../../redux/DetailSlice"
import tommy from '../assets/tommy.png';
import right from '../assets/angle-double-right.svg'

function Profile(props) {
    let user = useUser();
    const [recentNewsData, setRecentNewsData] = useState([
        {
            id: 1,
            title: "Tech Trends",
            number: 120
        },
        {
            id: 2,
            title: "Product",
            number: 600
        },
        {
            id: 3,
            title: "Customer",
            number: 404
        },
        {
            id: 4,
            title: "Industry",
            number: 120
        },
        {
            id: 5,
            title: "Marketing",
            number: 120
        },
        {
            id: 6,
            title: "Sales",
            number: 120
        },
    ]);

    return (
        // <div className=" bg-gray-800 min-h-screen">

        <div>
            <LeftNav></LeftNav>
            <div className="h-screen w-4/5 ml-auto flex flex-col" >
                <div className="h-1/5 w-full flex justify-center items-center">
                    <div className="h-4/5 w-4/5 flex justify-start">
                        <img src={tommy} alt='img' className="aspect-square h-full ml-0 inline-block"></img>
                        <div className="h-2/3 w-80 flex flex-col my-auto">
                            <div className="h-1/2 w-full flex justify-start">
                                <div className="flex justify-start items-center font-bold h-full w-1/2">
                                    <h3>{user && user.name ? user.name : user.email}</h3>
                                </div>
                                <div className=" h-full w-1/2">
                                    <button
                                        className=" bg-sky-500/50 h-full w-full"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                            <div className="h-1/2 w-full flex justify-start ">
                                <div className="flex justify-start items-center h-full w-1/2">
                                    <p>999 Subscribers</p>
                                </div>
                                <div className="flex justify-start items-center h-full w-1/2">
                                    <p>123 Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-4/5">
                    <div className="h-1/12 w-full flex justify-center items-center">
                        Total opens
                    </div>
                    <div className="h-1/12 w-4/5 mx-auto flex justify-between border-b-4">
                        <p className="border-b-4 border-black">Recent Newsletter</p>
                        <p className="border-b-4 border-black">Total Click</p>
                    </div>
                    <div className="h-10/12 w-4/5 mx-auto flex justify-between flex-col pt-4 overflow-y-auto">
                        {recentNewsData && recentNewsData.length !== 0 && (
                            recentNewsData.map((each) => (
                                <div className="w-full h-30 flex justify-start hover:border-4 mb-5">
                                    <div className="w-1/2 h-full flex flex-col">
                                        <div className="w-full h-1/2 flex justify-start items-center">
                                            {each.title}
                                        </div>
                                        <div className="w-full h-1/2 flex justify-start items-center">
                                            {each.number}
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-30 flex justify-end">
                                        <div className="h-full w-8 flex items-center">
                                            <img className="h-8 w-8" src={right} alt="My Icon" />
                                        </div>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
