import "./../styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import {
  uploadPath,
  reviewerPath,
  customizePath,
  annotatePath,
  myDatasetsPath,
  accountPath,
  downloadPath,
  structuredMislabelsPath,
  structuredDashboardPath,
  apiKeyDashboardPath,
} from "./../constants/RouteConstants";
import {
  useCurrentDataset,
  useCurrentDatasetObj,
  useAlreadyStructured,
  useTaskType,
  resetCurrentDataset,
} from "./../redux/DatasetSlice";
import { useCategories } from "./../redux/LabelingFunctionSlice";
import { useState, useEffect } from "react";
import "../styles/google_button.css";
import { useDispatch } from "react-redux";
import { logout } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { GetFaqsUrl, GetHomeUrl } from "./../util/DomainParsing";
import { NLPTask, AccessLevel } from "../constants/DbEnums";
import SelectDatasetView from "../subcomponents/upload/SelectDatasetView";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Navbar({ curr_index, nextDisabled }) {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(curr_index);
  async function onLogout() {
    await dispatch(logout());
    navigate("/");
  }

  function GetSelectedClassFromPath(path) {
    const selected_path = useLocation().pathname;
    if (path == selected_path) {
      return "Selected";
    } else {
      return "Unselected";
    }
  }

  let currentDataset = useCurrentDataset();
  let currentDatasetObj = useCurrentDatasetObj();
  var datasetAccessLevel = null;
  if ("privileges" in currentDatasetObj) {
    datasetAccessLevel = currentDatasetObj["privileges"];
  }

  let hasCategories = useCategories().length > 0;
  let alreadyStructured = useAlreadyStructured();
  let taskType = useTaskType();
  var showAnnotate = true;

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const sessionToken = localStorage.getItem("sessionToken");
  if (accessToken || sessionToken) {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
    }
  } else {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  }

  var requireAdmin = datasetAccessLevel != AccessLevel.ANNOTATOR;

  function GetEnabledClassFromPath(path) {
    if (!isLoggedIn) {
      return "Disabled";
    }
    if (path == uploadPath) {
      return "Enabled";
    } else if (path == reviewerPath) {
      return "Enabled";
    } else if (currentDataset != 0) {
      if (
        datasetAccessLevel == AccessLevel.ANNOTATOR &&
        (path == customizePath ||
          path == downloadPath ||
          path == structuredMislabelsPath ||
          path == structuredDashboardPath)
      ) {
        return "Disabled";
      }
      return "Enabled";
    } else {
      return "Disabled";
    }
  }

  function GetClassesFromPath(path) {
    return GetSelectedClassFromPath(path) + " " + GetEnabledClassFromPath(path);
  }

  useEffect(() => {});

  function onHelp() {
    var fullFaqPath = GetFaqsUrl();
    window.open(fullFaqPath, "_blank") || window.location.replace(fullFaqPath);
  }

  function onHome() {
    var fullHomePath = GetHomeUrl();
    window.open(fullHomePath, "_blank") ||
      window.location.replace(fullHomePath);
  }

  function onDocs() {
    window.open("https://docs.anote.ai/");
  }

  let routes = [];
  // if (alreadyStructured && requireAdmin) {
  routes = [
    // uploadPath,
    customizePath,
    annotatePath,
    // structuredMislabelsPath,
    // structuredDashboardPath,
    downloadPath,
  ];
  // } else {
  //   routes = [customizePath, annotatePath, downloadPath];
  // }
  function onNext() {
    if (currentIndex < routes.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }

  function onBack() {
    if (currentIndex === 0) {
      dispatch(resetCurrentDataset());
      navigate(uploadPath);
    } else if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }
  useEffect(() => {
    console.log("Navigating to:", routes[currentIndex]);
    navigate(routes[currentIndex]);
  }, [currentIndex, navigate]);

  // function Step({ number, text, isActive }) {
  //   return (
  //     <div className="flex items-center">
  //       <div
  //         className={`w-8 h-8 rounded-full flex items-center justify-center ${
  //           isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
  //         }`}
  //       >
  //         {number}
  //       </div>
  //       <div className="ml-2">{text}</div>
  //     </div>
  //   );
  // }
  function Step({ number, text, isActive, index, currentIndex, total }) {
    return (
      <li
        className={`flex items-center ${
          index <= currentIndex
            ? " text-sky-500"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {index >= currentIndex ? (
          <span
            className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full shrink-0 ${
              index <= currentIndex
                ? "border-sky-500"
                : "border-gray-500 dark:border-gray-400"
            }`}
          >
            {number + 1}
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
          className={`capitalize ${
            index === currentIndex ? "font-semibold" : ""
          } `}
        >
          {text}
        </span>
        {index < total && (
          <div
            className={`ml-2 h-px w-12 border ${
              index >= currentIndex
                ? "border-gray-500 bg-gray-500"
                : "border-sky-500 bg-sky-500"
            } `}
          ></div>
        )}
      </li>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  var nextButtonStyle = {};
  if (nextDisabled) {
    nextButtonStyle = {
      opacity: "0",
      cursor: "default",
    };
  }

  return (
    <div>
      <div className="flex bg-gray-900 items-center justify-evenly pt-5 mb-5">
        <Button color="gray" outline onClick={onBack}>
          <div className="flex items-center">
            <FontAwesomeIcon className="w-4 h-4 mr-1" icon={faArrowLeft} />
            <span className="font-semibold">Back</span>
          </div>
        </Button>
        <div className="">
          <ol className="flex  items-center w-full p-3 space-x-2 text-xl font-medium text-center text-gray-500 shadow-sm dark:text-gray-400  sm:space-x-4">
            <Link key={uploadPath} to={uploadPath}>
              <li className={`flex items-center text-sky-500`}>
                <svg
                  class="w-6 h-6 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className={`capitalize`}>Upload</span>
                <div
                  className={`ml-2 h-px w-12 border border-sky-500 bg-sky-500`}
                ></div>
              </li>
            </Link>
            {routes.map((route, index) => (
              <Link
                key={route}
                // className={GetClassesFromPath(route)}
                to={route}
              >
                <Step
                  number={index + 1}
                  text={route.split("/")[1]}
                  isActive={currentIndex === index}
                  index={index}
                  currentIndex={currentIndex}
                  total={routes.length - 1}
                />
              </Link>
            ))}
          </ol>
        </div>
        <Button
          style={nextButtonStyle}
          disabled={nextDisabled}
          color="gray"
          outline
          onClick={onNext}
        >
          <div className="flex items-center">
            <span className="font-semibold">Next</span>
            <FontAwesomeIcon className="w-4 h-4 ml-1" icon={faArrowRight} />
          </div>
        </Button>
      </div>
      {/* <hr class="h-px my-4 border-0 bg-gray-700"></hr> */}
    </div>
  );
}

export default Navbar;