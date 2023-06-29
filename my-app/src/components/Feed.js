import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { debounce } from "lodash";
import Input from "@mui/joy/Input";

const Feed = () => {
  const [data, setData] = useState({ data: [] });
  const [searchTerm, setSearchTerm] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

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
    if (file) {
      setFileName(file.name);
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

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.log("Failed to send email");
      }
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };

  return (
    <div className="bg-[#171515] w-screen h-screen flex relative text-center  flex-col">
      <div>
        <h1 className="text-6xl font-bold mt-10 mb-4 text-white">
          Newsletter Creator
        </h1>

        <h3 className="text-[22px] text-white font-bold">
          Your Stories, Your Voice, Your Newsletter.
        </h3>
      </div>
      <div className="flex flex-col self-center mt-8">
        <form nonvalidate="true" autoComplete="off" className="pr-5">
          <TextField
            nonvalidate="true"
            sx={{
              width: 400,
              paddingRight: 2,
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
          />{" "}
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
            }}
            className="bg-zinc-950"
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
              "&:hover": {
                color: "white",
                borderColor: "#28B2FB",
                background: "#81ccf4",
              },
            }}
            className="bg-zinc-950"
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
        <div className="h-[50vh] w-[50vw] mt-10 items-center overflow-y-scroll  rounded-lg scrollbar:bg-transparent scrollbar-thin">
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
                  >
                    <h1 className="text-neutral-900 text-[18px] font-bold">
                      {item.title}
                    </h1>
                    <h1 className="text-neutral-900 text-[10px] ">
                      {item.date}
                    </h1>
                    <h2 className="text-neutral-900 text-left py-2">
                      {item.summary}
                    </h2>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-neutral-900 text-[15px] bg-orange-300 rounded-lg">
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
          className="bottom-3  flex flex-row justify-between bg-[#171515]  w-[30vw] rounded-lg"
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
          {fileName && <p className="text-white"> {fileName}</p>}
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
            onClick={sendEmail}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feed;
