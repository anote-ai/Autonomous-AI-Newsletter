import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Feed = () => {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3001/run-script", {
        method: "GET",
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

  return (
    <div className="bg-amber-200 w-screen h-screen flex relative text-center  flex-col">
      <div>
        <h1 className="text-4xl mt-20 mb-4">Newsletter Creator</h1>
        <h3 className="text-[20px]">
          Your Stories, Your Voice, Your Newsletter.
        </h3>
      </div>
      <div className="flex flex-col self-center mt-10">
        <form nonvalidate="true" autoComplete="off" className="pr-5">
          <TextField
            nonvalidate="true"
            sx={{ width: 400, paddingRight: 2 }}
            size="small"
            variant="outlined"
          />
          <Button
            nonvalidate="true"
            variant="contained"
            sx={{
              color: "white",
              background: "#B096AC",
              height: 40,
            }}
            className="bg-zinc-950"
          >
            Create
          </Button>
        </form>
        <div className="flex mt-8 px-8 gap-10 justify-center">
          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "white",
              background: "#EB9486",
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
              color: "white",
              background: "#B096AC",
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
              background: "#CAE7B9",
              height: 40,
            }}
            className="bg-zinc-950"
          >
            AI
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
                className="flex flex-col justify-between w-100% p-5 rounded-lg  bg-orange-200 m-auto my-4"
              >
                <React.Fragment>
                  <h2 className="text-neutral-900 text-justify p-5 ">
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
