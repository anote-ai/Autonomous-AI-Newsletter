import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Feed = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("/run-script?key_word=my%20secret%20key");
      console.log(response);
      if (!response.ok) {
        const message = `An error has occurred: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      const result = {
        status: response.status + "-" + response.statusText,
        headers: {
          "Content-Type": response.headers.get("Content-Type"),
          "Content-Length": response.headers.get("Content-Length"),
        },
        length: response.headers.get("Content-Length"),
      };

      setData(result.data);
    } catch (err) {
      setData(err.message);
      return null;
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
        <div className="bg-white h-[60vh] w-[50vw] mt-10">
          <h2 className="text-neutral-900">{data}</h2>
        </div>
      </div>
    </div>
  );
};

export default Feed;
