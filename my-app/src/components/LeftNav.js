import { React, useEffect, useState } from "react";
import { logout, useNumCredits } from "../redux/UserSlice";
import noUserImg from '../assets/noUserImg.png';
import userInc from '../assets/user.svg';
import mUserInc from '../assets/users-alt.svg'
import star from '../assets/star.svg'
import cloud from '../assets/cloud.svg'
import settings from '../assets/settings.svg'
import signOut from '../assets/sign-out-alt.svg'
import { accountPath, loginPagePath, mainPagePath, DetailPagePath, allnewsletter } from "../constants/RouteConstants";
import { Sidebar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUser, viewUser } from "../redux/UserSlice";
import { HiShoppingBag, HiChartPie, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

function LeftNav(props) {
    const location = useLocation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let user = useUser();
    useEffect(() => {
        dispatch(viewUser());
    }, []);

    var imageUrl = noUserImg;
    if (user && "profile_pic_url" in user) {
        if (user["profile_pic_url"] !== "") {
            imageUrl = user["profile_pic_url"];
        }
    }
    return (
        <Sidebar className="fixed left-0 top-0 w-1/6 h-screen" aria-label="Sidebar with logo branding example">
            <div className="flex w-full h-36 justify-center items-center">
                <img src={noUserImg} alt="img" className="aspect-square rounded-full w-1/3"></img>
            </div>
            <Sidebar.Items className="">
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate('/')
                        }
                        icon={HiChartPie}
                    >
                        <p>
                            Profile
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate('accountPath')
                        }
                        icon={HiShoppingBag}
                    >
                        <p>
                            Account
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate(allnewsletter)
                        }
                        icon={HiViewBoards}
                    >
                        <p>
                            All Letters
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick ={() =>
                            navigate(mainPagePath)
                        }
                        icon={HiShoppingBag}
                    >
                        <p>
                            Create
                        </p>
                    </Sidebar.Item>
                    {/* <Sidebar.Item
                        href="#"
                        icon={HiArrowSmRight}
                    >
                        <p>
                            Sign In
                        </p>
                    </Sidebar.Item> */}
                    <Sidebar.Item className="absolute bottom-5 w-5/6"
                        onClick={() =>
                            dispatch(logout()).then((resp) => {
                                props.setIsLoggedInParent(false);
                                navigate("/");
                            })
                        }
                        icon={HiTable}
                    >
                        <p>
                            Log out
                        </p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
            {/* <Sidebar.Items className="mt-auto">
                <div className="w-full min-h-min">
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                            icon={HiTable}
                        >
                            <p>
                                Log out
                            </p>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </div>
            </Sidebar.Items> */}
        </Sidebar>
    )
}
export default LeftNav;



// function LeftNav(props) {

//     return {

//     }

//     return (
//         <div className="flex flex-col fixed left-0 top-0 min-h-screen bg-slate-700 w-1/5 border-black border-4">
//             <div className="flex w-full h-36 justify-center items-center">
//                 <img src={tommy} alt="img" className="aspect-square rounded-full w-1/3"></img>
//             </div>
//             <div className="w-full min-h-min">
//                 <ul className="w-full min-h-min flex justify-center items-center flex-col">
//                     <li className="h-12 flex items-center font-bold justify-start w-full hover:border-4">
//                         <div className="h-full w-1/2 justify-center flex justify-center items-center">
//                             <img className="h-1/2" src={userInc} alt="My Icon" />
//                         </div>
//                         <div className="w-1/2 justify-start">
//                             My Profile
//                         </div>
//                     </li>
//                     <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
//                         <div className="h-full w-1/2 justify-center flex justify-center items-center">
//                             <img className="h-1/2" src={mUserInc} alt="My Icon" />
//                         </div>
//                         <div className="w-1/2 justify-start">
//                             Shared
//                         </div>
//                     </li>
//                     <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
//                         <div className="h-full w-1/2 justify-center flex justify-center items-center">
//                             <img className="h-1/2" src={star} alt="My Icon" />
//                         </div>
//                         <div className="w-1/2 justify-start">
//                             Favorites
//                         </div>
//                     </li>
//                     <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
//                         <div className="h-full w-1/2 justify-center flex justify-center items-center">
//                             <img className="h-1/2" src={cloud} alt="My Icon" />
//                         </div>
//                         <div className="w-1/2 justify-start">
//                             Upload
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//             <div className="w-full min-h-min mt-auto">
//                 <ul className="w-full min-h-min flex justify-center items-center flex-col">
//                     <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
//                         <div className="h-full w-1/2 justify-center flex justify-center items-center">
//                             <img className="h-1/2" src={settings} alt="My Icon" />
//                         </div>
//                         <div className="w-1/2 justify-start">
//                             Settings
//                         </div>
//                     </li>
//                     <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
//                         <div className="h-full w-1/2 justify-center flex justify-center items-center">
//                             <img className="h-1/2" src={signOut} alt="My Icon" />
//                         </div>
//                         <div className="w-1/2 justify-start">
//                             Log Out
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default LeftNav;
