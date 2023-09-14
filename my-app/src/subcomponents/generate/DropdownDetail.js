import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";

const colors = [
    "rgb(17 24 39)",
    "rgb(255 255 255)",
    "rgb(156 163 175)",
    "rgb(31 41 55)",
    "#000000",
    "#F8F9FA",
    "#FFCF56",
    "#FE00FE",
    "#28B2FB",
    "#F65F50",
    "#887EFC",
    "#FFFF00",
    "#FFB200",
    "#76C643",
    "#80DBDB",
    "#989DA4",
    "#AEA9FE",
    "#4837B9",
    "#C7200A",
    "#E17605",
    "#E192ED",
    "#39800B",
    "#1684C4",
    "#951AA1",
    "#280F96",
    "#F65F50",
    "#FFB200",
    "#76C643",
    "#61C5FF",
    "#92edc1",
    "#80DBDB",
    "#887EFC",
    "#92b6ed",
    "#919DAC",
    "#E192ED",
];

const fonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
    "Lucida Sans Unicode",
    "Tahoma",
    "Lucida Console",
];

const fontSizes = ["1.5rem", "10px", "14px", "16px", "18px", "20px"];

const Dropdown = ({
    // selectedTitleColor,
    // selectedTitleFontSize,
    // selectedTitleStyle,
    // selectedDateColor,
    // selectedDateFontSize,
    // selectedDateStyle,
    // selectedContentColor,
    // selectedContentFontSize,
    // selectedContentStyle,
    // selectedUrlColor,
    // selectedUrlFontSize,
    // selectedUrlStyle,
    onselectedTitleColor,
    onselectedTitleFontSize,
    onselectedTitleStyle,
    onselectedDateColor,
    onselectedDateFontSize,
    onselectedDateStyle,
    onselectedContentColor,
    onselectedContentFontSize,
    onselectedContentStyle,
    onselectedUrlColor,
    onselectedUrlFontSize,
    onselectedUrlStyle,
    // mainTitle,
    // subTitle,
    // onMainTitleChange,
    // onSubtitleChange,
}) => {
    const [show, setShow] = useState(false);

    const handleTitleStyleChange = (event) => {
        onselectedTitleStyle(event.target.value);
    };
    const handleTitleColorChange = (event) => {
        onselectedTitleColor(event.target.value);
    };
    const handleTitleFontSizeChange = (event) => {
        onselectedTitleFontSize(event.target.value);
    };
    const handleDateStyleChange = (event) => {
        onselectedDateStyle(event.target.value);
    };
    const handleDateColorChange = (event) => {
        onselectedDateColor(event.target.value);
    };
    const handleDateFontChange = (event) => {
        onselectedDateFontSize(event.target.value);
    };
    const handleContentStyleChange = (event) => {
        onselectedContentStyle(event.target.value);
    };
    const handleContentColorChange = (event) => {
        onselectedContentColor(event.target.value);
    };
    const handleContentFontSizeChange = (event) => {
        onselectedContentFontSize(event.target.value);
    };
    const handleUrlStyleChange = (event) => {
        onselectedUrlStyle(event.target.value);
    };
    const handleUrlColorChange = (event) => {
        onselectedUrlColor(event.target.value);
    };
    const handleUrlFontSizeChange = (event) => {
        onselectedUrlFontSize(event.target.value);
    };

    return (
        <div className="flex flex-col w-[20vw] items-center relative rounded ">
            <Button
                className="bg-slate-50 text-white  rounded-md  self-center top-0  mb-4"
                onClick={() => setShow(!show)}
                sx={{
                    color: "black",
                    marginBottom: "1rem",
                    background: "#28b2fb",
                    fontWeight: "bold",
                    padding: "0.5rem",
                    top: 10,
                    "&:hover": {
                        background: "#81ccf4",
                    },
                    height: 40,
                    width: 250,
                    zIndex: 1,
                }}
            >
                Customize Detail Style
            </Button>

            {show && (
                <div className=" flex flex-col w-[30vw]  gap-4 bg-[#fefffe87] mr-10 border-[#0000005f] border-solid border-2  p-2 absolute top-10 rounded-lg mt-4">
                    <h2 className="text-black font-bold text-[20px] text-left">Title</h2>
                    <div className="flex gap-2  justify-between ">
                        <FormControl
                            className="bg-[#ffffff]  rounded-md w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Style
                            </p>
                            <Select
                                // value={selectedTitleStyle}
                                onChange={handleTitleStyleChange}
                                className="flex"
                            >
                                {fonts.map((font, idx) => (
                                    <MenuItem key={idx} value={font} style={{ fontSize: "10px" }}>
                                        {font}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md  w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Text Color
                            </p>
                            <Select
                                // value={selectedTitleColor}
                                onChange={handleTitleColorChange}
                                className="flex"
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
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md w-[9vw] "
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Size
                            </p>
                            <Select
                                // value={selectedTitleFontSize}
                                onChange={handleTitleFontSizeChange}
                                className="flex"
                            >
                                {fontSizes.map((size, idx) => (
                                    <MenuItem key={idx} value={size} style={{ fontSize: "10px" }}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <h2 className="text-black font-bold text-[20px] text-left">
                            {" "}
                            Date
                        </h2>
                    </div>
                    <div className="flex gap-2 justify-between ">
                        {/*e xt Font */}

                        {/* Card Font */}
                        <FormControl
                            className="bg-[#ffffff]  rounded-md w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Style
                            </p>
                            <Select
                                // value={selectedDateStyle}
                                onChange={handleDateStyleChange}
                                className="flex"
                            >
                                {fonts.map((font, idx) => (
                                    <MenuItem key={idx} value={font} style={{ fontSize: "10px" }}>
                                        {font}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md  w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Text Color
                            </p>
                            <Select
                                // value={selectedDateColor}
                                onChange={handleDateColorChange}
                                className="flex"
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
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md w-[9vw] "
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Size
                            </p>
                            <Select
                                // value={selectedDateFontSize}
                                onChange={handleDateFontChange}
                                className="flex"
                            >
                                {fontSizes.map((size, idx) => (
                                    <MenuItem key={idx} value={size} style={{ fontSize: "10px" }}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <h2 className="text-black font-bold text-[20px] text-left">
                            {" "}
                            Content
                        </h2>
                    </div>
                    <div className="flex gap-2 justify-between ">
                        {/*e xt Font */}

                        {/* Card Font */}
                        <FormControl
                            className="bg-[#ffffff]  rounded-md w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Style
                            </p>
                            <Select
                                // value={selectedContentStyle}
                                onChange={handleContentStyleChange}
                                className="flex"
                            >
                                {fonts.map((font, idx) => (
                                    <MenuItem key={idx} value={font} style={{ fontSize: "10px" }}>
                                        {font}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md  w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Text Color
                            </p>
                            <Select
                                // value={selectedContentColor}
                                onChange={handleContentColorChange}
                                className="flex"
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
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md w-[9vw] "
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Size
                            </p>
                            <Select
                                // value={selectedContentFontSize}
                                onChange={handleContentFontSizeChange}
                                className="flex"
                            >
                                {fontSizes.map((size, idx) => (
                                    <MenuItem key={idx} value={size} style={{ fontSize: "10px" }}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <h2 className="text-black font-bold text-[20px] text-left">
                            {" "}
                            Url
                        </h2>
                    </div>
                    <div className="flex gap-2 justify-between ">
                        {/*e xt Font */}

                        {/* Card Font */}
                        <FormControl
                            className="bg-[#ffffff]  rounded-md w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Style
                            </p>
                            <Select
                                // value={selectedUrlStyle}
                                onChange={handleUrlStyleChange}
                                className="flex"
                            >
                                {fonts.map((font, idx) => (
                                    <MenuItem key={idx} value={font} style={{ fontSize: "10px" }}>
                                        {font}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md  w-[9vw]"
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Text Color
                            </p>
                            <Select
                                // value={selectedUrlColor}
                                onChange={handleUrlColorChange}
                                className="flex"
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
                        </FormControl>
                        <FormControl
                            className="bg-[#ffffff] rounded-md w-[9vw] "
                            style={{ border: "1px solid black" }}
                        >
                            <p
                                style={{
                                    color: "black",
                                    fontSize: "6px",
                                    fontWeight: "lighter",
                                    padding: "0.5rem",
                                    textAlign: "left",
                                }}
                            >
                                Font Size
                            </p>
                            <Select
                                // value={selectedUrlFontSize}
                                onChange={handleUrlFontSizeChange}
                                className="flex"
                            >
                                {fontSizes.map((size, idx) => (
                                    <MenuItem key={idx} value={size} style={{ fontSize: "10px" }}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
