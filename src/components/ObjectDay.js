import React from "react";
import { ObjectBand } from "../components/ObjectBand";


export function ObjectDay({ stage, selectedDay, selectedAct, bands, LocalStorageFavourite, localChecked }) {

  const fullDayName = (day) => {
    if (day === "mon") {
      return "Monday";
    } else if (day === "tue") {
      return "Tuesday";
    } else if (day === "wed") {
      return "Wednesday";
    } else if (day === "thu") {
      return "Thursday";
    } else if (day === "fri") {
      return "It's Friday, Friday, Gotta get down on Friday";
    } else if (day === "sat") {
      return "Saturday";
    } else if (day === "sun") {
      return "Sunday";
    }
  };

  // {
  //   /* Denne function gør at vi kan filtrere på hvilken dag der skal vises program for */
  // }
  return <div>
<h3 className="mt-20 md:text-3xl lg:text-5xl uppercase text-center md:mt-20 lg:mt-28 mb-7 md:mb-10 lg:mb-14">{selectedDay !== "" ? fullDayName(selectedDay) : ""}</h3>
  {Object.keys(stage)
    .filter(day => !selectedDay || day === selectedDay)
    .map(day => {
      { /* --------------------------------------- */ }
      if (selectedDay === (day)) {
        return <div key={day}>
        
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3 ">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />
        </div>
        </div>;
      } else {
        /* --------------------------------------- */
        return <div key={day}>
        <h3 className=" sm:mt-20 md:text-3xl lg:text-5xl uppercase text-center md:mt-20 lg:mt-28 mb-7 md:mb-10 lg:mb-14">{fullDayName(day)}</h3>
        <div key={day} className="bandList grid sm:grid-cols-1 md:grid-cols-2 md:mb-4 lg:grid-cols-3">
        <ObjectBand days={...stage[day]} selectedAct={selectedAct} bands={bands} LocalStorageFavourite={LocalStorageFavourite} localChecked={localChecked} />
        </div>
        </div>;
      }
    })} 
    </div>
   
}
