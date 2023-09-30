import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Label, TextInput, ToggleSwitch, Textarea, Select as Select1 } from "flowbite-react";
import { ThemeTopic } from "../../constants/ThemeTopic";


function RightControl(props) {
    let dispatch = useDispatch();
    let content
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

    return (
        <div className="w-full h-full flex flex-col overflow-y-scroll py-5">
            <div className="flex justify-center items-center w-full h-14">
                <h3>Custom Styles</h3>
            </div>
            <div className="w-full h-full">
                {content}
            </div>
            <span className=' text-gray-500' >Drag and Drop Elements on left according to your preference</span>
            <br/>
            <span className=' text-gray-500' >Click on the elements to edit</span>
        </div>
    )
}
export default RightControl;
