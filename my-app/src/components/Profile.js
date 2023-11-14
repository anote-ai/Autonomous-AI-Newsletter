// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import "../../styles/Detail.css";
import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../redux/UserSlice";
// import { setCompanyName, setNewsLetterDetail, setIndustry, useCompanyName, useNewsLetterDetail, useIndustry } from "../../redux/DetailSlice"
import tommy from "../assets/tommy.png";
import right from "../assets/angle-double-right.svg";
import noUserImg from "../assets/noUserImg.png";
import {
  useAllData,
  setAllData,
  getAllNewsletter,
} from "../redux/newsLetterSlice";
import { useLocation } from "react-router-dom";
import { useDetailPageOne } from "../redux/DetailSlice";
import { useIdeas } from "../redux/newsLetterSlice";
import Allnewsletter from "../subcomponents/allNewsletter/Allnewsletter"
import { refreshCredits } from "../redux/UserSlice";

function Profile(props) {
  const dispatch = useDispatch();
  let user = useUser();
  let getAlluser = useAllData();
  let reduxIdeas = useIdeas();
  let navigate = useNavigate();
  let getUserDetailPageOne = useDetailPageOne();
  const [ndata, setNdata] = useState(getAlluser);

  // console.log(getAlluser)
  let totalSearch = 0;

  useEffect(() => {
    async function getData() {
      dispatch(refreshCredits())
      try {
        let getData = await dispatch(getAllNewsletter());
        let temData = [];
        // console.log(getData)
        if (getData && getData.payload.length !== 0) {
          temData = getData.payload;
        }
        // console.log("data", temData);
        setNdata(temData);
        dispatch(setAllData(temData));
      } catch (e) {
        alert(e);
      }
    }
    getData();
  }, []);

  const [recentNewsData, setRecentNewsData] = useState([
    {
      id: 1,
      title: "Tech Trends",
      number: 120,
    },
    {
      id: 2,
      title: "Product",
      number: 600,
    },
    {
      id: 3,
      title: "Customer",
      number: 404,
    },
    {
      id: 4,
      title: "Industry",
      number: 120,
    },
    {
      id: 5,
      title: "Marketing",
      number: 120,
    },
    {
      id: 6,
      title: "Sales",
      number: 120,
    },
  ]);
  return (
    // <div className=" bg-gray-800 min-h-screen">

    <div className="flex flex-col h-full mt-auto w-screen text-white bg-white">
      <div className="h-1/5 w-full flex justify-center items-center">
        <div className="h-3/5 w-5/6 flex justify-start">
          <img
            src={
              getUserDetailPageOne[3].data !== ""
                ? getUserDetailPageOne[3].data
                : noUserImg
            }
            alt="img"
            className="aspect-square h-full m-0 inline-block"
          />
          <div className="w-1/5 flex flex-col my-auto">
            <div className="w-full flex flex-col space-y-5 justify-start ml-3">
              <div className="flex justify-start items-center font-bold text-black h-full">
                <h3>{user && user.name ? user.name : user.email}</h3>
              </div>
              <Button
                className="w-max bg-slate-400"
                onClick={() => {
                  navigate("/detail");
                }}
              >
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="w-full my-auto py-5 border-2 border-gray-700 rounded-xl bg-white">
            <div class="flex flex-col md:flex-row justify-between text-center mx-auto">
              <div class="md:w-2/5">
               <div class="text-6xl lg:text-5xl font-semibold lg:font-bold text-slate-400">
                  {reduxIdeas && reduxIdeas.length ? reduxIdeas.length : 0}
                </div>

                <div class="LP-Home-Insights-Item-Content text-black">
                  Idea Generated
                </div>

              </div>
              <div class="md:w-2/5">
               <div class="text-6xl lg:text-5xl font-semibold lg:font-bold text-slate-400">
                  {ndata && ndata.length ? ndata.length : 0}
                </div>

                <div class="LP-Home-Insights-Item-Content text-black">
                  Newsletters Generated
                </div>
              </div>
              <div class="md:w-2/5">
                <div class="text-6xl lg:text-5xl font-semibold lg:font-bold text-slate-400">
                  {ndata && ndata.length
                    ? getAlluser.reduce(
                        (totalSearch, element) =>
                          totalSearch + element["data"].length,
                        0
                      )
                    : 0}
                </div>
                <div class="LP-Home-Insights-Item-Content text-black">
                  News Searched
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Allnewsletter/>
    </div>
  );
}

export default Profile;
