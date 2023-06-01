import Head from "next/head";
import Anchor from "@/components/Anchor";
import Image from "next/image";
import Logo from "../components/svgs/logo.png";
import Button from "@mui/material/Button";
import apiConfig from "../../apiConfig";
import { useRouter } from "next/router";
// import App from "next/app";
// import Navbar from "@/components/Navbar";
// import Checkbox from "@mui/material/Checkbox";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import { useState, useEffect } from "react";
// import { ButtonBase } from "@mui/material";

export default function MyApp({ bands }) {
  console.log(bands);
  const router = useRouter();

  function secureTickets() {
    router.push("https://booking-flow.vercel.app/");
  }
  return (
    <>
      <Head>
        <title>FooFest | Welcome to FooFest!</title>
      </Head>
      <div className=" bg-index-background bg-no-repeat bg-center bg-cover  bg-blend-screen min-h-screen flex flex-col gap-12 ">
        <div class="w-3/4 max-w-2xl flex flex-col justify-center m-auto ">
          <Image
            src={Logo}
            height={"100%"}
            width={"100%"}
            alt="FooFest logo"
          ></Image>
          <h1 className="text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl">FOOFEST</h1>
          <h3 className="text-center uppercase text-base sm:text-2xl md:text-3xl lg:text-4xl text-color-white mt-10 leading-10">
            {" "}
            Where amazing music meets Scandinavian Serenity in Dancing Lights!{" "}
          </h3>

          <Button
            className="text-xs mt-20 rounded-none border-2 px-8 md:py-4 md:px-20 border-solid place-self-center border-color-yellow h-10 text-color-yellow hover:bg-color-yellow hover:text-color-black font-sans font-bold"
            onClick={secureTickets}
          >
            SECURE YOUR TICKETS HERE
          </Button>
        </div>
        <div className="my-10 mx-auto h-0.5 w-4/5 max-w-3/4 bg-color-white"></div>
        <div className="flex flex-col gap-6">
          <h3 className="mb-16 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            EXPERIENCE BANDS SUCH AS:
          </h3>
          <div className="flex flex-row flex-wrap gap-y-3 gap-x-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-10  justify-center ">
            <BandList1 bands={bands} />
          </div>
          <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 sm:gap-x-8 md:gap-x-12 lg:gap-x-10 justify-center">
            <BandList2 bands={bands} />
          </div>
          <div className="flex flex-row flex-wrap gap-y-2 gap-x-2 sm:gap-x-5 md:gap-x-8 lg:gap-x-10 justify-center">
            <BandList3 bands={bands} />
          </div>
        </div>
        <Button className="text-xs md:text-l md:py-4 mt-8 rounded-none border-2 border-solid place-self-center border-color-yellow h-10 px-20 text-color-yellow hover:bg-color-yellow hover:text-color-black">
          <Anchor
            className="font-sans font-bold"
            href="/program"
          >
            SEE ALL ARTIST
          </Anchor>
        </Button>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const apiUrl = apiConfig[process.env.NODE_ENV].apiUrl;
  const api = `${apiUrl}/bands`;
  const res = await fetch(api);
  const data = await res.json();

  return {
    props: {
      bands: data,
    },
  };
}

function BandList1(props) {
  const bandsToShow = props.bands.slice(5, 7);
  return bandsToShow.map(band => (
    <Band
      key={band.name}
      {...band}
    />
  ));
}
function BandList2(props) {
  const bandsToShow = props.bands.slice(2, 5);
  return bandsToShow.map(band => (
    <Band2
      key={band.name}
      {...band}
    />
  ));
}

function BandList3(props) {
  const bandsToShow = props.bands.slice(7, 12);
  return bandsToShow.map(band => (
    <Band3
      key={band.name}
      {...band}
    />
  ));
}

function Band(band) {
  return (
    <>
      <h2 className="text-center uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl bandHover  border-color-white  ">
        <Anchor
          className="px-2"
          href={`/bands/${band.slug}`}
        >
          {band.name}
        </Anchor>
      </h2>
    </>
  );
}
function Band2(band) {
  return (
    <>
      <h3 className="text-center uppercase text-lg sm:text-4xl md:text-5xl lg:text-5xl text-color-white bandHover2 ">
        <Anchor href={`/bands/${band.slug}`}>{band.name}</Anchor>
      </h3>
    </>
  );
}
function Band3(band) {
  return (
    <>
      <h4 className="text-center uppercase text-base sm:text-2xl md:text-3xl lg:text-4xl text-color-white bandHover2 font-sans">
        <Anchor href={`/bands/${band.slug}`}>{band.name}</Anchor>
      </h4>
    </>
  );
}
