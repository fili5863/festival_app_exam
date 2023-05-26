import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Anchor from "@/components/Anchor";
import Head from "next/head";
// import Link from "next/link";
import React from "react";
import { TextField, Snackbar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
// import { BadgeRounded } from "@mui/icons-material";
import { FilterbuttonsDay } from "../components/FilterbuttonsDay";
import { FilterbuttonsStage } from "../components/FilterbuttonsStage";
import { Schedule } from "../components/Schedule";
// import { createTheme, ThemeProvider, useTheme } from "@mui/material";

export default function Program({ schedule, bands }) {
  // console.log(schedule);
  // console.log(bands);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedAct, setSelectedAct] = useState("");
  const [snackOpen, setSnackOpen] = useState([false, ""]);
  const [favourites, setFavourites] = useState();
  // const outerTheme = useTheme();
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    const currentLocal = localStorage.getItem("favourites", JSON.stringify(favourites));
    console.log("CurrentLocal", currentLocal);

    if (currentLocal !== null) {
      const currentToArray = currentLocal.split(`","`);
      console.log("currentToArray", currentToArray);
      setFavourites(currentToArray);
    } else {
      console.log("LocalStorage is Empty");
    }
  }, []);

  useEffect(() => {
    const favToString = JSON.stringify(favourites);
    console.log("FavToString", favToString);
    if (favToString !== undefined || favToString === []) {
      const editFav = favToString.substring(2, favToString.lastIndexOf(`"]`));
      localStorage.setItem("favourites", editFav);
      // console.log("editFav", editFav);
    } else {
      localStorage.removeItem("favourites");
    }
  }, [favourites]);

  function handleStageClick(stage) {
    setSelectedStage(stage);
  }

  function handleDayClick(day) {
    setSelectedDay(day);
    console.log(day);
  }

  function handleChange(e) {
    setSelectedAct(e.target.value);
    console.log(e.target.value);
    console.log("length", setSelectedAct.length);
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const LocalStorageFavourite = (e) => {
    // console.log(e)
    if (snackOpen[0] === true) {
      closeSnack;
      sleep(500).then(() => {
        if (e.target.checked === true) {
          setSnackOpen([true, `${e.target.value} has been added to favourites`]);
          // localStorage.setItem("favourites", JSON.stringify(favourites));
        } else {
          setSnackOpen([true, `${e.target.value} has been removed from favourites`]);
        }
      });
    } else if (snackOpen[0] === false) {
      e.target.checked === true ? setSnackOpen([true, `${e.target.value} has been added to favourites`]) : setSnackOpen([true, `${e.target.value} has been removed from favourites`]);
    }
    CheckFavourites(e.target.value, e.target.checked);
  };

  function closeSnack() {
    setSnackOpen([false, ""]);
  }

  function CheckFavourites(band, i) {
    if (i === true) {
      if (favourites === undefined) {
        setFavourites([`${band}/`]);
      } else {
        setFavourites([...favourites, `${band}/`]);
      }
    } else {
      if (favourites.length === 0) {
        setFavourites();
      } else {
        const newFavourites = favourites.filter((fav) => fav != `${band}/`);
        setFavourites(newFavourites);
      }
    }
    console.log("CheckFav", favourites);
  }

  const action = (
    <>
      <Anchor href="personalprogram">
        <Button color="success" size="small">
          See Personal Program
        </Button>
      </Anchor>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const localChecked = (band) => {
    if (favourites !== undefined) {
      for (let i = 0; i < favourites.length; i++) {
        if (favourites[i].substring(0, favourites[i].lastIndexOf("/")) === band) {
          console.log(favourites[i].substring(0, favourites[i].lastIndexOf("/")));
          console.log(band);
          return "checked";
        }
      }
    } else {
      return "";
    }
  };

  function handleStageClick(stage) {
    setSelectedStage(stage);
  }

  function handleDayClick(day) {
    setSelectedDay(day);
    console.log(day);
  }

  function handleChange(e) {
    setSelectedAct(e.target.value);
    console.log(e.target.value);
  }

  // const customTheme = (outerTheme) =>
  //   createTheme({
  //     palette: {
  //       mode: outerTheme.palette.mode,
  //     },
  //     components: {
  //       MuiTextField: {
  //         styleOverrides: {
  //           root: {
  //             "--TextField-brandBorderColor": "#FFFFFF",
  //             "--TextField-brandBorderHoverColor": "#FFFFFF",
  //             "--TextField-brandBorderFocusedColor": "#FFFFFF",
  //             "& label.Mui-focused": {
  //               color: "var(--TextField-brandBorderFocusedColor)",
  //             },
  //           },
  //         },
  //       },
  //       MuiInput: {
  //         styleOverrides: {
  //           root: {
  //             "&:before": {
  //               borderBottom: "2px solid var(--TextField-brandBorderColor)",
  //             },
  //             "&:hover:not(.Mui-disabled, .Mui-error):before": {
  //               borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
  //             },
  //             "&.Mui-focused:after": {
  //               borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  return (
    <>
      <Head>
        <title>FooFest | Program</title>
      </Head>
      <div className="max-w-screen-xl mt-10 m-auto bg-gradient-to-b from-color-black to-color-blue">
        <h1 className="uppercase text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Program</h1>
        <div className="flex flex-col gap-6 mt-10 mb-20">
          <div className="flex flex-col lg:flex-row-reverse justify-center gap-2 lg:mt-10 ">
            <div className=" flex justify-center w-64 sm:w-80 md:w-96 mx-auto lg:mx-0">
              <TextField className="w-full" label="Search for band" onChange={handleChange}></TextField>
            </div>
            <FilterbuttonsStage schedule={schedule} onClick={handleStageClick} selectedAct={selectedAct} />
          </div>
          <FilterbuttonsDay schedule={schedule} onClick={handleDayClick} selectedAct={selectedAct} selectedDay={selectedDay} />
        </div>
        <Schedule schedule={schedule} selectedStage={selectedStage} selectedDay={selectedDay} selectedAct={selectedAct} bands={bands} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />
        <Snackbar open={snackOpen[0]} autoHideDuration={4000} onClose={closeSnack} message={snackOpen[1]} action={action} />;
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // const band = context.params.band;

  // Fetch post data from API using the ID parameter

  const [res1, res2, res3] = await Promise.all([fetch(`http://localhost:8080/bands`), fetch(`http://localhost:8080/schedule`), fetch(`http://localhost:8080/events`)]);

  const bands = await res1.json();
  const schedule = await res2.json();
  const event = await res3.json();

  // Pass the post data as props to the page
  return {
    props: {
      bands,
      schedule,
      event,
    },
  };
}
