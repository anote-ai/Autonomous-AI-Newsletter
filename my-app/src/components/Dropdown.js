import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";

const colors = [
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

const fontSizes = ["10px", "14px", "16px", "18px", "20px"];

const Dropdown = ({
  selectedCardColor,
  selectedTextColor,
  selectedBackgroundColor,
  selectedCardFont,
  selectedTextFont,
  selectedFontSize,
  onBackgroundSelect,
  onColorSelect,
  onTextSelect,
  onCardFontSelect,
  onTextFontSelect,
  onFontSizeSelect,
  mainTitle,
  subTitle,
  onMainTitleChange,
  onSubtitleChange,
}) => {
  const [show, setShow] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubTitle, setIsEditingSubTitle] = useState(false);
  const [editableMainTitle, setEditableMainTitle] = useState(mainTitle);
  const [editableSubTitle, setEditableSubTitle] = useState(subTitle);

  const handleMainTitleSave = () => {
    setIsEditingTitle(false);
    onMainTitleChange(editableMainTitle);
  };

  const handleSubTitleSave = () => {
    setIsEditingSubTitle(false);
    onSubtitleChange(editableSubTitle);
  };

  const handleMainTitleEditing = () => {
    setIsEditingTitle(true);
  };

  const handleSubTitleEditing = () => {
    setIsEditingSubTitle(true);
  };

  const handleFontSizeChange = (event) => {
    onFontSizeSelect(event.target.value);
  };

  const handleColorChange = (event) => {
    onColorSelect(event.target.value);
  };

  const handleBackgroundChange = (event) => {
    onBackgroundSelect(event.target.value);
  };

  const handleTextChange = (event) => {
    onTextSelect(event.target.value);
  };

  const handleCardFontChange = (event) => {
    onCardFontSelect(event.target.value);
  };

  const handleTextFontChange = (event) => {
    onTextFontSelect(event.target.value);
  };

  return (
    <div className="flex flex-col w-[20vw] items-center relative rounded ">
      <Button
        className="bg-slate-50 text-white  rounded-md  self-center top-0  mb-4"
        onClick={() => setShow(!show)}
        sx={{
          color: "black",
          marginBottom: "1rem",
          background: "#11cb5f",
          fontWeight: "bold",
          padding: "0.5rem",
          top: 10,
          "&:hover": {
            color: "white",
            borderColor: "#11cb5f",
            background: "#75f7ab",
          },
          height: 40,
          width: 250,
          zIndex: 1,
        }}
      >
        Customize your Newsletter
      </Button>

      {show && (
        <div className=" flex flex-col w-[30vw]  gap-4 bg-[#fefffe87] mr-10 border-[#0000005f] border-solid border-2  p-2 absolute top-10 rounded-lg mt-4">
          <h2 className="text-black font-bold text-[20px] text-left">Colors</h2>
          <div className="flex gap-1 w-[24vw] ">
            <FormControl
              className="bg-[#ffffff]  rounded-md w-[8vw]"
              style={{ border: "1px solid black" }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "8px",
                  fontWeight: "lighter",
                  padding: "0.5rem",
                  textAlign: "left",
                }}
              >
                Font
              </p>
              <Select
                value={selectedCardFont}
                onChange={handleCardFontChange}
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
              className="bg-[#ffffff] rounded-md  w-[8vw]"
              style={{ border: "1px solid black" }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "8px",
                  fontWeight: "lighter",
                  padding: "0.5rem",
                  textAlign: "left",
                }}
              >
                Text Color
              </p>
              <Select
                value={selectedTextColor}
                onChange={handleTextChange}
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
              className="bg-[#ffffff] rounded-md w-[8vw]"
              style={{ border: "1px solid black" }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "8px",
                  fontWeight: "lighter",
                  padding: "0.5rem",
                  textAlign: "left",
                }}
              >
                Background
              </p>
              <Select
                value={selectedBackgroundColor}
                onChange={handleBackgroundChange}
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
          </div>
          <div>
            <h2 className="text-black font-bold text-[20px] text-left">
              {" "}
              Card Style
            </h2>
          </div>
          <div className="flex gap-1 w-[24vw] ">
            {/*e xt Font */}

            {/* Card Font */}
            <FormControl
              className="bg-[#ffffff] rounded-md  w-[8vw]"
              style={{ border: "1px solid black" }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "8px",
                  fontWeight: "lighter",
                  padding: "0.5rem",
                  textAlign: "left",
                }}
              >
                Card Font
              </p>
              <Select
                value={selectedTextFont}
                onChange={handleTextFontChange}
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
              className="bg-[#ffffff] rounded-md w-[8vw] "
              style={{ border: "1px solid black" }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "8px",
                  fontWeight: "lighter",
                  padding: "0.5rem",
                  textAlign: "left",
                }}
              >
                Font Size
              </p>
              <Select
                value={selectedFontSize}
                onChange={handleFontSizeChange}
                className="flex"
              >
                {fontSizes.map((size, idx) => (
                  <MenuItem key={idx} value={size} style={{ fontSize: "10px" }}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className="bg-[#ffffff] rounded-md w-[8vw]"
              style={{ border: "1px solid black" }}
            >
              <p
                style={{
                  color: "black",
                  fontSize: "8px",
                  fontWeight: "lighter",
                  padding: "0.5rem",
                  textAlign: "left",
                }}
              >
                Card Color
              </p>
              <Select
                value={selectedCardColor}
                onChange={handleColorChange}
                className="flex absolute"
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
          </div>
          <div className="flex m-2 gap-2 ">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                background: "#11cb5f",
                height: 40,
                "&:hover": {
                  color: "white",
                  borderColor: "#11cb5f",
                  background: "#75f7ab",
                },
              }}
              onClick={handleMainTitleEditing}
            >
              Edit Title
            </Button>
            {isEditingTitle ? (
              <Input
                style={{
                  fontSize: "10px",
                }}
                type="text"
                value={editableMainTitle}
                onChange={(e) => setEditableMainTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleMainTitleSave();
                  }
                }}
                onBlur={handleMainTitleSave}
                autoFocus
                aria-label="Main Title"
              />
            ) : (
              <div>{/* Render main title */}</div>
            )}
          </div>
          <div className="flex  m-2 gap-2 ">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                background: "#11cb5f",
                height: 40,
                "&:hover": {
                  color: "white",
                  borderColor: "#11cb5f",
                  background: "#75f7ab",
                },
              }}
              onClick={handleSubTitleEditing}
            >
              Edit SubTitle
            </Button>
            {isEditingSubTitle ? (
              <Input
                style={{
                  fontSize: "10px",
                }}
                type="text"
                value={editableSubTitle}
                onChange={(e) => setEditableSubTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubTitleSave();
                  }
                }}
                onBlur={handleSubTitleSave}
                autoFocus
                aria-label="Sub Title"
              />
            ) : (
              <div>{/* Render subtitle */}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
