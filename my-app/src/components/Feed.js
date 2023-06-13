import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { debounce } from "lodash";

const Feed = () => {
  const [data, setData] = useState({ data: [] });
  const [searchTerm, setSearchTerm] = useState(" ");
  const [loading, setLoading] = useState(false);

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
        <div className="flex mt-8 px-8 gap-10 justify-center">
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
        <div className="h-[50vh] w-[45vw] mt-10 items-center overflow-y-scroll rounded-lg">
          <div className="">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin mt-[7rem]  rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            )}
            {data && data.data.length > 0 ? (
              <div className="flex flex-col justify-center self-center ml-5 w-[90%] h-full">
                {data.data.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center w-full p-5 rounded-lg  bg-orange-200 m-auto my-4 text-[18px] text-left"
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
      <div className="flex justify-center mt-8">
        <form
          id="emailForm"
          action="http://localhost:3000/send-email"
          method="POST"
          className="bottom-3  flex flex-col bg-[#171515]   w-[20vw] rounded-lg"
        >
          <input
            type="email"
            name="toEmail"
            placeholder="Recipient Email"
            required
            className="rounded-md p-2 mb-3"
          />
          <Button
            nonvalidate="true"
            variant="outlined"
            sx={{
              color: "black",
              background: "#11cb5f",
              height: 40,
              marginTop: 2,
              width: "20%",
              margin: "auto",
            }}
            className="bg-zinc-950 "
            onClick={handleSearch}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feed;
