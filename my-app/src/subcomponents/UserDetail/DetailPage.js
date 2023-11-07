import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
// import { login } from "../../redux/UserSlice";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  ToggleSwitch,
  Textarea,
  Select as Select1,
} from "flowbite-react";
import { categoryList } from "../../constants/categoryList";
import { colors } from "../../constants/ColorDropdown";
import { FormControl, MenuItem } from "@material-ui/core";
import { Select as Select2 } from "@material-ui/core";
import { fontsStyle } from "../../constants/FontStyle";
import { oftenTime } from "../../constants/OftenSend";
import { LanguageSelect } from "../../constants/LanguageSelect";
import { fontSizes } from "../../constants/FontSize";
import { AllPeopleDemographics } from "../../constants/PeopleDemographics";
import { AgeRange } from "../../constants/AgeRange";
import { IncomeLevel } from "../../constants/IncomeLevel";
import { StylisticChoice } from "../../constants/StylisticChoice";
import { ThemeTopic } from "../../constants/ThemeTopic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CharacterList } from "../../constants/CharacterList";
import { useDispatch } from "react-redux";
import { setIdeas, generateIdeas } from "../../redux/newsLetterSlice";
import FreshlyBrewed from "../../Images/FreshlyBrewed.png";
import HighGloss from "../../Images/HighGloss.png";
import theNewPort from "../../Images/theNewPort.png";
import { current } from "@reduxjs/toolkit";

