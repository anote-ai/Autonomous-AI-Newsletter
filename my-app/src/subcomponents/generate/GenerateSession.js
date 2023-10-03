// import { useDispatch } from "react-redux";
// import { login } from "../../redux/UserSlice";
import React, { useState, useEffect } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import Content from "./Content";
import StylePage from "./StylePage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DetailPagePath, mainPagePath } from "../../constants/RouteConstants";
import DetailPage from "../../subcomponents/UserDetail/DetailPage";
import GeneratePage from "./GeneratePage";
import ContentLayout from "./ContentLayout";
import {
  setTopic,
  useData,
  useTopic,
  setNewsletter,
  useIdeas,
  setIdeas,
  setData,
  getAllIdeas,
  generateIdeas,
  updateIdeas,
  deleteIdeas,
  useBackgroundColor,
  clearData
} from "../../redux/newsLetterSlice";
import { red } from "@mui/material/colors";


function GenerateSession(props) {
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [pageState, setPageState] = useState(1);
  const location = useLocation();
  let firstPageDataFRedux = useTopic();
  let reduxIdeas = useIdeas();
  let reduxUseData = useData();
  const [firstPageData, setFirstPageData] = useState(firstPageDataFRedux);
  const [aIdeas, setAIdeas] = useState(reduxIdeas)
  let majorityColor = useBackgroundColor()
  // const [sections, setSections] = useState([]);
  // const [loading, setLoding] = useState(false);

  let pageTotal = 3;

  // let ddddd = useTopic();
  // console.log(ddddd)

  useEffect(() => {
    let getIdeas = async () => {
      try {
        let allData = await dispatch(getAllIdeas());
        // console.log('aaaaaaaa', allData.payload)
        dispatch(setIdeas(allData.payload))
        setAIdeas(allData.payload)
      }
      catch (e) {
        alert('error:' + e)
      }
    }
    getIdeas();
  }, [])

  async function generateIdea() {
    try {
      let data = await dispatch(generateIdeas());
      let tem = JSON.parse(JSON.stringify(aIdeas));
      console.log("data", data)

      if (data.payload && data.payload.length !== 0) {
        let deleteList = tem.filter((each) =>{return each.used !== true})
        let reqBode = {data: deleteList}
        let usedTrueList = tem.filter(item => item.used === true);
        tem = [...usedTrueList, ...data.payload];
        let deleteIdeasR = await dispatch(deleteIdeas(reqBode))
      }
      // console.log('tem', tem)
      setAIdeas(tem);
      dispatch(setIdeas(tem));
      setLoadingIdeas(false);
    }
    catch (e) {
      alert('error:' + e)
    }
  }
  async function getPreviousStep() {
    if (pageState > 1) {
      let tem = pageState;
      setPageState((tem -= 1));
    }
    else if(pageState === 1){
      navigate('/')
    }
  }
  async function getNextStep() {
    if (pageState == pageTotal) {
      try {
        console.log(reduxUseData);
        let returnBack = await dispatch(
          setNewsletter({ firstPageData: firstPageData, BackgroundColor: majorityColor, data: reduxUseData })
        );
        // let updateIdea = JSON.parse(JSON.stringify(firstPageData));
        // console.log("firstPageData[3]", firstPageData[3])
        let data = aIdeas.filter((each)=>{
          // console.log(each)
          return each.id == firstPageData[3].ideaId
        })
        // console.log(data);
        let reqBody = {
          id:data[0].id,
          title:data[0].title,
          used:true
        }
        
        let updateIdea = await dispatch(updateIdeas(reqBody))
        alert("update success");
        dispatch(clearData());
        navigate("/");
      } catch (e) {
        alert(e);
      }
    } else {
      let tem = pageState;
      setPageState((tem += 1));
    }
  }
  function MfirstPageData(info) {
    // console.log(info)
    setFirstPageData(info);
    // console.log(firstPageData)
    dispatch(setTopic(info));
    // dispatch(updateDetail({ payload: info, tableName: 'userDetailPageOne' }))
  }
  let routes = [];
  routes = ["Select Theme", "Format NewsLetter", "Generate NewsLetter"];
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

  return (
    // <div className=" bg-gray-800 min-h-screen">
    <div className="bg-gray-800 w-screen h-[94%]">
    <div className={`${pageState === 2 ? "w-5/6 " : "w-screen"} flex flex-col `}>
      <div className="w-3/4 mx-auto text-white my-auto overflow-scroll">
        <div class="bg-gray-900 relative min-h-[90vh] rounded-xl border-gray-300 border-2 text-center pt-3">
          <div className="mb-10">
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

          {pageState == 1 && (
            <DetailPage
              qestionTitle={"Generate Question"}
              dataCurrent={firstPageData}
              ideas={aIdeas}
              pageNumber={pageState === pageTotal}
              questionList={firstPageData}
              GenerateIdea={() => { generateIdea() }}
              loadingIdeas={loadingIdeas}
              setLoadingIdeas={setLoadingIdeas}
              previousPage={() => {
                getPreviousStep();
              }}
              nextPage={(data) => {
                // console.log(data);
                MfirstPageData(data);
                getNextStep();
              }}
            />
          )}
          {pageState == 2 && (
            <div className="">
              <ContentLayout
                layoutType={firstPageData[2].data}
                previousPage={() => {
                  getPreviousStep();
                }}
                nextPage={() => {
                  getNextStep();
                }}
              />
            </div>
          )
          }
          {pageState == 3 && (
            <Content
              qestionTitle={"Here is your newsletter content"}
              pageNumber={pageState === pageTotal}
              previousPage={() => {
                getPreviousStep();
              }}
              nextPage={() => {
                getNextStep();
              }}
            />
          )}
          {/* {pageState == 6 && (
                    <StylePage
                        qestionTitle={"Custom Your Style"}
                        pageNumber={pageState === 6}
                        previousPage={() => { getPreviousStep() }}
                        nextPage={() => { getNextStep() }}

                    />
                )} */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default GenerateSession;
