import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Label, TextInput, ToggleSwitch, Textarea, Select as Select1 } from "flowbite-react";
import { ThemeTopic } from "../../constants/ThemeTopic";
import { setData, getGPTData, useTopic, useData, clearData, useUrlArr, setUrlArr } from "../../redux/newsLetterSlice"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour } from "../../redux/DetailSlice"
import { Select as Select2 } from "@material-ui/core";
import { colors } from "../../constants/ColorDropdown";
import { FormControl, MenuItem } from "@material-ui/core";


function RightControl(props) {
    let dispatch = useDispatch();
    let content
    // let nData = useData();
    let temUrlList = useUrlArr();
    let firstPageDataFRedux = useTopic();
    async function generateGPTData(newsId) {
        // console.log(firstPageDataFRedux[5].data);
        try {
            let temSections = JSON.parse(JSON.stringify(props.sections));
            // let temNData = JSON.parse(JSON.stringify(nData));
            let topic = firstPageDataFRedux[3].data;
            let characterStyle = firstPageDataFRedux[4].data;
            let temUrlArr = JSON.parse(JSON.stringify(temUrlList));
            // console.log("first", temUrlArr);
            let data = await dispatch(getGPTData({ topic, temUrlArr, characterStyle, newsId: newsId }));
            // console.log(data.payload);
            // console.log(data.payload)
            temUrlArr.push(data.payload[0]['url']);
            // console.log("tem", temUrlArr)
            await dispatch(setUrlArr(temUrlArr));
            temSections.forEach((item) => {
                if (item.id === data.payload[0].id) {
                    item.content = data.payload[0]['summary']
                    item.title = data.payload[0]['title']
                }
            })
            console.log(temSections)
            props.setSections(temSections)

        }
        catch (e) {
            alert(e);
        }
    }
    let backgroundColorChange = (
        <div className="flex flex-col items-center mx-10 my-5">
            <div className="grid grid-cols-2 w-full items-center">
                <span>
                    Change background Color
                </span>
                <Select2
                    onChange={(e) => {
                        let temSections = JSON.parse(JSON.stringify(props.sections));
                        // const pattern = /bg-\[[#A-Fa-f0-9]+\]/;
                        // temSections.forEach((item) => {
                        //     if (item.id === props.select) {
                        //         if (pattern.test(item.css)) {
                        //             item.css =  item.css.replace(pattern, `bg-[${e.target.value}]`);
                        //         } else {
                        //             item.css = `${item.css} bg-[${e.target.value}]`;
                        //         }
                        //     }
                        // })
                        temSections.forEach((item) => {
                            if (item.id === props.select) {
                                item.backgroundColor = e.target.value
                            }
                        })
                        console.log(temSections)
                        props.setSections(temSections)
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
    if (props.select === "layOut") {
        content = (
            <div>
                <Select1
                    value={props.firstPageData[2].data}
                    onChange={(e) => {
                        let tem = JSON.parse(JSON.stringify(props.firstPageData));
                        tem[2].data = e.target.value
                        console.log("tem", tem);
                        props.updateData(tem)
                    }}
                >
                    <option disabled key="default" value=""></option>
                    {ThemeTopic.map((font, idx) => (
                        <option key={idx} value={font} style={{ fontSize: font }}>
                            {font}
                        </option>
                    ))}
                </Select1>
                <div className="flex flex-col items-center mx-10 my-5">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span>
                            Change major Background Color
                        </span>
                        <Select2
                            value={props.majorityColor}
                            onChange={(e) => {
                                props.setMajorityColor(e.target.value)
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
            </div>

        )
    }
    else if (props.select === "content1") {
        content = (
            <div>
                <Button
                    onClick={(e) => {
                        generateGPTData("content1");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange}
                {/* <div className="flex flex-col items-center mx-10 my-5">
                    <div className="grid grid-cols-2 w-full items-center">
                        <span>
                            Change background Color
                        </span>
                        <Select2
                            onChange={(e) => {
                                let temSections = JSON.parse(JSON.stringify(props.sections));
                                // const pattern = /bg-\[[#A-Fa-f0-9]+\]/;
                                // temSections.forEach((item) => {
                                //     if (item.id === props.select) {
                                //         if (pattern.test(item.css)) {
                                //             item.css =  item.css.replace(pattern, `bg-[${e.target.value}]`);
                                //         } else {
                                //             item.css = `${item.css} bg-[${e.target.value}]`;
                                //         }
                                //     }
                                // })
                                temSections.forEach((item) => {
                                    if (item.id === props.select) {
                                        item.backgroundColor = e.target.value
                                    }
                                })
                                console.log(temSections)
                                props.setSections(temSections)
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
                </div> */}
            </div>
        )
    }
    else if (props.select === "content2") {
        content = (
            <div>

                <Button
                    onClick={(e) => {
                        generateGPTData("content2");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange}
            </div>
        )
    }
    else if (props.select === "content3") {
        content = (
            <div>

                <Button
                    onClick={(e) => {
                        generateGPTData("content3");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange}
            </div>
        )
    }
    else if (props.select === "article1") {
        content = (
            <div>

                <Button
                    onClick={(e) => {
                        generateGPTData("article1");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange}
            </div>
        )
    }
    else if (props.select === "article2") {
        content = (
            <div>

                <Button
                    onClick={(e) => {
                        generateGPTData("article2");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange}
            </div>
        )
    }
    else if (props.select === "article3") {
        content = (
            <div>

                <Button
                    onClick={(e) => {
                        generateGPTData("article3");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange}
            </div>
        )
    }
    else if (props.select === "intro") {
        content = (
            <div>
                {backgroundColorChange}
            </div>
        )
    }
    else if (props.select === "story1") {
        content = (
            <div>
                {backgroundColorChange}
            </div>
        )
    }
    else if (props.select === "footer") {
        content = (
            <div>
                {backgroundColorChange}
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col overflow-y-scroll py-5">
            <div className="flex justify-center items-center w-full h-14">
                <h3>Custom Styles</h3>
            </div>
            <div className="w-full h-full">
                {content}
            </div>
            <span className=' text-gray-500' >Drag and Drop Elements on left according to your preference</span>
            <br />
            <span className=' text-gray-500' >Click on the elements to edit</span>
        </div>
    )
}
export default RightControl;
