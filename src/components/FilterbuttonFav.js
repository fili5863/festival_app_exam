import Button from "@mui/material/Button";
import React from "react";

export function FilterbuttonFav({ selectedFav, onClick }) {
  return (
    <Button
      className={`mt-5 rounded-none font-sans font-bold border-2 border-solid place-self-center border-color-yellow h-10 w-fit hover:bg-color-yellow hover:text-color-black active:bg-color-yellow ${
        selectedFav === false ? "text-color-yellow" : "bg-color-yellow text-color-black"
      }`}
      onClick={() => onClick(!selectedFav)}
    >
      {selectedFav ? "show all" : "show favorites"}
    </Button>
  );
}
