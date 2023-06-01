import React from "react";
import Link from "next/link";
import { NavLogo } from "./svgs";
import Button from "@mui/material/Button";
import TemporaryDrawer from "./BurgerMenu";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

  function goTo() {
    router.push("https://booking-flow.vercel.app/");
  }
  return (
    <div className="z-60 flex justify-between bg-color-black-nav backdrop-blur p-3 sticky top-0 w-full z-50">
      <Link
        href={"/"}
        className="flex flex-col justify-center max"
      >
        <NavLogo className="w-24 h-auto" />
      </Link>
      <div className="flex justify-center">
        <Button
          className="font-bold rounded-none font-sans border-2 border-solid place-self-center border-color-yellow h-10 px-10 text-color-yellow hover:bg-color-yellow hover:text-color-black"
          onClick={goTo}
        >
          BUY TICKETS
        </Button>
        <TemporaryDrawer className="flex -z-10" />
      </div>
    </div>
  );
}

export default Navbar;
