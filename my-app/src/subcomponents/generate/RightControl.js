import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Label, TextInput, ToggleSwitch, Textarea, Select as Select1 } from "flowbite-react";
import { ThemeTopic } from "../../constants/ThemeTopic";
import { setData, getGPTData, useTopic, useData, clearData, useUrlArr, setUrlArr } from "../../redux/newsLetterSlice"
import { useDetailPageOne, useDetailPageTwo, useDetailPageThree, useDetailPageFour } from "../../redux/DetailSlice"


function RightControl(props) {
    let dispatch = useDispatch();
    let content
    let nData = useData();
    let temUrlList = useUrlArr();
    let firstPageDataFRedux = useTopic();
    async function generateGPTData(newsId) {
        // console.log(firstPageDataFRedux[5].data);
        try {
            // let temSections = JSON.parse(JSON.stringify(props.sections));
            let temNData = JSON.parse(JSON.stringify(nData));
            let topic = firstPageDataFRedux[3].data;
            let characterStyle = firstPageDataFRedux[4].data;
            let temUrlArr = JSON.parse(JSON.stringify(temUrlList));
            // console.log("first", temUrlArr);
            let data = await dispatch(getGPTData({ topic, temUrlArr, characterStyle, newsId: newsId }));
            // console.log(data.payload);
            // console.log(data.payload)
            temUrlArr.push(data.payload[0]['url']);
            // console.log("tem", temUrlArr)
            const index = temNData.findIndex(item => item.id === data.payload[0].id);
            if (index !== -1) {
                // If the object with the same 'id' exists, update it
                temNData[index] = data.payload[0];
            } else {
                // If the object with the 'id' doesn't exist, insert it
                temNData.push(data.payload[0]);
            }
            console.log(temNData)
            await dispatch(setUrlArr(temUrlArr));
            await dispatch(setData(temNData));
            
        }
        catch (e) {
            alert(e);
        }
    }
    if (props.select === "layOut") {
        content = (
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
        )
    }
    else if (props.select === "content1") {
        content = (
            <Button
                onClick={(e) => {
                    generateGPTData("content1");
                }}
            >
                Generate News
            </Button>
        )
    }
    else if (props.select === "content2") {
        content = (
            <Button
                onClick={(e) => {
                    generateGPTData("content2");
                }}
            >
                Generate News
            </Button>
        )
    }
    else if (props.select === "content3") {
        content = (
            <Button
                onClick={(e) => {
                    generateGPTData("content3");
                }}
            >
                Generate News
            </Button>
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
