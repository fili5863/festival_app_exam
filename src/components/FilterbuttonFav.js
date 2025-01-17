import Button from "@mui/material/Button";
import React from "react";

export function FilterbuttonFav({ selectedFav, onClick, selectedAct }) {
  if (selectedAct !== "") {
    return;
  }
  return (
    <Button
      className="mt-5 rounded-none font-sans font-bold border-2 border-solid place-self-center border-color-yellow h-10 w-fit hover:bg-color-yellow hover:text-color-black active:bg-color-yellow text-color-yellow"
      onClick={() => onClick()}
    >
      {selectedFav ? "show all" : "show favorites"}
    </Button>
  );
}
