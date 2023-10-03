import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Label, TextInput, ToggleSwitch, Textarea, Select as Select1 } from "flowbite-react";
import { ThemeTopic } from "../../constants/ThemeTopic";
import { setData, getGPTData, useTopic, useData, clearData, useUrlArr, setUrlArr, getIntroData } from "../../redux/newsLetterSlice"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour } from "../../redux/DetailSlice"
import { Select as Select2 } from "@material-ui/core";
import { colors } from "../../constants/ColorDropdown";
import { FormControl, MenuItem } from "@material-ui/core";


function RightControl(props) {
    let dispatch = useDispatch();
    const [loadingNews, setLoadingNews] = useState(false);
    let content
    // let nData = useData();
    let temUrlList = useUrlArr();
    let firstPageDataFRedux = useTopic();
    async function generateGPTData(newsId) {
        // console.log(firstPageDataFRedux[5].data);
        setLoadingNews(true)
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
            setLoadingNews(false)

        }
        catch (e) {
            setLoadingNews(false)
            alert(e);
        }
    }
    async function generateIntroData(newsId) {
        // console.log(firstPageDataFRedux[5].data);
        setLoadingNews(true)
        try {
            let temSections = JSON.parse(JSON.stringify(props.sections));
            let data = await dispatch(getIntroData());
            temSections.forEach((item) => {
                if (item.id === newsId) {
                    item.content = data.payload["data"]
                }
            })
            console.log(temSections)
            props.setSections(temSections)
            setLoadingNews(false)

        }
        catch (e) {
            setLoadingNews(false)
            alert(e);
        }
    }
    let loadingNewsData = (
        <div>
            {loadingNews &&
                <div role="status" className="ml-auto">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            }
        </div>
    )
    let backgroundColorChange = () => {
        let temSections = JSON.parse(JSON.stringify(props.sections));
        let initialBackgroundColor = temSections.filter((item) => {
            if (item.id === props.select) {
                return item.backgroundColor
            }
        })
        // console.log(data)
        console.log(initialBackgroundColor)
        return (
            <div className="flex flex-col items-center my-5">
                <div className="flex flex-col w-full items-center">
                    <span>
                        Change background Color
                    </span>
                    <Select2
                        value={initialBackgroundColor.length === 0 ? "" : initialBackgroundColor[0].backgroundColor}
                        onChange={(e) => {
                            // let temSections = JSON.parse(JSON.stringify(props.sections));
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
    }
    let fontColorChange = () => {
        let temSections = JSON.parse(JSON.stringify(props.sections));
        let initialFontColor = temSections.filter((item) => {
            if (item.id === props.select) {
                return item.fontColor
            }
        })
        // console.log(data)
        // console.log(initialFontColor)
        return (
            <div className="flex flex-col items-center my-5">
                <div className="flex flex-col w-full items-center">
                    <span>
                        Change Font Color
                    </span>
                    <Select2
                        value = {initialFontColor.length === 0 ? "" : initialFontColor[0].fontColor}
                        onChange={(e) => {
                            temSections.forEach((item) => {
                                if (item.id === props.select) {
                                    item.fontColor = e.target.value
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
    }
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
                <div className="flex flex-col items-center my-5">
                    <div className="flex flex-col w-full items-center">
                        <span className="">
                            Background Color
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
                {loadingNewsData}
                <Button
                    onClick={(e) => {
                        generateGPTData("content1");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
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
                {loadingNewsData}
                <Button
                    onClick={(e) => {
                        generateGPTData("content2");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
            </div>
        )
    }
    else if (props.select === "content3") {
        content = (
            <div>
                {loadingNewsData}
                <Button
                    onClick={(e) => {
                        generateGPTData("content3");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
            </div>
        )
    }
    else if (props.select === "article1") {
        content = (
            <div>
                {loadingNewsData}
                <Button
                    onClick={(e) => {
                        generateGPTData("article1");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
            </div>
        )
    }
    else if (props.select === "article2") {
        content = (
            <div>
                {loadingNewsData}
                <Button
                    onClick={(e) => {
                        generateGPTData("article2");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
            </div>
        )
    }
    else if (props.select === "article3") {
        content = (
            <div>
                {loadingNewsData}
                <Button
                    onClick={(e) => {
                        generateGPTData("article3");
                    }}
                >
                    Generate News
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
            </div>
        )
    }
    else if (props.select === "intro") {
        content = (
            <div>
                {loadingNewsData}
                <Button
                    onClick={(e) => {
                        generateIntroData("intro")
                    }}
                >
                    Generate Intro
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
            </div>
        )
    }
    else if (props.select === "story1") {
        content = (
            <div>
                {backgroundColorChange()}
                {fontColorChange()}
            </div>
        )
    }
    else if (props.select === "footer") {
        content = (
            <div>
                {backgroundColorChange()}
                {fontColorChange()}
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
