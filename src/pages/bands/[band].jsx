import Head from "next/head";
import Button from "@mui/material/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import Anchor from "@/components/Anchor";
import { Spotify } from "@/components/svgs";
import { Youtube } from "@/components/svgs";
import { ArrowLeft } from "@/components/svgs";
import { TextField, Checkbox, Snackbar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import apiConfig from "../../../apiConfig";
import Image from "next/image";

import "material-symbols";

export default function Product({ bandData, scheduleData }) {
  const [snackOpen, setSnackOpen] = useState([false, ""]);
  const [favourites, setFavourites] = useState();
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const currentLocal = localStorage.getItem("favourites");

    if (currentLocal !== null) {
      if (currentLocal === "[]") {
        localStorage.removeItem("favourites");
      } else {
        const currentToArray = currentLocal.substring(0, currentLocal.length - 1).split(`/","`);
        for (let i = 0; i < currentToArray.length; i++) {
          if (currentToArray[i] === bandData.name) {
            setFavourites(currentToArray[i]);
            setChecked(true);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const currentLocal = localStorage.getItem("favourites");

    if (checked === false && currentLocal === null) {
      console.log("Nothing");
      console.log("1");
    } else if (currentLocal !== null) {
      console.log("2");
      const currentToArray = currentLocal.substring(0, currentLocal.length - 1).split(`/","`);
      if (favourites === undefined && currentToArray.includes(bandData.name)) {
        console.log("3");
        if (currentToArray.length < 2) {
          console.log("4");
          localStorage.removeItem("favourites");
        } else {
          console.log("5");
          const filteredList = currentToArray.filter((band) => band !== bandData.name);
          const newUpdatedLocal = filteredList.map((band) => band + "/");
          const NULJSON = JSON.stringify(newUpdatedLocal);
          const NULJSON2 = NULJSON.substring(2, NULJSON.lastIndexOf(`"]`));
          localStorage.setItem("favourites", NULJSON2);
        }
      } else if (!currentToArray.includes(bandData.name) && favourites !== undefined) {
        console.log("6");
        const updatedLocal = [...currentToArray, favourites];
        const newUpdatedLocal = updatedLocal.map((band) => band + "/");
        const NULJSON = JSON.stringify(newUpdatedLocal);
        const NULJSON2 = NULJSON.substring(2, NULJSON.lastIndexOf(`"]`));
        localStorage.setItem("favourites", NULJSON2);
      }
    } else if (currentLocal === null) {
      console.log("7");
      console.log("favourites", favourites);
      if (favourites !== undefined) {
        console.log("8");
        const newArray = [favourites];
        const newUpdatedLocal = newArray.map((band) => band + "/");
        const NULJSON = JSON.stringify(newUpdatedLocal);
        const NULJSON2 = NULJSON.substring(2, NULJSON.lastIndexOf(`"]`));
        localStorage.setItem("favourites", NULJSON2);
      }
    }
    console.log("9");
  }, [favourites]);

  function LocalStorageFavourite() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (snackOpen[0] === true) {
      closeSnack;
      sleep(500).then(() => {
        if (favourites === undefined) {
          console.log("1) Nej, vi er her");
          setSnackOpen([true, `${bandData.name} has been added to favourites`]);
          setFavourites(bandData.name);
          setChecked(true);
        } else {
          console.log("2) vi er her");
          setSnackOpen([true, `${bandData.name} has been removed from favourites`]);
          setFavourites();
          setChecked(false);
        }
      });
    } else if (snackOpen[0] === false) {
      // favourites.length === bandData.name.length ||
      if (favourites === undefined) {
        console.log("3) Hallo, vi er her");
        setSnackOpen([true, `${bandData.name} has been added to favourites`]);
        setFavourites(bandData.name);
        setChecked(true);
      } else {
        console.log("4) Nej, nej nej, vi er her");
        setSnackOpen([true, `${bandData.name} has been removed from favourites`]);
        setFavourites();
        setChecked(false);
      }
    }
  }

  function closeSnack() {
    setSnackOpen([false, ""]);
  }

  const action = (
    <>
      <Anchor href="../personalprogram">
        <Button
          color="success"
          size="small"
        >
          See Personal Program
        </Button>
      </Anchor>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  // console.log(bandData);
  console.log("scheduleData", scheduleData);
  const logoUrl = bandData.logo.startsWith("https://") ? bandData.logo : `https://scratched-bronze-lingonberry.glitch.me/logos/${bandData.logo}`;
  // matching act is initialized as null
  let matchingAct = null; // Initialize a variable to store the matching act

  // locationKey is the variable used to loop through each location object in scheduleData.
  // scheduleData = object with nested objects and arrays, where each object represents a different location

  // Loop through each key in the scheduleData object
  for (const locationKey in scheduleData) {
    const location = scheduleData[locationKey];
    // Loop through each day in the current location
    for (const dayKey in location) {
      const day = location[dayKey];
      // Loop through each act on the current day
      for (const act of day) {
        // If the act's name matches the bandData's name
        if (act.act === bandData.name) {
          // Create a new object with the act's data and location/day info
          matchingAct = {
            start: act.start,
            end: act.end,
            day: dayKey,
            stage: locationKey,
          };

          // Check if the matching act is cancelled and add the the property to the mathcingAct object if true
          if (act.cancelled) {
            matchingAct.cancelled = act.cancelled;
          }

          // console.log({ matchingAct });
          // console.log(matchingAct.day);

          // Break out of the innermost loop since a match has been found
          break;
        }
      }
      // If a match has been found, break out of the middle loop
      if (matchingAct) {
        break;
      }
    }
    // If a match has been found, break out of the outermost loop
    if (matchingAct) {
      break;
    }
  }
  if (matchingAct.day === "sun") {
    matchingAct.day = "Sunday";
  } else if (matchingAct.day === "mon") {
    matchingAct.day = "Monday";
  } else if (matchingAct.day === "tue") {
    matchingAct.day = "Tuesday";
  } else if (matchingAct.day === "wed") {
    matchingAct.day = "Wednesday";
  } else if (matchingAct.day === "thu") {
    matchingAct.day = "Thursday";
  } else if (matchingAct.day === "fri") {
    matchingAct.day = "Friday";
  } else if (matchingAct.day === "sat") {
    matchingAct.day = "Saturday";
  } else {
    matchingAct.day = "Invalid day";
  }

  // matchingAct now contains the data for the matching act, if any.
  // This can be used to display the relevant information on the page.
  // console.log(matchingAct);
  // console.log(matchingAct.cancelled);
  return (
    <>
      <Head>
        <title>Foofest | {bandData.name}</title>
      </Head>
      <div className="max-w-screen-xl m-auto">
        {/* <p className="text-color-white">
          Favourites: <span>{favourites}</span>
        </p>
        <button
          className="text-color-white"
          onClick={() => console.log(checked)}
        >
          Is Checked? -
        </button> */}
        {/* <button className="text-color-white" onClick={() => console.log(favourites)}>
          Band name
        </button> */}
        <div className="relative aspect-video object-contain grid ">
          <Button
            onClick={() => goBack()}
            className="absolute left-1 top-1 z-40"
          >
            <ArrowLeft className="fill-color-yellow w-10" />
          </Button>
          {matchingAct.cancelled !== true ? (
            <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center z-20">
              <Checkbox
                onClick={LocalStorageFavourite}
                onChange={handleChange}
                checked={checked}
                value={bandData.name}
                className="p-0"
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                color="error"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 30 },
                }}
              />
            </div>
          ) : (
            ""
          )}
          {matchingAct.cancelled === true ? (
            <div className="grid items-center justify-items-center ">
              <h2 className="w-full uppercase text-center bg-color-red z-40 grid col-start-1 row-start-1 text-color-blue">Cancelled</h2>
              <Image
                width={100}
                height={100}
                src={logoUrl}
                alt={bandData.bio}
                quality={80}
                className="z-10 filter grayscale object-contain w-full col-start-1 row-start-1 aspect-video pointer-events-none"
              />
            </div>
          ) : (
            <Image
              width={100}
              height={100}
              src={logoUrl}
              alt={bandData.bio}
              quality={80}
              className="w-full aspect-video object-contain z-10 pointer-events-none"
            />
          )}
          <Image
            width={100}
            height={100}
            src={logoUrl}
            alt={bandData.bio}
            quality={80}
            className="absolute z-0 grid-row-1 w-full aspect-video object-fill blur-sm pointer-events-none"
          />
        </div>
        <div className="max-w-2xl mx-auto px-1 sm:px-0">
          <h3 className="text-4xl uppercase pt-2 pb-3 ">{bandData.name}</h3>
          <section className="pb-5">
            <p>{bandData.genre}</p>
          </section>
          {matchingAct && (
            <section className="pb-8">
              <p>
                <span className="font-semibold"> {matchingAct.day}</span>, {matchingAct.start}
              </p>

              <span className="font-thin font-sans text-xl text-color-white">{matchingAct.stage}</span>
            </section>
          )}
          <section className="pb-10">
            <h3 className="uppercase">Biografi</h3>
            <p className="max-w-prose">{bandData.bio}</p>
          </section>
          <div className="flex justify-center gap-10">
            <Spotify className="w-12 h-12 mr-10" />
            <Youtube className="w-12 h-12" />
          </div>
        </div>
      </div>
      <Snackbar
        open={snackOpen[0]}
        autoHideDuration={4000}
        onClose={closeSnack}
        message={snackOpen[1]}
        action={action}
      />
      ;
    </>
  );
}

function goBack() {
  window.history.back();
}

export async function getServerSideProps(context) {
  const apiUrl = apiConfig[process.env.NODE_ENV].apiUrl;
  const band = context.params.band;

  // Fetch post data from API using the ID parameter

  const [res1, res2] = await Promise.all([fetch(`${apiUrl}/bands/${band}`), fetch(`${apiUrl}/schedule`)]);

  const bandData = await res1.json();
  const scheduleData = await res2.json();

  // Pass the post data as props to the page
  return {
    props: {
      bandData,
      scheduleData,
    },
  };
}
