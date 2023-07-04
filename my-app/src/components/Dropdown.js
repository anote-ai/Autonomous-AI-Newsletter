import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Button from "@mui/material/Button";

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
];

const Dropdown = ({
  selectedCardColor,
  selectedTextColor,
  backgroundColor,
  selectedCardFont,
  selectedTextFont,
  onBackgroundSelect,
  onColorSelect,
  onTextSelect,
  onCardFontSelect,
  onTextFontSelect,
}) => {
  const [show, setShow] = useState(false);

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
    <div className="flex flex-col   rounded ">
      <Button
        className="bg-slate-50 text-white  rounded-md w-[10vw] self-center top-0 mb-4"
        onClick={() => setShow(!show)}
        sx={{
          color: "black",
          marginBottom: "1rem",
          background: "#75f7ab",
          fontWeight: "bold",
          padding: "0.5rem",
          "&:hover": {
            color: "white",
            borderColor: "#11cb5f",
            background: "#75f7ab",
          },
          height: 40,
          width: 300,
        }}
      >
        Customize your Newsletter
      </Button>
      <div className="flex  h-[30vh] w-[25vw] gap-2">
        {show && (
          <div className=" flex flex-col w-[30vw] h-[30vh] gap-4 bg-[#c5c9c7] items-center p-2 m-auto  rounded-lg mt-4">
            <h2 className="text-black font-bold">Colors</h2>
            <div className="flex gap-1 w-[25vw]">
              <FormControl className="bg-[#f4e6e6] rounded-md w-[10vw]">
                <InputLabel
                  style={{
                    color: "black",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Card Color
                </InputLabel>
                <Select
                  value={selectedCardColor}
                  onChange={handleColorChange}
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
              <FormControl className="bg-[#f4e6e6] rounded-md  w-[10vw]">
                <InputLabel
                  style={{
                    color: "black",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Text Color
                </InputLabel>
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
              <FormControl className="bg-[#f4e6e6] rounded-md w-[10vw]">
                <InputLabel
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "10px",
                  }}
                >
                  Background Color
                </InputLabel>
                <Select
                  value={backgroundColor}
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
              <h2 className="text-black font-bold">Style</h2>
            </div>
            <div className="flex gap-1 w-[25vw]">
              {/* Card Font */}
              <FormControl className="bg-[#f4e6e6] rounded-md w-[10vw]">
                <InputLabel
                  style={{
                    color: "black",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Font
                </InputLabel>
                <Select
                  value={selectedCardFont}
                  onChange={handleCardFontChange}
                  className="flex"
                >
                  {fonts.map((font, idx) => (
                    <MenuItem key={idx} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Text Font */}
              <FormControl className="bg-[#f4e6e6] rounded-md  w-[10vw]">
                <InputLabel
                  style={{
                    color: "black",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Card Font
                </InputLabel>
                <Select
                  value={selectedTextFont}
                  onChange={handleTextFontChange}
                  className="flex"
                >
                  {fonts.map((font, idx) => (
                    <MenuItem key={idx} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
