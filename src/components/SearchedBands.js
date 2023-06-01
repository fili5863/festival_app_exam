import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Anchor from "@/components/Anchor";
import React from "react";
import { Checkbox } from "@mui/material";

export function SearchedBands({
  bands,
  schedule,
  selectedAct,
  LocalStorageFavourite,
  localChecked,
}) {
  let allBands = [];
  /* Tager alle acts ud af dage og stages og smider i et stort array */
  Object.values(schedule).map(stage => {
    Object.values(stage).map(day => {
      for (let i = 0; i < day.length; i++) {
        allBands.push(day[i]);
      }
    });
  });

  /*   var midArray = schedule.Midgard
   var VanaArray = schedule.Vanaheim
   var JotunArray = schedule.Jotunheim */
  /* Object.values(midArray).map(day =>  { for (let i = 0; i < day.length; i++) {
    bandSearchList.push(day[i])}
    
  })
  Object.values(VanaArray).map(day =>  { for (let i = 0; i < day.length; i++) {
    bandSearchList.push(day[i])}
    
  })
  Object.values(JotunArray).map(day =>  { for (let i = 0; i < day.length; i++) {
    bandSearchList.push(day[i])}
    
  }) */
  const bandSlug = name => {
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].slug;
      }
    }
  };
  /* Baggrundsbillede */
  const backgroundImage = name => {
    /* console.log(name); */
    // console.log("bands", bands);
    for (let i = 0; i < bands.length; i++) {
      if (name === bands[i].name) {
        return bands[i].logo.startsWith("https://")
          ? `url("${bands[i].logo}"`
          : `url("https://scratched-bronze-lingonberry.glitch.me/logos/${bands[i].logo}")`;
      }
    }
  };

  return (
    <div className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3 ">
      {allBands
        .filter(
          band =>
            band.act.toLowerCase() !== "break" &&
            (!selectedAct || band.act.toLowerCase().includes(selectedAct.toLowerCase()))
        )
        .map(band => (
          /* --------------------------------------- */
          <div
            key={band.act}
            style={{ backgroundImage: backgroundImage(band.act) }}
            className="bandcontainer relative grid items-start justify-items-center bg-cover bg-no-repeat h-96 pb-110 border-b-2 border-color-white last:border-none  md:border-none"
          >
            {/* --------------------------------------- */}
            <div className="iconContainer absolute top-5 right-5 w-3 h-3 bg-color-yellow p-5 rounded-full flex items-center justify-center">
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
              className="flex flex-col w-full h-full justify-between bg-color-black bg-opacity-50 lg:hover:bg-opacity-0 transition"
            >
              <span className="text-color-black font-sans uppercase font-bold pt-5 place-self-center w-fit px-6 mx-6 mt-20 py-3 text-3xl text-center bg-color-white">
                {band.act}
              </span>
            </Anchor>
          </div>
        ))}
    </div>
  );
}
