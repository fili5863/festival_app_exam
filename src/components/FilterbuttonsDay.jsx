import Button from "@mui/material/Button";
import React from "react";

export function FilterbuttonsDay({ schedule, onClick, selectedAct, selectedDay }) {
  const days = new Set();

  Object.keys(schedule).map((stage) => {
    Object.keys(schedule[stage]).map((day) => {
      days.add(day);
    });
  });

  if (selectedAct !== "") {
    return;
  }

  return (
    <div className="mt-5 flex justify-center flex-wrap">
      <Button className={` leading-4 rounded-none font-sans font-bold border-2 border-solid place-self-center border-color-yellow h-10 w-12 hover:bg-color-yellow hover:text-color-black ${selectedDay === "" ? "bg-color-yellow text-color-black" : "text-color-yellow"}`} onClick={() => onClick("")}>
        All days
      </Button>
      {[...days].map((day) => (
        <Button className={`rounded-none font-sans font-bold border-2 border-solid place-self-center border-color-yellow h-10 w-12 hover:bg-color-yellow hover:text-color-black active:bg-color-yellow ${selectedDay === day ? "bg-color-yellow text-color-black" : "text-color-yellow"}`} key={day} onClick={() => onClick(day)}>
          {day}
        </Button>
      ))}
    </div>
  );
}
