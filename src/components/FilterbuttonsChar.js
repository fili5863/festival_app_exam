import Button from "@mui/material/Button";
import React from "react";

export function FilterbuttonsChar({ selectedChar, onClick }) {
  const alphabet = "abcdefghijklmnopqrstuwxyz".split("");
  console.log(alphabet);
  return (
    <div className="flex flex-wrap justify-center max-w-4xl m-auto">
      <Button
        className={`rounded-none font-sans font-bold border-2 border-solid place-self-center border-color-yellow h-10 w-12 hover:bg-color-yellow hover:text-color-black active:bg-color-yellow ${
          selectedChar === "" ? "bg-color-yellow text-color-black" : "text-color-yellow"
        }`}
        onClick={() => onClick("")}
      >
        All
      </Button>
      {alphabet.map(char => (
        <Button
          className={`rounded-none font-sans font-bold border-2 border-solid place-self-center border-color-yellow h-10 w-12 hover:bg-color-yellow hover:text-color-black active:bg-color-yellow ${
            selectedChar === char ? "bg-color-yellow text-color-black" : "text-color-yellow"
          }`}
          key={char}
          onClick={() => onClick(char)}
        >
          {char}
        </Button>
      ))}
    </div>
  );
}
