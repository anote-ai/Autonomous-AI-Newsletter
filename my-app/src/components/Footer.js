import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    tosPath,
    privatePolicyPath,
    optOutPath,
  } from "../constants/RouteConstants";
import "../styles/Footer.css"

const Footer = (props) => {
  let navigate = useNavigate();

  return (
      <footer className={`bg-slate-900 w-full footer footer-content`}>
          <div className="container mx-auto px-5 pt-4 flex flex-wrap justify-between items-center">
            <div className="flex space-x-6">
                <a className="cursor-pointer text-white hover:text-gray-400" onClick={() => { navigate(tosPath); }}>Terms of Service</a>
                <a className="cursor-pointer text-white hover:text-gray-400" onClick={() => { navigate(privatePolicyPath); }}>Privacy Policy</a>
                <a className="cursor-pointer text-white hover:text-gray-400" onClick={() => { navigate(optOutPath); }}>Opt Out</a>
                <a href="mailto:support@anote.ai" className="text-white hover:text-gray-400">support@anote.ai</a>
            </div>
            <div className="text-center text-white">
                © 2023 Anote — <a className="text-white" target="_blank">All rights reserved</a>
            </div>
          </div>
      </footer>
  );
};

export default Footer;