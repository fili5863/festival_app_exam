import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Anchor from "@/components/Anchor";
import React from "react";
import { Checkbox } from "@mui/material";
import Image from "next/image";

const imageStyle = {
  height: "100%",
  width: "auto",
};

export function ObjectBand({ days, selectedAct, bands, LocalStorageFavourite, localChecked }) {
  // console.log("days", days)
  // console.log("selectedAct", selectedAct)
  /*  console.log("bands", bands) */

  const bandSlug = name => {
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].slug;
      }
    }
  };
  /* Baggrundsbillede */
  const backgroundImage = name => {
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].logo.startsWith("https://")
          ? bands[i].logo
          : `https://scratched-bronze-lingonberry.glitch.me/logos/${bands[i].logo}`;
      }
    }
  };

  const imageCredit = name => {
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].logoCredits
          ? `Credits: ${bands[i].logoCredits}`
          : `Cover image for the band "${bands[i].name}`;
      }
    }
  };
  /* Søgefunktion */
  return Object.values(days)
    .filter(
      band =>
        band.act.toLowerCase() !== "break" &&
        (!selectedAct || band.act.toLowerCase().includes(selectedAct))
    )
    .map(band =>
      band.cancelled != true ? (
        /* --------------------------------------- */
        <div
          key={band.act}
          className="bandcontainer relative bg-cover bg-no-repeat h-96 w-100 pb-110 border-b-2 border-color-white last:border-none  md:border-none"
        >
          <Image
            style={imageStyle}
            priority={false}
            height={1080}
            width={1920}
            src={backgroundImage(band.act)}
            sizes="(max-width: 750px) 100vw, 750px"
            quality={80}
            placeholder="empty"
            alt={imageCredit(band.act)}
          />
          {/* --------------------------------------- */}
          <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center z-40 ">
            <Checkbox
              onClick={LocalStorageFavourite}
              checked={localChecked(band.act)}
              value={band.act}
              className="p-0 "
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              color="error"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 30 },
              }}
            />
          </div>
          {/* --------------------------------------- */}
          <Anchor
            href={`/bands/${bandSlug(band.act)}`}
            className="flex flex-col w-full h-full gap-16 md:gap-0 justify-center md:justify-between bg-color-black bg-opacity-50 lg:hover:bg-opacity-0 transition z-0 top-0 left-0 absolute"
          >
            <span className="text-color-black font-sans uppercase font-bold pt-2 md:pt-4 lg:pt-5 place-self-center w-fit px-6 mx-6 mt-20 py-1 md:py-2 lg:py-3 md:text-xl lg:text-2xl text-center bg-color-white ">
              {band.act}
            </span>
            <span className="timeslot text-color-black font-sans uppercase font-bold pt-2 place-self-center w-max px-6 mx-6 mb-20 py-1 md:text-xl lg:text-xl text-center bg-color-white lg:opacity-0 md:transition ">
              {band.start} - {band.end}
            </span>
          </Anchor>
        </div>
      ) : (
        /* Cancelled */
        <div
          key={band.act}
          // style={{ backgroundImage: backgroundImage(band.act) }}
          className="bandcontainer relative bg-cover bg-no-repeat h-96 w-100 pb-110 border-b-2 border-color-white last:border-none  md:border-none "
        >
          <Image
            style={imageStyle}
            priority={false}
            height={1080}
            width={1920}
            src={backgroundImage(band.act)}
            sizes="(max-width: 750px) 100vw, 750px"
            quality={80}
            placeholder="empty"
            alt={imageCredit(band.act)}
          />
          {/* --------------------------------------- */}
          <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center z-40 ">
            <Checkbox
              onClick={LocalStorageFavourite}
              checked={localChecked(band.act)}
              value={band.act}
              className="p-0"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              color="error"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 30 },
              }}
            />
          </div>
          {/* --------------------------------------- */}
          <Anchor
            href={`/bands/${bandSlug(band.act)}`}
            className="flex flex-col w-full h-full gap-16 md:gap-0 justify-center md:justify-between bg-color-black bg-opacity-50 absolute top-0 left-0"
          >
            <span className="text-color-black font-sans uppercase font-bold md:pt-4 lg:pt-5 place-self-center w-fit px-6 mx-6 mt-20 py-1 md:py-2 lg:py-3 md:text-xl lg:text-2xl text-center bg-color-white z-100">
              {band.act}
            </span>
            <span className="timeslot text-color-red font-sans uppercase font-bold place-self-center w-max px-6 mx-6 mb-20 py-1 md:text-xl lg:text-xl text-center bg-color-white z-100">
              {band.cancelled ? "Cancelled" : ""}
            </span>
          </Anchor>
        </div>
      )
    );
}
