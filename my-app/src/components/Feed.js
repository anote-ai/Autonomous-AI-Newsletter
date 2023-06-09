import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Feed = () => {
  const [data, setData] = useState({ data: [] });
  const [searchTerm, setSearchTerm] = useState(" ");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3001/run-script", {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key_word: searchTerm }), // Include the search term in the request body
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const data = await response.json();

      setData(data);
    } catch (err) {
      setData({ data: [] });
    }
  }
  const handleSearch = (event) => {
    event.preventDefault();
    setData(data);
    console.log("DONEEE!!!!!");
  };

  return (
    <div className="bg-[#171515] w-screen h-screen flex relative text-center  flex-col">
      <div>
        <h1 className="text-6xl font-bold mt-20 mb-4 text-white">
          Newsletter Creator
        </h1>
        <h3 className="text-[32px] text-white font-bold">
          Your Stories, Your Voice, Your Newsletter.
        </h3>
      </div>
      <div className="flex flex-col self-center mt-10">
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
          />
          <Button
            nonvalidate="true"
            variant="contained"
            sx={{
              color: "black",
              background: "#defe47",
              height: 40,
            }}
            className="bg-zinc-950"
            onClick={handleSearch}
          >
            Create
          </Button>
        </form>
        <div className="flex mt-8 px-8 gap-10 justify-center">
          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "black",
              background: "#fe00fe",
              height: 40,
              "&:hover": {
                background: "none", // Turn off hover effect
              },
            }}
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
            }}
            className="bg-zinc-950"
          >
            Health Tech
          </Button>

          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "white",
              background: "##ECCA42",
              height: 40,
            }}
            className="bg-zinc-950"
          >
            Global Economics
          </Button>
        </div>
        <div className="h-[60vh] w-[50vw] mt-10 overflow-y-scroll rounded-lg">
          <div className="">
            {data.data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between w-100% p-5 rounded-lg  bg-orange-200 m-auto my-4 font-[18px]"
              >
                <React.Fragment>
                  <h2 className="text-neutral-900 text-left  py-2 ">
                    {item.summary}
                  </h2>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <h1 className="text-neutral-900">{item.url}</h1>
                  </a>
                  <h1 className="text-neutral-900">{item.date}</h1>
                </React.Fragment>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
