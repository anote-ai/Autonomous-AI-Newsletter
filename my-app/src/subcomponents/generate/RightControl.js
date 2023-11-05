import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextInput, Select as Select1 } from "flowbite-react";
import { ThemeTopic } from "../../constants/ThemeTopic";
import { setData, getGPTData, useTopic, useUrlArr, setUrlArr, getIntroData, getStoryData, getArticleData, useGenPageTwo, useGenPageThree, useGenPageFour } from "../../redux/newsLetterSlice"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour } from "../../redux/DetailSlice"
import { Select as Select2 } from "@material-ui/core";
import { colors } from "../../constants/ColorDropdown";
import { types } from "../../constants/TypeDropdown";
import { originId } from "../../constants/OriginIDType"
import { FormControl, MenuItem } from "@material-ui/core";
import { fontSizes } from "../../constants/FontSize";
import { CharacterList } from "../../constants/CharacterList";
import  DraggableNewBlock  from "./DraggableNewBlock"

function RightControl(props) {

    const sectionArrangements = {
        'Freshly Brewed': [
            { id: 'logo', type: "logo", title: "", content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'intro', type: "intro", title: "", content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'article1', type: "article", title: "", content: 'Article #1 blurb & CTA to read full story on owned asset (ex. blog)', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'sponsor1', type: "sponsor", title: "", content: 'Advertorial style sponsored content', css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'article2', type: "article", title: "", content: 'Article #2 blurb + breakdown + takeaway', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'article3', type: "article", title: "", content: 'Article #3 blurb + breakdown + takeaway', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'footer', type: "footer", title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
        ],
        'High Gloss': [
            { id: 'logo', type: "logo", title: "", content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'image', type: "image", title: "", content: 'Image', css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'article1', type: "article", title: "", content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            {
                id: 'content', type: "content", title: "", content: [
                    { id: 'content1', type: "contentInside", title: "", content: 'Recent piece of content #1, ~80 characters + CTA', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
                    { id: 'content2', type: "contentInside", title: "", content: 'Recent piece of content #2, ~80 characters + CTA', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
                    { id: 'content3', type: "contentInside", title: "", content: 'Recent piece of content #3, ~80 characters + CTA', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
                ], css: "flex items-start justify-around w-full", backgroundColor: "", fontColor: "", fontStyle: "", fontSize: ""
            },
            { id: 'story1', type: "story", title: "", content: 'Few stories of interest', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'footer', type: "footer", title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
        ],
        'The NewPort': [
            { id: 'logo', type: "logo", title: "", content: 'LOGO/MASTHEAD', css: 'w-1/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'intro', type: "intro", title: "", content: 'Intro 2-liner sentence, relevant or culture-related', css: 'w-3/4 mx-auto', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'story1', type: "story", title: "", content: 'Few stories of interest', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            {
                id: 'article1', type: "article", title: "", content: ' \
          #1 link of the day/related story of interest \
          #2 link of the day/related story of interest \
          #3 link of the day/related story of interest \
          ', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: ""
            },
            { id: 'article2', type: "article", title: "", content: 'Long-ish form article #1, ~100 lines or 3k words', css: 'h-max', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
            { id: 'footer', type: "footer", title: "", content: [], css: '', backgroundColor: "", fontColor: "", fontStyle: "", fontSize: "" },
        ],
    };
    let dispatch = useDispatch();
    const [loadingNews, setLoadingNews] = useState(false);
    let content
    // let nData = useData();
    let temUrlList = useUrlArr();
    let firstPageDataFRedux = useTopic();
    let secondPageDataFRedux = useGenPageTwo();
    let thirdPageDataFRedux = useGenPageThree();
    let fourPageDataFRedux = useGenPageFour();
    async function generateGPTData(newsId) {
        // console.log(firstPageDataFRedux[5].data);
        setLoadingNews(true)
        try {
            let temSections = JSON.parse(JSON.stringify(props.sections));
            // let temNData = JSON.parse(JSON.stringify(nData));
            let topic = thirdPageDataFRedux[0].data;
            let temUrlArr = JSON.parse(JSON.stringify(temUrlList));
            // console.log("first", temUrlArr);
            let data = await dispatch(getGPTData({ topic, temUrlArr, characterStyle: fourPageDataFRedux[0].data, newsId: newsId }));
            // console.log(data.payload);
            console.log(data.payload)
            if (data.payload && data.payload.length !== 0) {
                temUrlArr.push(data.payload[0]['url']);
                // console.log("tem", temUrlArr)
                await dispatch(setUrlArr(temUrlArr));
                temSections.forEach((item) => {
                    if (item.id === data.payload[0].id) {
                        item.content = data.payload[0]['summary']
                        item.title = data.payload[0]['title']
                    }
                    else if (item.id === "content") {
                        item.content.forEach((subItem) => {
                            console.log("subItem", subItem)
                            if (subItem.id === data.payload[0].id) {
                                subItem.content = data.payload[0]['summary']
                                subItem.title = data.payload[0]['title']
                            }
                        })
                    }
                })
                console.log(temSections)
                props.setSections(temSections)
                setLoadingNews(false)
            }
            else {
                alert("please use another idea, didn't find related news")
                setLoadingNews(false)
            }

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
            let data = await dispatch(getIntroData({ characterStyle: fourPageDataFRedux[0].data }));
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
    async function generateStoryData(newsId) {
        // console.log(firstPageDataFRedux[5].data);
        setLoadingNews(true)
        try {
            let temSections = JSON.parse(JSON.stringify(props.sections));
            // console.log("sddssssssssss")
            let data = await dispatch(getStoryData({ idea: thirdPageDataFRedux[0].data, characterStyle: fourPageDataFRedux[0].data }));
            // console.log(data.payload)
            temSections.forEach((item) => {
                if (item.id === newsId) {
                    item.content = data.payload["data"]
                }
            })
            // console.log(temSections)
            props.setSections(temSections)
            setLoadingNews(false)

        }
        catch (e) {
            setLoadingNews(false)
            alert(e);
        }
    }
    async function generateArticleData(newsId, idea) {
        // console.log(firstPageDataFRedux[5].data);
        setLoadingNews(true)
        try {
            let temSections = JSON.parse(JSON.stringify(props.sections));
            // console.log("sddssssssssss")
            let data = await dispatch(getArticleData({ idea: idea, characterStyle: fourPageDataFRedux[0].data }));
            // console.log(data.payload)
            temSections.forEach((item) => {
                if (item.id === newsId) {
                    item.title = ""
                    item.content = data.payload["data"]
                }
                else if (item.id === "content") {
                    item.content.forEach((subItem) => {
                        if (subItem.id === newsId) {
                            subItem.title = ""
                            subItem.content = data.payload["data"]
                        }
                    })
                }
            })
            // console.log(temSections)
            props.setSections(temSections)
            setLoadingNews(false)

        }
        catch (e) {
            setLoadingNews(false)
            alert(e);
        }
    }

    function clearDataToDefault() {
        let temSections = JSON.parse(JSON.stringify(props.sections));
        if (originId.includes(props.select)) {
            let sectionSelect = sectionArrangements[secondPageDataFRedux[0].data];
            // console.log("sectionSelect",sectionSelect)
            let defaultData = "";
            sectionSelect.forEach((item) => {
                if (item.id === props.select) {
                    defaultData = item.content;
                }
                else if (item.id === "content") {
                    item.content.forEach((subItem) => {
                        if (subItem.id === props.select) {
                            defaultData = subItem.content;
                        }
                    })
                }
            })
            temSections.forEach((item) => {
                if (item.id === props.select) {
                    item.title = "";
                    item.content = defaultData;
                }
                else if (item.id === "content") {
                    item.content.forEach((subItem) => {
                        if (subItem.id === props.select) {
                            subItem.title = "";
                            subItem.content = defaultData;
                        }
                    })
                }
            })
        }
        else {
            temSections.forEach((item) => {
                if (item.id === props.select) {
                    item.title = "";
                    item.content = item.type;
                }
            })
        }
        // console.log("temSectons",temSections)
        // console.log("temSections", temSections)
        props.setSections(temSections);
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

    let generateNews = () => {
        return (
            <div className="my-2">
                <Button
                    color="success"
                    outline
                    className="w-full"
                    onClick={(e) => {
                        generateGPTData(props.select);
                    }}>
                    Generate News
                </Button>
            </div>
        )
    }

    let generateArticle = (idea) => {
        return (
            <div className="my-2">
                <Button
                    color="success"
                    outline
                    className="w-full"
                    onClick={(e) => {
                        generateArticleData(props.select, idea);
                    }}>
                    Generate Article
                </Button>
            </div>
        )
    }

    let clearData = () => {
        return (
            <div className="flex items-center">
                <Button
                    color="warning"
                    outline
                    onClick={(e) => {
                        clearDataToDefault();
                    }}>
                    Clear Data
                </Button>
            </div>
        )
    }
    let changeTheboxType = () => {
        let temSections = JSON.parse(JSON.stringify(props.sections));
        // console.log(data)
        // console.log(initialBackgroundColor.length)
        return (
            <div className="flex flex-col items-center my-5">
                <div className="flex flex-col w-full items-center">
                    <span>
                        Select ContentType
                    </span>
                    <Select2
                        onChange={(e) => {
                            temSections.forEach((item) => {
                                console.log("props.select", props.select)
                                if (item.id === props.select) {
                                    item.type = e.target.value
                                    item.content = e.target.value
                                }
                            })
                            console.log(temSections)
                            props.setSections(temSections)
                        }}
                        className="flex w-full rounded-lg border border-gray-600 bg-gray-700"

                    >
                        {types.map((type, idx) => (
                            <MenuItem key={idx} value={type}>
                                <div
                                    style={{
                                        width: "80%",
                                        height: "20px",
                                        margin: "auto",
                                    }}
                                >
                                    {type}
                                </div>
                            </MenuItem>
                        ))}
                    </Select2>
                </div>
            </div>
        )
    }
    let backgroundColorChange = () => {
        let temSections = JSON.parse(JSON.stringify(props.sections));
        let initialBackgroundColor = temSections.filter((item) => {
            if (item.id === props.select) {
                return item.backgroundColor
            }
        })
        // console.log(data)
        // console.log(initialBackgroundColor.length)
        return (
            <div className="flex flex-col items-center my-5">
                <div className="flex flex-col w-full items-center">
                    <span>
                        Change background Color
                    </span>
                    <Select2
                        value={initialBackgroundColor.length === 0 ? "" : initialBackgroundColor[0]["backgroundColor"]}
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
                                console.log("props.select", props.select)
                                if (item.id === props.select) {
                                    item.backgroundColor = e.target.value
                                }
                                else if (item.id === "content") {
                                    item.content.forEach((subItem) => {
                                        console.log("subItem", subItem)
                                        if (subItem.id === props.select) {
                                            subItem.backgroundColor = e.target.value
                                        }
                                    })
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
                        value={initialFontColor.length === 0 ? "" : initialFontColor[0].fontColor}
                        onChange={(e) => {
                            temSections.forEach((item) => {
                                if (item.id === props.select) {
                                    item.fontColor = e.target.value
                                }
                                else if (item.id === "content") {
                                    item.content.forEach((subItem) => {
                                        console.log("subItem", subItem)
                                        if (subItem.id === props.select) {
                                            subItem.fontColor = e.target.value
                                        }
                                    })
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
    let fontSizeChange = () => {
        let temSections = JSON.parse(JSON.stringify(props.sections));
        let initialFontSize = temSections.filter((item) => {
            if (item.id === props.select) {
                return item.fontSize
            }
        })
        // console.log(data)
        // console.log(initialFontColor)
        return (
            <div className="flex flex-col items-center my-5">
                <div className="flex flex-col w-full items-center">
                    <span>
                        Change Font Size
                    </span>
                    <Select2
                        value={initialFontSize.length === 0 ? "" : initialFontSize[0].fontSize}
                        onChange={(e) => {
                            temSections.forEach((item) => {
                                if (item.id === props.select) {
                                    item.fontSize = e.target.value
                                }
                                else if (item.id === "content") {
                                    item.content.forEach((subItem) => {
                                        console.log("subItem", subItem)
                                        if (subItem.id === props.select) {
                                            subItem.fontSize = e.target.value
                                        }
                                    })
                                }
                            })
                            console.log(temSections)
                            props.setSections(temSections)
                        }}
                        className="flex w-full rounded-lg border border-gray-600 bg-gray-700"

                    >
                        {fontSizes.map((font, idx) => (
                            <MenuItem key={idx} value={font}>
                                <div
                                    style={{
                                        fontSize: "10px",
                                        width: "80%",
                                        height: "20px",
                                        margin: "auto",
                                    }}
                                />
                                {font}
                            </MenuItem>
                        ))}
                    </Select2>
                </div>
            </div>
        )
    }

    let deleteElement = () => {
        let temSections = JSON.parse(JSON.stringify(props.sections));
        let newSections = temSections.filter((item) => {
            console.log("item", item, "props.select", props.select)
            if (item.id === "content" && item.content.length !== 0) {
                let newContent = item.content.filter((subItem) => {
                    return subItem.id !== props.select;
                })
                item.content = newContent;
                return item;
            }
            return item.id !== props.select;
        })
        props.handleOnSelect(props.select);
        props.setSections(newSections);
    }

    if (props.select === "layOut") {
        content = (
            <div>
                <Select1
                    value={props.secondPageData[0].data}
                    onChange={(e) => {
                        let tem = JSON.parse(JSON.stringify(props.secondPageData));
                        tem[0].data = e.target.value
                        console.log("tem", tem);
                        props.updateData(tem)
                    }}
                >
                    <option disabled key="default" value=""></option>
                    {ThemeTopic.map((font, idx) => (
                        <option key={idx} value={font.name} style={{ fontSize: font }}>
                            {font.name}
                        </option>
                    ))}
                </Select1>
                <Select1
                    value={props.fourthPageData[0].data}
                    onChange={(e) => {
                        let tem = JSON.parse(JSON.stringify(props.fourthPageData));
                        tem[0].data = e.target.value
                        console.log("tem", tem);
                        props.updatePersona(tem)
                    }}
                >
                    <option disabled key="default" value=""></option>
                    {CharacterList.map((font, idx) => (
                        <option key={idx} value={font.name} style={{ fontSize: font }}>
                            {font.emoji + " " + font.name}
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
                <div className="flex flex-col items-center my-5">
                    <div className="flex flex-col w-full items-center">
                        <span>
                            Change background Color for All
                        </span>
                        <Select2
                            value={""}
                            onChange={(e) => {
                                let temSections = JSON.parse(JSON.stringify(props.sections));
                                temSections.forEach((item) => {
                                    if (item.id === 'content') {
                                        item.content.forEach((elem) => {
                                            elem.backgroundColor = e.target.value
                                        })
                                    }
                                    else {
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
                <div className="flex flex-col items-center my-5">
                    <div className="flex flex-col w-full items-center">
                        <span>
                            Change Font Color for All
                        </span>
                        <Select2
                            value={""}
                            onChange={(e) => {
                                let temSections = JSON.parse(JSON.stringify(props.sections));
                                temSections.forEach((item) => {
                                    if (item.id === 'content') {
                                        item.content.forEach((elem) => {
                                            elem.fontColor = e.target.value
                                        })
                                    } else {
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
                <div className="flex flex-col w-full items-center">
                    <span>
                        New Block
                    </span>
                    <div className="flex flex-wrap">
                        {types.map((type, idx) => (
                            <DraggableNewBlock type ={type}></DraggableNewBlock>
                        ))}
                    </div>
                </div>
            </div>

        )
    }
    else if (props.select === "content1") {
        // console.log(thirdPageDataFRedux[0].subIdea[0])
        content = (
            <div>
                {generateNews()}
                {generateArticle(thirdPageDataFRedux[0].subIdea[0])}
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
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
                {generateNews()}
                {generateArticle(thirdPageDataFRedux[0].subIdea[1])}
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "content3") {
        content = (
            <div>
                {generateNews()}
                {generateArticle(thirdPageDataFRedux[0].subIdea[2])}
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "article1") {
        content = (
            <div>
                {generateNews()}
                {generateArticle(thirdPageDataFRedux[0].subIdea[0])}
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "article2") {
        content = (
            <div>
                {generateNews()}
                {generateArticle(thirdPageDataFRedux[0].subIdea[1])}
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "article3") {
        content = (
            <div>
                {generateNews()}
                {generateArticle(thirdPageDataFRedux[0].subIdea[2])}
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "intro" || props.selectType === "intro") {
        content = (
            <div>
                {/* {loadingNewsData} */}
                <Button
                    className="w-full"
                    outline
                    color="success"
                    onClick={(e) => {
                        generateIntroData(props.select)
                    }}
                >
                    Generate Intro
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "story1" || props.selectType === "story") {
        content = (
            <div>
                {/* {loadingNewsData} */}
                <Button className="w-full"
                    outline
                    color="success"
                    onClick={(e) => {
                        generateStoryData(props.select)
                    }}
                >
                    Generate Story
                </Button>
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "image" || props.selectType === "image") {
        let tem = JSON.parse(JSON.stringify(props.sections));
        let data
        tem.forEach((item) => {
            if (item.id === props.select) {
                data = item.content
            }
        })
        content = (
            <div>
                <TextInput
                    addon="url"
                    required
                    type="text"
                    placeholder="http://"
                    onChange={(e) => {
                        tem.forEach((item) => {
                            if (item.id === props.select) {
                                item.content = e.target.value
                            }
                        })
                        props.setSections(tem);
                    }}
                    className="my-2 w-full mx-auto"
                    value={data}
                ></TextInput>
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "footer") {
        content = (
            <div>
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <Button
                    onClick={(e) => {
                        deleteElement();
                    }}
                >
                    Delete Element
                </Button>
            </div>
        )
    }
    else if (props.selectType === "news") {
        content = (
            <div>
                {generateNews()}
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.selectType === "link") {
        let tem = JSON.parse(JSON.stringify(props.sections));
        let data
        tem.forEach((item) => {
            if (item.id === props.select) {
                data = item.content
            }
        })
        content = (
            <div>
                <TextInput
                    addon="url"
                    required
                    type="text"
                    placeholder="http://"
                    onChange={(e) => {
                        tem.forEach((item) => {
                            if (item.id === props.select) {
                                item.content = e.target.value
                            }
                        })
                        props.setSections(tem);
                    }}
                    className="my-2 w-full mx-auto"
                    value={data}
                ></TextInput>
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    {clearData()}
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "sponsor1" || props.selectType === "Sponsor") {
        let tem = JSON.parse(JSON.stringify(props.sections));
        let data
        tem.forEach((item) => {
            if (item.id === props.select) {
                data = item.content
            }
        })
        content = (
            <div>
                <TextInput
                    addon="Sponsor By"
                    required
                    type="text"
                    placeholder="http://"
                    onChange={(e) => {
                        tem.forEach((item) => {
                            if (item.id === props.select) {
                                item.content = e.target.value
                            }
                        })
                        props.setSections(tem);
                    }}
                    className="my-2 w-full mx-auto"
                    value={data}
                ></TextInput>
                {backgroundColorChange()}
                {fontColorChange()}
                {fontSizeChange()}
                <span className="flex space-x-2">
                    <Button
                        color="failure"
                        outline
                        onClick={(e) => {
                            deleteElement();
                        }}
                    >
                        Delete Element
                    </Button>
                </span>
            </div>
        )
    }
    else if (props.select === "logo") {
        content = (
            <div>
            </div>
        )
    }
    else {
        content = (
            <div>
                {changeTheboxType()}
                <Button
                    onClick={(e) => {
                        deleteElement();
                    }}
                >
                    Delete Element
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col overflow-y-scroll py-5">
            <div className="flex justify-center items-center w-full h-14">
                <h3>Custom Styles</h3>
                <span className="ml-2">{loadingNewsData}</span>
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
