import { React, useEffect, useState } from "react";
import tommy from '../assets/tommy.png';
import userInc from '../assets/user.svg';
import mUserInc from '../assets/users-alt.svg'
import star from '../assets/star.svg'
import cloud from '../assets/cloud.svg'
import settings from '../assets/settings.svg'
import signOut from '../assets/sign-out-alt.svg'

function LeftNav(props) {

    return (
        <div className="flex flex-col fixed left-0 top-0 min-h-screen bg-slate-700 w-1/5 border-black border-4">
            <div className="flex w-full h-36 justify-center items-center">
                <img src={tommy} alt="img" className="aspect-square rounded-full w-1/3"></img>
            </div>
            <div className="w-full min-h-min">
                <ul className="w-full min-h-min flex justify-center items-center flex-col">
                    <li className="h-12 flex items-center font-bold justify-start w-full hover:border-4">
                        <div className="h-full w-1/2 justify-center flex justify-center items-center">
                            <img className="h-1/2" src={userInc} alt="My Icon" />
                        </div>
                        <div className="w-1/2 justify-start">
                            My Profile
                        </div>
                    </li>
                    <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
                        <div className="h-full w-1/2 justify-center flex justify-center items-center">
                            <img className="h-1/2" src={mUserInc} alt="My Icon" />
                        </div>
                        <div className="w-1/2 justify-start">
                            Shared
                        </div>
                    </li>
                    <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
                        <div className="h-full w-1/2 justify-center flex justify-center items-center">
                            <img className="h-1/2" src={star} alt="My Icon" />
                        </div>
                        <div className="w-1/2 justify-start">
                            Favorites
                        </div>
                    </li>
                    <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
                        <div className="h-full w-1/2 justify-center flex justify-center items-center">
                            <img className="h-1/2" src={cloud} alt="My Icon" />
                        </div>
                        <div className="w-1/2 justify-start">
                            Upload
                        </div>
                    </li>
                </ul>
            </div>
            <div className="w-full min-h-min mt-auto">
                <ul className="w-full min-h-min flex justify-center items-center flex-col">
                    <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
                        <div className="h-full w-1/2 justify-center flex justify-center items-center">
                            <img className="h-1/2" src={settings} alt="My Icon" />
                        </div>
                        <div className="w-1/2 justify-start">
                            Settings
                        </div>
                    </li>
                    <li className="h-12 flex items-center font-bold justify-evenly w-full hover:border-4">
                        <div className="h-full w-1/2 justify-center flex justify-center items-center">
                            <img className="h-1/2" src={signOut} alt="My Icon" />
                        </div>
                        <div className="w-1/2 justify-start">
                            Log Out
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LeftNav;
