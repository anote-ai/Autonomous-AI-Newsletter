import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { debounce } from "lodash";
import Input from "@mui/joy/Input";
import Dropdown from "./Dropdown";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import HelpIcon from "@mui/icons-material/Help";
import Modal from "./Modal";

const Feed = () => {
  const [data, setData] = useState({ data: [] });
  const [searchTerm, setSearchTerm] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedCardColor, setSelectedCardColor] = useState("#FFCF56");
  const [selectedTextColor, setSelectedTextColor] = useState("#F8F9FA");
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("#171515");
  const [selectedFont, setSelectedFont] = useState("Helvetica");
  const [selectedTextFont, setSelectedTextFont] = useState("Helvetica");
  const [selectedFontSize, setSelectedFontSize] = useState("14px");
  const [editableTitle, setEditableTitle] = useState("");
  const [editableSummary, setEditableSummary] = useState("");
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editableMainTitle, setEditableMainTitle] =
    useState("Newsletter Creator");
  const [editableSubTitle, setEditableSubTitle] = useState(
    "Your Stories, Your Voice, Your Newsletter."
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubTitle, setIsEditingSubTitle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/run-script?key_word=${searchTerm}`
        );
        if (!response.ok) {
          const message = `An error has occurred: ${response.status} - ${response.statusText}`;
          throw new Error(message);
        }

        const data = await response.json();

        setData(data);
      } catch (err) {
        setData({ data: [] });
      }
    };

    const debouncedFetchData = debounce(fetchData, 3000);
    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, [searchTerm]);

  const handleMainTitleChange = (newTitle) => {
    setEditableMainTitle(newTitle);
  };
  const handleSubtitleChange = (newSubtitle) => {
    setEditableSubTitle(newSubtitle);
  };

  const handleSelectedFontSize = (size) => {
    setSelectedFontSize(size);
  };

  const handleSelectedFont = (font) => {
    setSelectedFont(font);
  };

  const handleTextFontChange = (font) => {
    setSelectedTextFont(font);
  };

  const handleColorSelect = (color) => {
    setSelectedCardColor(color);
  };

  const handleTextColorChange = (color) => {
    setSelectedTextColor(color);
  };

  const handleBackgroundChange = (color) => {
    setSelectedBackgroundColor(color);
  };

  const handleTrendingClick = () => {
    setSearchTerm("Trending");
    setData(data);
  };

  const handleHealthTechClick = () => {
    setSearchTerm("Health Tech");
    setData(data);
  };

  const handleGlobalEconomicsClick = () => {
    setSearchTerm("Global Economics");
    setData(data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError(true);
    } else {
      setFileName(file.name);
      setError(false);
    }
  };

  const handleSearch = async (event) => {
    console.log("fetching the data");
    event.preventDefault();
    setData({ data: [] });
    setSearchTerm("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3001/run-script?key_word=${searchTerm}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const data = await response.json();

      setData(data);
      setLoading(false);
      console.log("data is loaded");
      console.log(data);
    } catch (err) {
      setData({ data: [] });
    } finally {
      setLoading(false);
    }
  };

  let sendEmail = async () => {
    const emailList = document.getElementById("emailList").files[0];

    const formData = new FormData();
    formData.append("emailList", emailList);
    formData.append("message", JSON.stringify(data.data));
    formData.append("selectedCardColor", selectedCardColor);
    formData.append("selectedTextColor", selectedTextColor);
    formData.append("selectedBackgroundColor", selectedBackgroundColor);
    formData.append("selectedFont", selectedFont);
    formData.append("selectedTextFont", selectedTextFont);
    formData.append("selectedFontSize", selectedFontSize);
    formData.append("editableMainTitle", editableMainTitle);
    formData.append("editableSubTitle", editableSubTitle);
    formData.append("editableTitle", editableTitle);
    formData.append("editableSummary", editableSummary);
    if (email) {
      formData.append("email", email);
      formData.append("password", password);
    } else {
      formData.append("email", "cebacaro@gmail.com");
      formData.append("password", "hcrwlakzxkjcvclx");
    }

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Email sent successfully");
        setEmail("");
        setPassword("");
      } else {
        console.log("Failed to send email");
      }
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };

  return (
    <div
      className=" w-[100vw] h-[100vh] flex  text-center  flex-col"
      style={{ backgroundColor: selectedBackgroundColor }}
    >
      <div className="flex   text-5xl font-bold  mb-1 text-white flex-col">
        {isEditingTitle ? (
          <Input
            style={{
              color: selectedTextColor,
              fontSize: "3.75rem",
              fontWeight: "bold",
              marginTop: "2.5rem",

              backgroundColor: selectedBackgroundColor,
              border: "none",
              textAlign: "center",
              width: "40%",
              marginLeft: "30%",
              marginRight: "30%",
            }}
            type="text"
            value={editableMainTitle}
            onChange={(e) => setEditableMainTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditingTitle(false);
              }
            }}
            onBlur={() => setIsEditingTitle(false)}
            autoFocus
            aria-label="Main Title"
          />
        ) : (
          <div className="flex flex-col">
            <div className="flex text-center justify-center">
              <h1
                className="text-6xl font-bold mt-10 mb-2 text-white"
                style={{ color: selectedTextColor, fontFamily: selectedFont }}
                onClick={() => setIsEditingTitle(true)}
              >
                {editableMainTitle || "Newsletter Creator"}
              </h1>
            </div>

            <div>
              {isEditingSubTitle ? (
                <Input
                  style={{
                    color: selectedTextColor,
                    fontSize: "22px",
                    fontWeight: "bold",
                    marginTop: "0.5rem",
                    marginBottom: "1rem",
                    backgroundColor: selectedBackgroundColor,

                    textAlign: "center",
                    width: "30%",
                    height: "40px",
                    margin: "auto",
                  }}
                  className="border-none"
                  type="text"
                  value={editableSubTitle}
                  onChange={(e) => setEditableSubTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditingSubTitle(false);
                    }
                  }}
                  onBlur={() => setIsEditingSubTitle(false)}
                  autoFocus
                  aria-label="Sub Title"
                />
              ) : (
                <div className="flex justify-center">
                  <h3
                    className="text-[22px] font-bold mb-0"
                    style={{
                      color: selectedTextColor,
                      fontFamily: selectedFont,
                    }}
                    onClick={() => setIsEditingSubTitle(true)}
                  >
                    {editableSubTitle ||
                      "Your Stories, Your Voice, Your Newsletter."}
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end w-[30vw] ml-[65%]">
          <Dropdown
            selectedCardColor={selectedCardColor}
            selectedTextColor={selectedTextColor}
            selectedBackgroundColor={selectedBackgroundColor}
            selectedCardFont={selectedFont}
            selectedTextFont={selectedTextFont}
            onBackgroundSelect={handleBackgroundChange}
            onColorSelect={handleColorSelect}
            onTextSelect={handleTextColorChange}
            onCardFontSelect={handleSelectedFont}
            onTextFontSelect={handleTextFontChange}
            onFontSizeSelect={handleSelectedFontSize}
            editableMainTitle={handleMainTitleChange}
            onMainTitleChange={handleMainTitleChange}
            onSubtitleChange={handleSubtitleChange}
            mainTitle={editableMainTitle}
            subTitle={editableSubTitle}
          />
        </div>
      </div>
      <div className="flex flex-col self-center mt-0 h-[65vh] w-[40vw]">
        <form
          nonvalidate="true"
          autoComplete="off"
          className=" gap-4 flex flex-row justify-center mt-0 items-center"
        >
          <TextField
            nonvalidate="true"
            sx={{
              width: 350,
              height: 40,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white !important",
                  },
                  "&.Mui-focused": {
                    borderColor: "white",
                  },
                },
                "& input": {
                  color: "white",
                },
              },
            }}
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e && e.key === "Enter") {
                e.preventDefault();
                handleSearch(e);
              }
            }}
          />{" "}
          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "black",
              marginRight: 4,
              background: "#11cb5f",
              "&:hover": {
                color: "white",
                borderColor: "#11cb5f",
                background: "#75f7ab",
              },
              height: 40,
            }}
            onClick={handleSearch}
          >
            Create
          </Button>
        </form>
        <div className="flex mt-4 px-8 gap-10 justify-center">
          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "black",
              background: "#fe00fe",
              height: 40,

              "&:hover": {
                color: "white",
                borderColor: "#fe00fe",
                background: "#f87bf8",
              },
            }}
            onClick={handleTrendingClick}
          >
            Trending
          </Button>
          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "black",
              background: "#28B2FB",
              height: 40,
              width: "150px",
              fontSize: "12px",
              "&:hover": {
                color: "white",
                borderColor: "#28B2FB",
                background: "#81ccf4",
              },
            }}
            onClick={handleHealthTechClick}
          >
            Health Tech
          </Button>

          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "black",
              background: "#ECCA42",
              height: 40,
              fontSize: "12px",
              width: "200px",
              "&:hover": {
                color: "white",
                borderColor: "#ECCA42",
                background: "#ffe26f",
              },
            }}
            className="bg-zinc-950 "
            onClick={handleGlobalEconomicsClick}
          >
            Global Economics
          </Button>
        </div>
        <div className="h-[50vh] w-[40vw] mt-10 items-center overflow-y-scroll  rounded-lg scrollbar:bg-transparent scrollbar-thin">
          <div className="">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin mt-[7rem] rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ECCA42]"></div>
              </div>
            )}
            {data && data.data.length > 0 ? (
              <div className="flex flex-col justify-center self-center ml-5 w-[90%] h-[40%]">
                {data.data.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center w-full p-5 rounded-lg  bg-orange-200 m-auto my-3 text-[18px] text-left"
                    style={{
                      backgroundColor: selectedCardColor,
                    }}
                  >
                    <h1
                      className="text-neutral-900 text-[18px] font-bold"
                      style={{
                        color: selectedTextColor,
                        fontFamily: selectedTextFont,
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      {editableIndex === index ? (
                        <input
                          style={{
                            color: selectedTextColor,
                            width: "100%",
                            padding: "5px",
                            backgroundColor: selectedCardColor,
                            borderRadius: "10px",
                            border: "1px solid black",
                          }}
                          type="text"
                          value={editableTitle}
                          onChange={(e) => setEditableTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Save the updated title in the data array
                              const newData = [...data.data];
                              newData[index].title = editableTitle;
                              setData({ data: newData });

                              // Reset the state variables
                              setEditableTitle("");
                              setEditableIndex(-1);
                            }
                          }}
                        />
                      ) : (
                        <>
                          {item.title}
                          <ModeEditOutlineOutlinedIcon
                            onClick={() => {
                              // Start editing the title
                              setEditableTitle(item.title);
                              setEditableSummary(item.summary);
                              setEditableIndex(index);
                            }}
                            style={{ color: selectedTextColor }}
                          />
                        </>
                      )}
                    </h1>

                    <h1
                      className="text-neutral-900 text-[10px] "
                      style={{
                        color: selectedTextColor,
                      }}
                    >
                      {item.date}
                    </h1>
                    <h2
                      className="text-neutral-900 text-left py-2"
                      style={{
                        color: selectedTextColor,
                        fontFamily: selectedTextFont,
                        fontSize: selectedFontSize,
                      }}
                    >
                      {editableIndex === index ? (
                        <textarea
                          style={{
                            color: selectedTextColor,
                            width: "100%",
                            padding: "10px",
                            backgroundColor: selectedCardColor,
                            borderRadius: "10px",
                            border: "1px solid black",
                            height: "200px",
                            display: "block",
                          }}
                          type="text"
                          value={editableSummary}
                          onChange={(e) => setEditableSummary(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Save the updated title in the data array
                              const newData = [...data.data];
                              newData[index].summary = editableSummary;
                              setData({ data: newData });

                              // Reset the state variables
                              setEditableSummary("");
                              setEditableIndex(-1);
                            }
                          }}
                        />
                      ) : (
                        <p>{item.summary}</p>
                      )}
                    </h2>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{}}
                    >
                      <p
                        className="text-neutral-900 text-[15px] bg-orange-300 rounded-lg"
                        style={{
                          backgroundColor: selectedCardColor,
                          color: selectedTextColor,
                          fontFamily: selectedTextFont,
                        }}
                      >
                        {item.url}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[50vh] w-[40vw] m-auto mt-10  rounded-lg"></div>
            )}
          </div>
        </div>
      </div>

      <div className=" flex justify-center mt-1 w-[100vw]">
        <form
          id="emailForm"
          action="http://localhost:3000/send-email"
          method="POST"
          className="bottom-3  flex flex-row justify-between bg-transparent align-middle w-[40vw]  rounded-lg"
        >
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#28B2FB",

              color: "black", // Replace with your desired color
              "&:hover": {
                backgroundColor: "#81ccf4", // Replace with your desired hover color
              },
            }}
          >
            Upload File
            <Input
              type="file"
              id="emailList"
              name="emailList"
              accept=".csv"
              size="sm"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Button>
          {fileName && <p className="text-white w-10"> {fileName}</p>}
          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "black",
              background: "#11cb5f",
              "&:hover": {
                color: "white",
                borderColor: "#11cb5f",
                background: "#75f7ab",
              },
              height: 40,
              position: "relative",
            }}
            onClick={() => {
              if (!fileName) {
                setError(true);
              } else {
                setError(false);
                setIsOpen(false);
                sendEmail(email, password);
              }
            }}
          >
            Send
          </Button>
          {error && (
            <label
              className="text-red"
              style={{ color: "red", marginLeft: "1rem" }}
            >
              Files needs to be loaded.
            </label>
          )}
        </form>
        <Button
          variant="outlined"
          nonvalidate="true"
          sx={{
            color: "black",
            background: "#11cb5f",
            height: 40,
            position: "absolute",
            left: "78%",
          }}
          onClick={() => setIsOpen(true)}
        >
          Send from your Email
        </Button>
      </div>
      <div>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-10 ">
            <div className="flex flex-col justify-center text-white">
              <h1 className="text-1xl text-left justify-start flex">Email</h1>
              <Input
                placeholder="email"
                className="w-[80%]"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </div>
            <div className="flex flex-col justify-center text-white ">
              <h1 className="text-1xl text-left justify-start flex">
                Email-Key
              </h1>
              <div className="flex justify-between w-[100%] flex-col">
                <div className="flex mb-12">
                  <Input
                    placeholder="exp: jsunemolpsyneduc"
                    className="w-[80%]"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Input>
                  <HelpIcon
                    style={{
                      fontSize: "large",
                      alignItems: "center",
                      margin: "auto",
                    }}
                    onClick={() => setOpenInstructions(true)}
                  />
                </div>
                <div className="flex m-auto flex-col">
                  <Button
                    nonvalidate="true"
                    variant="outlined"
                    sx={{
                      color: "black",
                      background: "#11cb5f",
                      "&:hover": {
                        color: "white",
                        borderColor: "#11cb5f",
                        background: "#75f7ab",
                      },
                      height: 40,
                      position: "relative",
                    }}
                    onClick={() => {
                      if (!fileName) {
                        setError(true);
                      } else {
                        setError(false);
                        setIsOpen(false);
                        sendEmail(email, password);
                      }
                    }}
                  >
                    Send
                  </Button>
                  {error && (
                    <label className="text-red" style={{ color: "red" }}>
                      Files needs to be loaded.
                    </label>
                  )}
                </div>
                <Modal
                  open={openInstructions}
                  onClose={() => setOpenInstructions(false)}
                  style={{
                    width: "30%",
                    left: "80%",
                  }}
                >
                  <div className="flex flex-col text-sm h-[97%] ">
                    <h1 className="text-[20px] mb-4 underline text-white ">
                      Where to find your email key?
                    </h1>
                    <div className="overflow-y-scroll   scrollbar-thin text-white ">
                      <ul className="text-1xl mt-4 gap-4 list-decimal m-4">
                        <li>
                          Go to <strong> 'Manage your google account'</strong>{" "}
                          section.{" "}
                        </li>
                        <br />

                        <li>
                          Go to <strong>Security.</strong>
                        </li>
                        <img
                          src={require("../Images/pic1.png")}
                          alt="email"
                          className="w-40 h-auto"
                        />
                        <br />
                        <li>
                          Click on <strong>2-Step Verification.</strong>
                        </li>
                        <img
                          src={require("../Images/pic2.png")}
                          alt="email"
                          className="w-50 h-auto"
                        />
                        <br />
                        <li>Insert your password and click next.</li>
                        <img
                          src={require("../Images/pic3.png")}
                          alt="email"
                          className="w-50 h-auto"
                        />
                        <br />
                        <li>
                          Scroll to the bottom of the page and click{" "}
                          <strong>App password</strong>.
                        </li>
                        <img
                          src={require("../Images/pic4.png")}
                          alt="email"
                          className="w-50 h-auto"
                        />
                        <br />
                        <li>
                          On the <strong>Select app</strong> dropdown section
                          select <strong>Mail</strong>.{" "}
                        </li>
                        <img
                          src={require("../Images/pic5.png")}
                          alt="email"
                          className="w-50 h-auto"
                        />
                        <br />
                        <li>
                          On the <strong>Select device</strong> dropdown section
                          select the device you are using.
                        </li>
                        <img
                          src={require("../Images/pic6.png")}
                          alt="email"
                          className="w-50 h-auto"
                        />
                        <br />
                        <li>
                          Click <strong>GENERATE</strong> button to generate
                          your email key.
                        </li>
                        <img
                          src={require("../Images/pic7.png")}
                          alt="email"
                          className="w-50 h-auto"
                        />
                      </ul>
                    </div>
                    {/* Add more content here as needed */}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Feed;
