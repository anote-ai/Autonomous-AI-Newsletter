import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
// import { login } from "../../redux/UserSlice";
import { Button, Checkbox, Label, TextInput, ToggleSwitch, Textarea } from "flowbite-react";
import { categoryList } from "../../constants/categoryList";
import { colors } from "../../constants/ColorDropdown";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { fontsStyle } from "../../constants/FontStyle";
import { oftenTime } from "../../constants/OftenSend";
import { LanguageSelect } from "../../constants/LanguageSelect";
import { fontSizes } from "../../constants/FontSize";
import { AllPeopleDemographics } from "../../constants/PeopleDemographics";
import { AgeRange } from "../../constants/AgeRange";
import { IncomeLevel } from "../../constants/IncomeLevel";
import { StylisticChoice } from "../../constants/StylisticChoice"

function DetailPage(props) {

    const [data, setData] = useState(props.dataCurrent);
    const [categoryArray, setCategoryArray] = useState(categoryList);
    const [peopleDemographics, setPeopleDemographics] = useState(AllPeopleDemographics);
    const [ageRange, setAgeRange] = useState(AgeRange);
    const [incomeLevel, setIncomLevel] = useState(IncomeLevel);
    const [stylisticChoice, setStylisticChoice] = useState(StylisticChoice);
    let viewCard = null
    const buildCard = (eachdata) => {
        if (eachdata.type === "input") {
            return (
                <div className="flex flex-col items-center">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <TextInput
                        required
                        type="text"
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                        }}
                        style={{ color: "black", width: "100%" }}
                        className="my-2 w-1/2 mx-auto"
                        value={eachdata.data}
                    ></TextInput>
                </div>
            );
        }
        else if (eachdata.type === "url") {
            return (
                <div className="flex flex-col items-center" >
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <TextInput
                        addon="url"
                        required
                        type="text"
                        placeholder="http://"
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                            // console.log(eachdata.data);
                        }}
                        style={{ color: "black", width: "100%" }}
                        className="my-2 w-1/2 mx-auto"
                        value={eachdata.data}
                    ></TextInput>
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
                <div className="flex flex-col items-center">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap border-blue-400 border-4">
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
                <div className="flex items-center ml-10 my-5">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; require</span>)}
                    {eachdata.require === false && (<span className="text-sm"> &nbsp;  optional &nbsp;&nbsp;</span>)}
                    <Select
                        value={eachdata.data}
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                            // console.log(data);
                        }}
                        className="flex w-24 bg-slate-100 ml-10"

                    >
                        {colors.map((color, idx) => (
                            <MenuItem key={idx} value={color}>
                                <div
                                    style={{
                                        backgroundColor: color,
                                        width: "80px",
                                        height: "20px",
                                        margin: "auto",
                                    }}
                                />
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )
        }
        else if (eachdata.type === "fontSelect") {
            return (
                <div className="flex items-center ml-10 my-5">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; require</span>)}
                    {eachdata.require === false && (<span className="text-sm"> &nbsp;  optional &nbsp;&nbsp;</span>)}
                    <Select
                        value={eachdata.data}
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                            // console.log(data);
                        }}
                        className="flex w-64 bg-slate-100 ml-10"

                    >
                        {fontsStyle.map((font, idx) => (
                            <MenuItem key={idx} value={font} style={{ fontSize: "10px", fontFamily: font }}>
                                {font}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )
        }
        else if (eachdata.type === "timeSelect") {
            return (
                <div className="flex items-center ml-10 my-5">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; require</span>)}
                    {eachdata.require === false && (<span className="text-sm"> &nbsp;  optional &nbsp;&nbsp;</span>)}
                    <Select
                        value={eachdata.data}
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                            // console.log(data);
                        }}
                        className="flex w-64 bg-slate-100 ml-10"

                    >
                        {oftenTime.map((font, idx) => (
                            <MenuItem key={idx} value={font} style={{ fontSize: "10px" }}>
                                {font}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )
        }
        else if (eachdata.type === "languageSelect") {
            return (
                <div className="flex items-center ml-10 my-5">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; require</span>)}
                    {eachdata.require === false && (<span className="text-sm"> &nbsp;  optional &nbsp;&nbsp;</span>)}
                    <Select
                        value={eachdata.data}
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                            // console.log(data);
                        }}
                        className="flex w-64 bg-slate-100 ml-10"

                    >
                        {LanguageSelect.map((font, idx) => (
                            <MenuItem key={idx} value={font} style={{ fontSize: "10px" }}>
                                {font}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )
        }
        else if (eachdata.type === "fontSizeSelect") {
            return (
                <div className="flex items-center ml-10 my-5">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; require</span>)}
                    {eachdata.require === false && (<span className="text-sm"> &nbsp;  optional &nbsp;&nbsp;</span>)}
                    <Select
                        value={eachdata.data}
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                            // console.log(data);
                        }}
                        className="flex w-64 bg-slate-100 ml-10"

                    >
                        {fontSizes.map((font, idx) => (
                            <MenuItem key={idx} value={font} style={{ fontSize: font }}>
                                {font}
                            </MenuItem>
                        ))}
                    </Select>
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
                <div className="flex flex-col items-center">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap border-blue-400 border-4">
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
                <div className="flex flex-col items-center">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap border-blue-400 border-4">
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
                if (eachdata.data == each.name) {
                    each.isActive = true;
                    return each
                }
                else {
                    return each
                }
            });
            return (
                <div className="flex flex-col items-center">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap border-blue-400 border-4">
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
                if (eachdata.data == each.name) {
                    each.isActive = true;
                    return each
                }
                else {
                    return each
                }
            });
            return (
                <div className="flex flex-col items-center">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap border-blue-400 border-4">
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
                <div className="flex items-center ml-10 my-5">
                    {/* <h1>{eachdata.title}</h1> */}
                    <ToggleSwitch
                        checked={eachdata.data}
                        label={eachdata.title}
                        onChange={function (e) {
                            // console.log(e)
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e
                            setData(tem);
                            // console.log(data);
                        }}
                    />
                    {eachdata.require === true && (<span className="text-red-500 text-sm"> &nbsp; require</span>)}
                    {eachdata.require === false && (<span className="text-sm"> &nbsp;  optional &nbsp;&nbsp;</span>)}
                </div>
            )
        }
        else if (eachdata.type === "text") {
            return (
                <div className="flex flex-col items-center">
                    <h1>{eachdata.title}</h1>
                    {eachdata.require === true && (<span className="text-red-500 text-sm">&nbsp;  require</span>)}
                    {eachdata.require === false && (<span className="text-sm">&nbsp;  optional</span>)}
                    <Textarea
                        value={eachdata.data}
                        className="my-2 w-1/2 h-40 mx-auto"
                        style={{ color: "black", width: "80%" }}
                        onChange={(e) => {
                            let tem = [...data];
                            tem[eachdata.id - 1].data = e.target.value
                            setData(tem);
                        }}
                    />
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
                    let tem = [...data];
                    tem[idx].data.push(element.name);
                    setData(tem);
                }
                else {
                    let tem = [...data];
                    let newElementArray = tem[idx].data.filter((item) => { return item !== element.name });
                    tem[idx].data = newElementArray;
                    setData(tem);
                }
                return element;
            }
            else {
                if (singleFlag === true && element.isActive === true) {
                    element.isActive = false;
                    let tem = [...data];
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
    //                 let tem = [...data];
    //                 tem[5].data.push(element.name);
    //                 setData(tem);
    //             }
    //             else {
    //                 let tem = [...data];
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
    //                 // let tem = [...data];
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
    //                 // let tem = [...data];
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
    //                 // let tem = [...data];
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
    //                 // let tem = [...data];
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
    //                 let tem = [...data];
    //                 tem[6].data.push(element.name);
    //                 setData(tem);
    //             }
    //             else {
    //                 let tem = [...data];
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
                    style={{ color: "black", width: "100%" }}
                    className="my-2 w-1/2 mx-auto"
                    value={'text'}
                ></TextInput>
            </div> */}
            {viewCard}
            <div className="flex flex-row items-center justify-around">
                <button
                    onClick={() => {
                        // getText();
                        props.previousPage();
                    }}
                    className="ButtonType6"
                >
                    Previous
                </button>
                <button
                    onClick={() => {
                        // getText();
                        props.nextPage(data);
                    }}
                    className="ButtonType6"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DetailPage;
