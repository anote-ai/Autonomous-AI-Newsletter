import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
// import { login } from "../../redux/UserSlice";
import { Button, Checkbox, Label, TextInput, ToggleSwitch, Textarea, Select as Select1 } from "flowbite-react";
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
import {
    setIdeas,
    generateIdeas
} from "../../redux/newsLetterSlice";

function DetailPage(props) {

    const [data, setData] = useState(props.dataCurrent);
    const [categoryArray, setCategoryArray] = useState(categoryList);
    const [peopleDemographics, setPeopleDemographics] = useState(AllPeopleDemographics);
    const [ageRange, setAgeRange] = useState(AgeRange);
    const [incomeLevel, setIncomLevel] = useState(IncomeLevel);
    const [stylisticChoice, setStylisticChoice] = useState(StylisticChoice);
    const [aIdeas, setAIdeas] = useState(props.ideas)
    let viewCard = null
    const buildCard = (eachdata) => {
        if (eachdata.type === "input") {
            return (
                <div className="flex flex-col items-center mx-10">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;*</span>)}
                            {eachdata.require === false && (<span className="text-sm">&nbsp; (optional)</span>)}
                        </span>
                        <TextInput
                            required
                            type="text"
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                tem[eachdata.id - 1].data = e.target.value
                                setData(tem);
                            }}

                            className="my-2 w-full mx-auto"
                            value={eachdata.data}
                        ></TextInput>
                    </div>
                </div>
            );
        }
        else if (eachdata.type === "url") {
            return (
                <div className="flex flex-col items-center mx-10">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  *</span>)}
                            {eachdata.require === false && (<span className="text-sm">&nbsp;  (optional)</span>)}
                        </span>
                        <TextInput
                            addon="url"
                            required
                            type="text"
                            placeholder="http://"
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                tem[eachdata.id - 1].data = e.target.value
                                setData(tem);
                                // console.log(eachdata.data);
                            }}
                            className="my-2 w-full mx-auto"
                            value={eachdata.data}
                        ></TextInput>
                    </div>
                </div >
            );
        }
        else if (eachdata.type === "bubbleSelect") {
            // console.log(categoryArray)
            let TemCategoryArray = categoryArray.map((each) => {
                if (eachdata.data.includes(each.name)) {
                    each.isActive = true;
                    return each
                }
                else {
                    return each
                }
            });
            return (
                <div className="flex flex-col mx-10 my-5">
                    <span className=" flex">{eachdata.title}
                        {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  *</span>)}
                        {eachdata.require === false && (<span className="text-sm">&nbsp;  (optional)</span>)}
                    </span>
                    <div className="flex items-center my-1 justify-center py-4 md:py-8 flex-wrap border-2 border-slate-600 rounded-lg">
                        {TemCategoryArray.map((eachCategory) => {
                            return (
                                <div type="button" className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachCategory.isActive
                                    ? "ring-4 outline-none ring-gray-300"
                                    : ""
                                    }`}
                                    onClick={() => {
                                        changeActive(TemCategoryArray, setCategoryArray, eachCategory, 5, false);
                                    }}>{eachCategory.name}</div>)
                        })}
                    </div>
                </div>
            )
        }
        else if (eachdata.type === "colorSelect") {
            return (
                <div className="flex flex-col items-center mx-10 my-5">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                            {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                        </span>
                        <Select2
                            value={eachdata.data}
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                tem[eachdata.id - 1].data = e.target.value
                                setData(tem);
                                // console.log(data);
                            }}
                            className="flex w-full rounded-lg border border-gray-600 bg-gray-700"

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
            )
        }
        else if (eachdata.type === "fontSelect") {
            return (
                <div className="flex flex-col items-center mx-10 my-5">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                            {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                        </span>
                        <Select1
                            value={eachdata.data}
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                tem[eachdata.id - 1].data = e.target.value
                                setData(tem);
                                // console.log(data);
                            }}
                        // className="flex w-64 bg-slate-100 ml-10"

                        >
                            {fontsStyle.map((font, idx) => (
                                <option key={idx} value={font} style={{ fontSize: "10px", fontFamily: font }}>
                                    {font}
                                </option>
                            ))}
                        </Select1>
                    </div>
                </div>
            )
        }
        else if (eachdata.type === "timeSelect") {
            return (
                <div className="flex flex-col items-center mx-10 my-5">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                            {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                        </span>
                        <Select1
                            value={eachdata.data}
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                tem[eachdata.id - 1].data = e.target.value
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
            )
        }
        else if (eachdata.type === "languageSelect") {
            return (
                <div className="flex flex-col items-center mx-10 my-5">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                            {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                        </span>
                        <Select1
                            value={eachdata.data}
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                tem[eachdata.id - 1].data = e.target.value
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
            )
        }
        else if (eachdata.type === "fontSizeSelect") {
            return (
                <div className="flex flex-col items-center mx-10 my-5">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                            {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                        </span>
                        <Select1
                            value={eachdata.data}
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                tem[eachdata.id - 1].data = e.target.value
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
            )
        }
        else if (eachdata.type === "peopleDemographics") {
            // console.log(categoryArray)
            let TemPeopleDemographics = peopleDemographics.map((each) => {
                if (eachdata.data == each.name) {
                    each.isActive = true;
                    return each
                }
                else {
                    return each
                }
            });
            return (
                <div className="flex flex-col mx-10 my-5">
                    <span className=" flex">{eachdata.title}
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  *</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  (optional)</span>)}
                    </span>
                    <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
                        {TemPeopleDemographics.map((Demographics) => {
                            return (
                                <div type="button" className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${Demographics.isActive
                                    ? "ring-4 outline-none ring-gray-300"
                                    : ""
                                    }`}
                                    onClick={() => {
                                        changeActive(TemPeopleDemographics, setPeopleDemographics, Demographics, 4, true);
                                    }}>{Demographics.name}</div>)
                        })}
                    </div>
                </div>
            )
        }
        else if (eachdata.type === "numberRange") {
            // console.log(categoryArray)
            let TemAgeRange = ageRange.map((each) => {
                if (eachdata.data == each.name) {
                    each.isActive = true;
                    return each
                }
                else {
                    return each
                }
            });
            return (
                <div className="flex flex-col mx-10 my-5">
                <span className=" flex">{eachdata.title}
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  *</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  (optional)</span>)}
                    </span>
                    <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
                        {TemAgeRange.map((eachAgeRange) => {
                            return (
                                <div type="button" className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachAgeRange.isActive
                                    ? "ring-4 outline-none ring-gray-300"
                                    : ""
                                    }`}
                                    onClick={() => {
                                        changeActive(TemAgeRange, setAgeRange, eachAgeRange, 5, true);
                                    }}>{eachAgeRange.name}</div>)
                        })}
                    </div>
                </div>
            )
        }
        else if (eachdata.type === "incomeRange") {
            // console.log(categoryArray)
            let TemIncomeLevel = incomeLevel.map((each) => {
                if (eachdata.data.includes(each.name)) {
                    each.isActive = true;
                    return each
                }
                else {
                    return each
                }
            });
            return (
                <div className="flex flex-col mx-10 my-5">
                <span className=" flex">{eachdata.title}
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  *</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  (optional)</span>)}
                </span>
                    <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
                        {TemIncomeLevel.map((eachIncomeLevel) => {
                            return (
                                <div type="button" className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachIncomeLevel.isActive
                                    ? "ring-4 outline-none ring-gray-300"
                                    : ""
                                    }`}
                                    onClick={() => {
                                        changeActive(TemIncomeLevel, setIncomLevel, eachIncomeLevel, 6, false);
                                    }}>{eachIncomeLevel.name}</div>)
                        })}
                    </div>
                </div>
            )
        }
        else if (eachdata.type === "styleSelect") {
            // console.log(categoryArray)
            let TemStylisticChoice = stylisticChoice.map((each) => {
                if (eachdata.data.includes(each.name)) {
                    each.isActive = true;
                    return each
                }
                else {
                    return each
                }
            });
            return (
                <div className="flex flex-col mx-10 my-5">
                <span className=" flex">{eachdata.title}
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  *</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  (optional)</span>)}
                    </span>
                    <div className="flex items-center justify-center my-1 py-4 md:py-8 flex-wrap border-gray-700 border-2 rounded-xl">
                        {TemStylisticChoice.map((eachStylisticChoice) => {
                            return (
                                <div type="button" className={`text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white ${eachStylisticChoice.isActive
                                    ? "ring-4 outline-none ring-gray-300"
                                    : ""
                                    }`}
                                    onClick={() => {
                                        changeActive(TemStylisticChoice, setStylisticChoice, eachStylisticChoice, 7, false);
                                    }}>{eachStylisticChoice.name}</div>)
                        })}
                    </div>
                </div>
            )
        }
        else if (eachdata.type === "toggleSwitch") {
            return (
                <div className="grid grid-cols-2 items-center mx-10 my-5">
                    <span className=" flex">{eachdata.title}
                    {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                    {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                    </span>
                    <ToggleSwitch
                        checked={eachdata.data}
                        
                        onChange={function (e) {
                            // console.log(e)
                            let tem = JSON.parse(JSON.stringify(data));
                            tem[eachdata.id - 1].data = e
                            setData(tem);
                            // console.log(data);
                        }}
                    />
                </div>
            )
        }
        else if (eachdata.type === "text") {
            return (
                <div className="grid grid-cols-1 mx-10 items-center my-5">
                    <span className="text-left">{eachdata.title}
                        {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  *</span>)}
                        {eachdata.require === false && (<span className="text-xs">&nbsp;  (optional)</span>)}</span>
                    <Textarea
                        value={eachdata.data}
                        className="w-full mx-auto my-1"
                        rows={3}
                        onChange={(e) => {
                            let tem = JSON.parse(JSON.stringify(data));
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                        }}
                    />
                </div>
            );
        }
        else if (eachdata.type === "themeSelect") {
            return (
                <div className="grid grid-cols-2 items-center mx-10 my-5">
                    <span className=" flex">{eachdata.title}
                        {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                        {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                    </span>
                    <Select1
                        value={eachdata.data}
                        onChange={(e) => {
                            let tem = JSON.parse(JSON.stringify(data));
                            tem[eachdata.id - 1].data = e.target.value
                            console.log("tem", tem);
                            setData(tem);
                        }}
                    >
                        <option disabled key="default" value=""></option>
                        {ThemeTopic.map((font, idx) => (
                            <option key={idx} value={font} style={{ fontSize: font }}>
                                {font}
                            </option>
                        ))}
                    </Select1>
                </div>
            );
        }
        else if (eachdata.type === "characterSelect") {
            return (
                <div className="grid grid-cols-2 items-center mx-10 my-5">
                    <span className=" flex">{eachdata.title}
                        {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                        {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                    </span>
                    <Select1
                        value={eachdata.data}
                        onChange={(e) => {
                            let tem = JSON.parse(JSON.stringify(data));
                            tem[eachdata.id - 1].data = e.target.value
                            console.log("tem", tem);
                            setData(tem);
                        }}
                    >
                        <option disabled key="default" value=""></option>
                        {CharacterList.map((font, idx) => (
                            <option key={idx} value={font} style={{ fontSize: font }}>
                                {font}
                            </option>
                        ))}
                    </Select1>
                </div>
            );
        }
        else if (eachdata.type === "ideaSelect") {
            return (
                <div>
                    <div className="grid grid-cols-2 items-center mx-10 my-5">
                        <span className=" flex">{eachdata.title}
                            {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; *</span>)}
                            {eachdata.require === false && (<span className="text-sm"> &nbsp;  (optional) &nbsp;&nbsp;</span>)}
                            {props.loadingIdeas &&
                                <div role="status" className="ml-auto">
                                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            }
                        </span>
                        <div className="flex">
                        <Select1
                            className="w-4/6"
                            value={eachdata.data}
                            onChange={(e) => {
                                let tem = JSON.parse(JSON.stringify(data));
                                // console.log(e.target.value)
                                tem[eachdata.id - 1].data = e.target.value
                                console.log("tem", tem);
                                setData(tem);
                            }}
                        >
                            <option disabled key="default" value=""></option>
                            {/* {console.log("props.ideas",props.ideas)} */}
                            {props.ideas.map((font, idx) => (
                                <option key={idx} value={font.id} style={{ fontSize: font }}>
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
    }

    let changeActive = (sourceData, setSourceData, sourceElement, idx, singleFlag) => {
        let newArray = sourceData.map(element => {
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
                }
                else {
                    let tem = JSON.parse(JSON.stringify(data));
                    console.log("tem[idx].data2", tem[idx].data)
                    let newElementArray = tem[idx].data.filter((item) => { return item !== element.name });
                    tem[idx].data = newElementArray;
                    setData(tem);
                }
                return element;
            }
            else {
                if (singleFlag === true && element.isActive === true) {
                    element.isActive = false;
                    let tem = JSON.parse(JSON.stringify(data));
                    console.log("tem[idx].data3", tem[idx].data)
                    let newElementArray = tem[idx].data.filter((item) => { return item !== element.name });
                    tem[idx].data = newElementArray;
                    setData(tem);
                }
                return element;
            }
        });
        setSourceData(newArray);
        console.log(data)
    }
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
    viewCard = data && data.map((each) => {
        return buildCard(each);
    })
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
                        props.nextPage(data);
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