function DetailPage(props) {
  const [data, setData] = useState(props.dataCurrent);
  const [categoryArray, setCategoryArray] = useState(categoryList);
  const [peopleDemographics, setPeopleDemographics] = useState(
    AllPeopleDemographics
  );
  const [ageRange, setAgeRange] = useState(AgeRange);
  const [incomeLevel, setIncomLevel] = useState(IncomeLevel);
  const [stylisticChoice, setStylisticChoice] = useState(StylisticChoice);
  const [themeArray, setThemeArray] = useState(ThemeTopic);
  const [aIdeas, setAIdeas] = useState(props.ideas);
  const [validationErrors, setValidationErrors] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState("");
  let viewCard = null;
  const buildCard = (eachdata) => {
    if (eachdata.type === "input") {
      return (
        <div className="flex flex-col items-center mx-10">
          <div className="grid grid-cols-1 grid-rows-2 w-full items-center">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm">&nbsp;*</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm">&nbsp; (optional)</span>
              )}
            </span>
            <TextInput
              required
              type="text"
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                setData(tem);
              }}
              className="my-2 w-full mx-auto"
              value={eachdata.data}
              style={{"backgroundColor" : "#F7F5EC"}}
            ></TextInput>
          </div>
        </div>
      );
    } else if (eachdata.type === "url") {
      return (
        <div className="flex flex-col items-center mx-10">
          <div className="grid grid-cols-1 grid-rows-2 w-full items-center">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm">&nbsp; *</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm">&nbsp; (optional)</span>
              )}
            </span>
            <TextInput
              addon="url"
              required
              type="text"
              placeholder="http://"
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                setData(tem);
                // console.log(eachdata.data);
              }}
              className="my-2 w-full mx-auto"
              style={{"backgroundColor" : "#F7F5EC"}}
              value={eachdata.data}
            ></TextInput>
          </div>
        </div>
      );
    } else if (eachdata.type === "bubbleSelect") {
      // console.log(categoryArray)
      let TemCategoryArray = categoryArray.map((each) => {
        if (eachdata.data.includes(each.name)) {
          each.isActive = true;
          return each;
        } else {
          return each;
        }
      });
      return (
        <div className="flex flex-col mx-10 my-5">
          <span className="flex justify-center">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm">&nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm">&nbsp; (optional)</span>
            )}
          </span>
          <div className="flex items-center my-1 justify-center py-4 md:py-8 flex-wrap border-2 border-slate-600 rounded-lg">
            {TemCategoryArray.map((eachCategory) => {
              return (
                <div
                  type="button"
                  className={`text-gray-900 bg-[#F7F5EC] border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachCategory.isActive
                    ? "ring-4 outline-none ring-gray-300"
                    : ""
                    }`}
                  onClick={() => {
                    changeActive(
                      TemCategoryArray,
                      setCategoryArray,
                      eachCategory,
                      5,
                      false
                    );
                  }}
                >
                  {eachCategory.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (eachdata.type === "colorSelect") {
      // console.log("eachColor", eachdata)
      return (
        <div className="flex flex-col items-center mx-10 my-5">
          <div className="grid grid-cols-2 w-full items-center">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm"> &nbsp; *</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
              )}
            </span>
            <Select2
              value={eachdata.data}
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                setData(tem);
                // console.log(data);
              }}
              className="flex w-full rounded-lg border border-gray-600 bg-white"
            >
              {colors.map((color, idx) => (
                <MenuItem key={idx} value={color}>
                  <div
                    style={{
                      backgroundColor: color,
                      width: "80%",
                      height: "20px",
                      margin: "auto",
                    }}
                  />
                </MenuItem>
              ))}
            </Select2>
          </div>
        </div>
      );
    } else if (eachdata.type === "fontSelect") {
      return (
        <div className="flex flex-col items-center mx-10 my-5">
          <div className="grid grid-cols-2 w-full items-center">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm"> &nbsp; *</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
              )}
            </span>
            <Select1
              value={eachdata.data}
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                setData(tem);
                // console.log(data);
              }}
            // className="flex w-64 bg-slate-100 ml-10"
            >
              {fontsStyle.map((font, idx) => (
                <option
                  key={idx}
                  value={font}
                  style={{ fontSize: "10px", fontFamily: font }}
                >
                  {font}
                </option>
              ))}
            </Select1>
          </div>
        </div>
      );
    } else if (eachdata.type === "timeSelect") {
      return (
        <div className="flex flex-col items-center mx-10 my-5">
          <div className="grid grid-cols-2 w-full items-center">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm"> &nbsp; *</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
              )}
            </span>
            <Select1
              value={eachdata.data}
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                setData(tem);
                // console.log(data);
              }}
            >
              {oftenTime.map((font, idx) => (
                <option key={idx} value={font} style={{ fontSize: "10px" }}>
                  {font}
                </option>
              ))}
            </Select1>
          </div>
        </div>
      );
    } else if (eachdata.type === "languageSelect") {
      return (
        <div className="flex flex-col items-center mx-10 my-5">
          <div className="grid grid-cols-2 w-full items-center">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm"> &nbsp; *</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
              )}
            </span>
            <Select1
              value={eachdata.data}
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                setData(tem);
                // console.log(data);
              }}
            >
              {LanguageSelect.map((font, idx) => (
                <option key={idx} value={font} style={{ fontSize: "10px" }}>
                  {font}
                </option>
              ))}
            </Select1>
          </div>
        </div>
      );
    } else if (eachdata.type === "fontSizeSelect") {
      return (
        <div className="flex flex-col items-center mx-10 my-5">
          <div className="grid grid-cols-2 w-full items-center">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm"> &nbsp; *</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
              )}
            </span>
            <Select1
              value={eachdata.data}
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                setData(tem);
                // console.log(data);
              }}
            >
              {fontSizes.map((font, idx) => (
                <option key={idx} value={font} style={{ fontSize: font }}>
                  {font}
                </option>
              ))}
            </Select1>
          </div>
        </div>
      );
    } else if (eachdata.type === "peopleDemographics") {
      // console.log(categoryArray)
      let TemPeopleDemographics = peopleDemographics.map((each) => {
        if (eachdata.data == each.name) {
          each.isActive = true;
          return each;
        } else {
          return each;
        }
      });
      return (
        <div className="flex flex-col mx-10 my-5">
          <span className=" flex">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm">&nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm">&nbsp; (optional)</span>
            )}
          </span>
          <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
            {TemPeopleDemographics.map((Demographics) => {
              return (
                <div
                  type="button"
                  className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${Demographics.isActive
                    ? "ring-4 outline-none ring-gray-300"
                    : ""
                    }`}
                  onClick={() => {
                    changeActive(
                      TemPeopleDemographics,
                      setPeopleDemographics,
                      Demographics,
                      4,
                      true
                    );
                  }}
                >
                  {Demographics.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (eachdata.type === "numberRange") {
      // console.log(categoryArray)
      let TemAgeRange = ageRange.map((each) => {
        if (eachdata.data == each.name) {
          each.isActive = true;
          return each;
        } else {
          return each;
        }
      });
      return (
        <div className="flex flex-col mx-10 my-5">
          <span className=" flex">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm">&nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm">&nbsp; (optional)</span>
            )}
          </span>
          <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
            {TemAgeRange.map((eachAgeRange) => {
              return (
                <div
                  type="button"
                  className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachAgeRange.isActive
                    ? "ring-4 outline-none ring-gray-300"
                    : ""
                    }`}
                  onClick={() => {
                    changeActive(
                      TemAgeRange,
                      setAgeRange,
                      eachAgeRange,
                      5,
                      true
                    );
                  }}
                >
                  {eachAgeRange.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (eachdata.type === "incomeRange") {
      // console.log(categoryArray)
      let TemIncomeLevel = incomeLevel.map((each) => {
        if (eachdata.data.includes(each.name)) {
          each.isActive = true;
          return each;
        } else {
          return each;
        }
      });
      return (
        <div className="flex flex-col mx-10 my-5">
          <span className=" flex">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm">&nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm">&nbsp; (optional)</span>
            )}
          </span>
          <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
            {TemIncomeLevel.map((eachIncomeLevel) => {
              return (
                <div
                  type="button"
                  className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachIncomeLevel.isActive
                    ? "ring-4 outline-none ring-gray-300"
                    : ""
                    }`}
                  onClick={() => {
                    changeActive(
                      TemIncomeLevel,
                      setIncomLevel,
                      eachIncomeLevel,
                      6,
                      false
                    );
                  }}
                >
                  {eachIncomeLevel.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (eachdata.type === "styleSelect") {
      // console.log(categoryArray)
      let TemStylisticChoice = stylisticChoice.map((each) => {
        if (eachdata.data.includes(each.name)) {
          each.isActive = true;
          return each;
        } else {
          return each;
        }
      });
      return (
        <div className="flex flex-col mx-10 my-5">
          <span className=" flex">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm">&nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm">&nbsp; (optional)</span>
            )}
          </span>
          <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
            {TemStylisticChoice.map((eachStylisticChoice) => {
              return (
                <div
                  type="button"
                  className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachStylisticChoice.isActive
                    ? "ring-4 outline-none ring-gray-300"
                    : ""
                    }`}
                  onClick={() => {
                    changeActive(
                      TemStylisticChoice,
                      setStylisticChoice,
                      eachStylisticChoice,
                      7,
                      false
                    );
                  }}
                >
                  {eachStylisticChoice.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (eachdata.type === "toggleSwitch") {
      return (
        <div className="grid grid-cols-2 items-center mx-10 my-5">
          <span className=" flex">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm"> &nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
            )}
          </span>
          <ToggleSwitch
            checked={eachdata.data}
            onChange={function (e) {
              // console.log(e)
              let tem = JSON.parse(JSON.stringify(data));
              tem[eachdata.id - 1].data = e;
              setData(tem);
              // console.log(data);
            }}
          />
        </div>
      );
    } else if (eachdata.type === "text") {
      return (
        <div className="grid grid-cols-1 mx-10 items-center my-5">
          <span className="text-left">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm">&nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-xs">&nbsp; (optional)</span>
            )}
          </span>
          <Textarea
            value={eachdata.data}
            className="w-full mx-auto my-1"
            rows={3}
            onChange={(e) => {
              let tem = JSON.parse(JSON.stringify(data));
              tem[eachdata.id - 1].data = e.target.value;
              setData(tem);
            }}
            style={{"backgroundColor" : "#F7F5EC"}}
          />
        </div>
      );
    } else if (eachdata.type === "themeSelect") {
      console.log(eachdata);
      let TemThemeTopicArray = themeArray.map((each) => {
        if (eachdata.data == each.name) {
          each.isActive = true;
          return each;
        } else {
          each.isActive = false;
          return each;
        }
      });
      return (
        <div className="flex flex-col mx-10 my-5">
          <span className=" flex">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm">&nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm">&nbsp; (optional)</span>
            )}
          </span>
          {/* <div className="flex items-start my-1 justify-center py-4 md:py-8 flex-wrap border-2 border-slate-600 rounded-lg">
                        {TemThemeTopicArray.map((eachTheme) => {
                            return (
                                <div type="button" className={`w-1/4 text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white text-base font-medium px-5 py-2.5 text-center mr-2 mb-3 dark:text-white ${eachTheme.isActive
                                    ? "ring-4 outline-none ring-gray-300"
                                    : ""
                                    }`}

                                    onClick={() => {
                                        themeChangeActive(TemThemeTopicArray, setThemeArray, eachTheme, 0);
                                    }}>{eachTheme.name}
                                    <div>
                                        {eachTheme.name === "Freshly Brewed" && (
                                            <div className="mx-auto h-full cursor-pointer">
                                                <img src={FreshlyBrewed}></img>
                                                <p>Good for The Expert-style brand & sharing content, The Infopreneur, brands that function as essentially media companies because they're constantly pushing content out. Think "I have a lot to say"</p>
                                            </div>
                                        )}
                                        {eachTheme.name === "High Gloss" && (
                                            <div className="mx-auto h-full cursor-pointer">
                                                <img src={HighGloss}></img>
                                                <p>Good for the Influencer or Ecommerce, aspirational brands, personal brands, lifestyle brands or brands that just put out less content or bigger, meatier pieces of content</p>
                                            </div>
                                        )}
                                        {eachTheme.name === "The NewPort" && (
                                            <div className="mx-auto h-full cursor-pointer">
                                                <img src={theNewPort}></img>
                                                <p>Good for The Teacher, The Nerd, think more deep dive, the newsletter IS the article</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div> */}
          <div className="flex flex-wrap border border-slate-600 rounded-lg">
            {TemThemeTopicArray.map((eachTheme) => (
              <div
                key={eachTheme.name}
                className={`w-1/4 mx-auto text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white text-base font-medium px-5 py-2.5 text-center mr-2 mb-3 dark:text-white ${eachTheme.isActive ? "ring-4 outline-none ring-gray-300" : ""
                  } flex flex-col justify-between`}
              >
                <div
                  className="h-full flex flex-col cursor-pointer"
                  onClick={() => {
                    themeChangeActive(
                      TemThemeTopicArray,
                      setThemeArray,
                      eachTheme,
                      0
                    );
                  }}
                >
                  {eachTheme.name === "Freshly Brewed" && (
                    <>
                      <img
                        src={FreshlyBrewed}
                        alt="Freshly Brewed"
                        className="border border-gray-500 rounded mb-2"
                      />
                      <p className="text-xs my-auto">
                        Good for The Expert-style brand & sharing content, The
                        Infopreneur, brands that function as essentially media
                        companies because they're constantly pushing content
                        out. Think "I have a lot to say"
                      </p>
                    </>
                  )}
                  {eachTheme.name === "High Gloss" && (
                    <>
                      <img
                        src={HighGloss}
                        alt="High Gloss"
                        className="border border-gray-500 rounded mb-2"
                      />
                      <p className="text-xs my-auto">
                        Good for the Influencer or Ecommerce, aspirational
                        brands, personal brands, lifestyle brands or brands that
                        just put out less content or bigger, meatier pieces of
                        content
                      </p>
                    </>
                  )}
                  {eachTheme.name === "The NewPort" && (
                    <>
                      <img
                        src={theNewPort}
                        alt="The NewPort"
                        className="border border-gray-500 rounded mb-2"
                      />
                      <p className="text-xs my-auto">
                        Good for The Teacher, The Nerd, think more deep dive,
                        the newsletter IS the article
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      // return (
      //     <div className="grid grid-cols-2 items-center mx-10 my-5">
      //         <span className=" flex">{eachdata.title}
      //             {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
      //             {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
      //         </span>
      //         <Select1
      //             value={eachdata.data}
      //             onChange={(e) => {
      //                 let tem = JSON.parse(JSON.stringify(data));
      //                 tem[eachdata.id - 1].data = e.target.value
      //                 console.log("tem", tem);
      //                 setData(tem);
      //                 props.MSecondPageData(tem)
      //             }}
      //         >
      //             <option disabled key="default" value=""></option>
      //             {ThemeTopic.map((font, idx) => (
      //                 <option key={idx} value={font} style={{ fontSize: font }}>
      //                     {font}
      //                 </option>
      //             ))}
      //         </Select1>
      //     </div>
      // );
    } else if (eachdata.type === "characterSelect") {
      return (
        <div className="grid grid-cols-2 items-center mx-10 my-5">
          <span className=" flex">
            {eachdata.title}
            {eachdata.require === true && (
              <span className="text-red-500 text-sm"> &nbsp; *</span>
            )}
            {eachdata.require === false && (
              <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
            )}
          </span>
          <div className="flex items-center space-x-5">
            <Select1
              className="w-3/4"
              value={eachdata.data}
              onChange={(e) => {
                let tem = JSON.parse(JSON.stringify(data));
                tem[eachdata.id - 1].data = e.target.value;
                console.log("tem", tem);
                setData(tem);
                setCurrentCharacter(e.target.value);
                console.log(currentCharacter, e.target.value)
              }}
            >
              <option disabled key="default" value=""></option>
              {CharacterList.map((font, idx) => (
                <option key={idx} value={font.name} style={{ fontSize: font }}>
                  {font.emoji + " " + font.name}
                </option>
              ))}
            </Select1>
            <div className="relative inline-block group">
              <span className="text-gray-200 cursor-pointer border border-gray-500 py-2 px-3 rounded-xl">?</span>
              <div className="hidden group-hover:block w-40 absolute z-10 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
                {currentCharacter === "" ? (
                  <p className="text-gray-200 text-xs">
                    Choose Your Character-Style Writer Personas
                  </p>
                ) : (
                  <p className="text-gray-200">
                    {
                      CharacterList.find(
                        (char) => char.name === currentCharacter
                      )?.description
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
          <div
            className="h-full flex flex-col cursor-pointer"

          >
            {currentCharacter === "" ? (
                  <p className="text-xs my-auto">
                    Choose Your Character-Style Writer Personas
                  </p>
                ) : (
                  <p className="text-xs my-auto">
                    {
                      CharacterList.find(
                        (char) => char.name === currentCharacter
                      )?.description
                    }
                  </p>
                )}
            {/* {eachdata.data === "The Sloane Ranger" && (
              <>
                <p className="text-xs my-auto">
                  For this persona, you are a character who identifies as female, possesses a witty, intellectual, smart, and effortlessly classy personality, and primarily uses a friendly and informal tone. We will use this personality, tone, and character voice to write this article.
                </p>
              </>
            )}
            {eachdata.data === "The Saucy Intellect" && (
              <>
                <p className="text-xs my-auto">
                  “The Saucy Intellect” is your one-stop destination for content that is as enlightening as it is entertaining. With a satirical tone that dives deep into the quirks of modern life and an intellectual flair reminiscent of literature's greatest minds, this persona never fails to deliver a fresh perspective. Balancing humor and insight, the content crafted by "The Saucy Intellect" is both a reflection on society and a playful poke at its idiosyncrasies. Drawing inspiration from everyday experiences, it masterfully blends offbeat wit with deep reflections, wrapped in a charming New England dialect. Whether challenging societal norms or offering keen observations, "The Saucy Intellect" provides a unique voice in a world full of conventionality.
                </p>
              </>
            )}
            {eachdata.data === "The Winsome Jester" && (
              <>
                <p className="text-xs my-auto">
                  Maxwell "Max" Witmore is your go-to newsletter writer when you want a dose of humor in your daily news. With a sassy tone and an uncanny ability to observe the quirks of society, Max doesn't just deliver the news; he serves it with a side of sarcasm and a sprinkle of self-deprecation. Drawing from a vast reservoir of comedic forms, from the satirical plays of ancient Greece to the modern memes of social media, Max ensures that his readers both laugh and think. Aware of the pitfalls in comedic writing, he adeptly avoids clichés, stereotypes, and forced comedy, choosing instead to surprise and engage his readers with clever wordplay and relatable themes. Whether it's politics, culture, or just the oddities of everyday life, trust Max to give you a fresh and hilarious take on it.
                </p>
              </>
            )}
            {eachdata.data === "The On-Trend Everygirl" && (
              <>
                <p className="text-xs my-auto">
                  For this persona you are a character who identifies as female, has voice is edgy, on-trend, and assertive—she'd OBVIOUSLY like to command the roadtrip DJ seat, and primarily uses a Irreverent and Edgy or Humorous and Sarcastic or Informal and Conversational tone. We will use this personality, tone, and character voice to write this article.
                </p>
              </>
            )}
            {eachdata.data === "The Energetic Expert" && (
              <>
                <p className="text-xs my-auto">
                  For this persona, you are a character who identifies as masculine, has a voice like an Energetic Expert—upbeat, persuasive, and passionate—and primarily uses vibrant energy, enthusiasm, unwavering confidence, and crystal-clear delivery tone. Using this personality and tone, we will write this article.
                </p>
              </>
            )} */}
          </div>
        </div>
      );
    } else if (eachdata.type === "ideaSelect") {
      return (
        <div>
          <div className="grid grid-cols-2 items-center mx-10 my-5">
            <span className=" flex">
              {eachdata.title}
              {eachdata.require === true && (
                <span className="text-red-500 text-sm"> &nbsp; *</span>
              )}
              {eachdata.require === false && (
                <span className="text-sm"> &nbsp; (optional) &nbsp;&nbsp;</span>
              )}
              {props.loadingIdeas && (
                <div role="status" className="ml-auto">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </span>
            <div className="flex">
              <Select1
                className="w-4/6"
                value={eachdata.data}
                onChange={(e) => {
                  let tem = JSON.parse(JSON.stringify(data));
                  console.log("tem", tem)
                  const selectedOptionId =
                    e.target.options[e.target.selectedIndex].id;
                  const selectedOptionSubIdea =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "subIdea"
                    );
                  // console.log("selectedOptionId", Number(selectedOptionId))
                  // console.log("selectedOptionSubIdea", selectedOptionSubIdea)
                  tem[eachdata.id - 1].ideaId = Number(selectedOptionId);
                  tem[eachdata.id - 1].subIdea = JSON.parse(
                    selectedOptionSubIdea
                  );
                  tem[eachdata.id - 1].data = e.target.value;
                  // console.log("tem", tem);
                  setData(tem);
                }}
              >
                <option disabled key="default" value=""></option>
                {/* {console.log("props.ideas",props.ideas)} */}
                {props.ideas.map((font, idx) => (
                  <option
                    key={idx}
                    value={font.title}
                    id={font.id}
                    subIdea={JSON.stringify(font.subIdea)}
                    style={{ fontSize: font }}
                  >
                    {font.title}
                  </option>
                ))}
              </Select1>
              <Button
                className="ml-auto"
                onClick={() => {
                  console.log("generateIdea in detail");
                  props.GenerateIdea();
                  props.setLoadingIdeas(true);
                }}
              >
                Generate Ideas
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  let themeChangeActive = (sourceData, setSourceData, sourceElement, idx) => {
    let newArray = sourceData.map((element) => {
      if (element.name === sourceElement.name) {
        // let tem = JSON.parse(JSON.stringify(element));
        element.isActive = true;
        let tem = JSON.parse(JSON.stringify(data));
        tem[idx].data = element.name;
        setData(tem);
        return element;
      } else {
        element.isActive = false;
        return element;
      }
    });
    setSourceData(newArray);
    console.log(data);
  };

  let changeActive = (
    sourceData,
    setSourceData,
    sourceElement,
    idx,
    singleFlag
  ) => {
    let newArray = sourceData.map((element) => {
      if (element.name === sourceElement.name) {
        // let tem = JSON.parse(JSON.stringify(element));
        element.isActive = !element.isActive;
        if (element.isActive === true) {
          let tem = JSON.parse(JSON.stringify(data));
          if (!Array.isArray(tem[idx].data)) {
            tem[idx].data = [];
          }
          tem[idx].data.push(element.name);
          setData(tem);
        } else {
          let tem = JSON.parse(JSON.stringify(data));
          console.log("tem[idx].data2", tem[idx].data);
          let newElementArray = tem[idx].data.filter((item) => {
            return item !== element.name;
          });
          tem[idx].data = newElementArray;
          setData(tem);
        }
        return element;
      } else {
        if (singleFlag === true && element.isActive === true) {
          element.isActive = false;
          let tem = JSON.parse(JSON.stringify(data));
          console.log("tem[idx].data3", tem[idx].data);
          let newElementArray = tem[idx].data.filter((item) => {
            return item !== element.name;
          });
          tem[idx].data = newElementArray;
          setData(tem);
        }
        return element;
      }
    });
    setSourceData(newArray);
    console.log(data);
  };
  // let changeCategoryActive = (category) => {
  //     let newArray = categoryArray.map(element => {
  //         if (element.name === category.name) {
  //             // let tem = JSON.parse(JSON.stringify(element));
  //             element.isActive = !element.isActive;
  //             if (element.isActive === true) {
  //                 let tem = JSON.parse(JSON.stringify(data));
  //                 tem[5].data.push(element.name);
  //                 setData(tem);
  //             }
  //             else {
  //                 let tem = JSON.parse(JSON.stringify(data));
  //                 let newElementArray = tem[5].data.filter((item) => { return item !== element.name });
  //                 tem[5].data = newElementArray;
  //                 setData(tem);
  //             }
  //             return element;
  //         }
  //         else {
  //             return element;
  //         }
  //     });
  //     setCategoryArray(newArray);
  //     console.log(data)
  // }

  // let changeDemographicsActive = (demographics) => {
  //     let tem = JSON.parse(JSON.stringify(data))
  //     // console.log("data",data);
  //     let newArray = peopleDemographics.map((element) => {
  //         if (element.name === demographics.name) {
  //             // let tem = JSON.parse(JSON.stringify(element));
  //             element.isActive = !element.isActive;
  //             if (element.isActive === true) {
  //                 // let tem = JSON.parse(JSON.stringify(data));
  //                 // let tem = JSON.parse(JSON.stringify(data));
  //                 let temObj = JSON.parse(JSON.stringify(tem[4]));
  //                 temObj.data = element.name;
  //                 // console.log(tem[4].data)
  //                 tem[4] = temObj;
  //                 setData(tem);
  //                 // console.log('tem', tem);
  //                 // console.log(data)
  //             }
  //             else {
  //                 // console.log("2")
  //                 // let tem = JSON.parse(JSON.stringify(data))
  //                 // let tem = JSON.parse(JSON.stringify(data));
  //                 tem[4].data = "";
  //                 setData(tem);
  //             }
  //             return element;
  //         }
  //         else {
  //             // console.log('3')
  //             element.isActive = false;
  //             return element;
  //         }
  //     });
  //     setPeopleDemographics(newArray);
  //     // console.log("newArray", newArray);
  //     // console.log(data)
  // }
  // let changeAgeRangeActive = (CageRange) => {
  //     let tem = JSON.parse(JSON.stringify(data))
  //     // console.log("data",data);
  //     let newArray = ageRange.map(element => {
  //         if (element.name === CageRange.name) {
  //             // let tem = JSON.parse(JSON.stringify(element));
  //             element.isActive = !element.isActive;
  //             if (element.isActive === true) {
  //                 // let tem = JSON.parse(JSON.stringify(data));
  //                 // let tem = JSON.parse(JSON.stringify(data));
  //                 let temObj = JSON.parse(JSON.stringify(tem[5]));
  //                 temObj.data = element.name;
  //                 // console.log(tem[4].data)
  //                 tem[5] = temObj;
  //                 setData(tem);
  //                 // console.log('tem', tem);
  //                 // console.log(data)
  //             }
  //             else {
  //                 // console.log("2")
  //                 // let tem = JSON.parse(JSON.stringify(data))
  //                 // let tem = JSON.parse(JSON.stringify(data));
  //                 tem[5].data = "";
  //                 setData(tem);
  //             }
  //             return element;
  //         }
  //         else {
  //             // console.log('3')
  //             element.isActive = false;
  //             return element;
  //         }
  //     });
  //     setAgeRange(newArray);
  //     // console.log("newArray", newArray);
  //     // console.log(data)
  // }
  // let changeIncomeLevelActive = (CincomeRange) => {

  //     let newArray = incomeLevel.map(element => {
  //         if (element.name === CincomeRange.name) {
  //             // let tem = JSON.parse(JSON.stringify(element));
  //             element.isActive = !element.isActive;
  //             if (element.isActive === true) {
  //                 let tem = JSON.parse(JSON.stringify(data));
  //                 tem[6].data.push(element.name);
  //                 setData(tem);
  //             }
  //             else {
  //                 let tem = JSON.parse(JSON.stringify(data));
  //                 let newElementArray = tem[6].data.filter((item) => { return item !== element.name });
  //                 tem[6].data = newElementArray;
  //                 setData(tem);
  //             }
  //             return element;
  //         }
  //         else {
  //             return element;
  //         }
  //     });
  //     setIncomLevel(newArray);
  //     console.log(data)
  // }

  // const buildOutput = () => {
  //     // console.log("map card")
  //     // console.log("datacurrent", props.dataCurrent)
  //     viewCard = data && data.map((each) => {
  //         return buildCard(each);
  //     })
  //     // console.log(viewCard)
  // }
  // buildOutput();
  const validateAndNextPage = () => {
    // data.forEach((eachdata) => {
    //     if (eachdata.require && !eachdata.data) {
    //         setValidationErrors(true)
    //     }
    // });
    setValidationErrors(false);
    for (let i = 0; i < data.length; i++) {
      if (data[i].require && !data[i].data) {
        setValidationErrors(true);
        alert("Please Fill all require data");
        return;
      }
    }
    props.nextPage(data);
  };
  viewCard =
    data &&
    data.map((each) => {
      return buildCard(each);
    });
  return (
    <div>
      {/* <div className="flex flex-col items-center">
                <h1>{props.qestionTitle}</h1>
                <TextInput
                    id="dsearch"
                    name="dsearch"
                    required
                    type="text"
                    onChange={(e) => {
                    }}
                    
                    className="my-2 w-1/2 mx-auto"
                    value={'text'}
                ></TextInput>
            </div> */}
      {validationErrors === true && (
        <div className="text-red-500">Please Fill all require data</div>
      )}
      {viewCard}
      <div className=" absolute bottom-5 left-10">
        <Button
          outline
          onClick={() => {
            props.previousPage();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-0.5" />
          Previous
        </Button>
      </div>
      <div className="absolute bottom-5 right-10">
        <Button
          outline
          onClick={() => {
            validateAndNextPage();
          }}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 mt-0.5" />
        </Button>
      </div>
    </div>
  );
}

export default DetailPage;
