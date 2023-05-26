import Head from "next/head";
import Anchor from "@/components/Anchor";
import Image from "next/image";
import Logo from "../components/svgs/logo.png";
// import App from "next/app";
import Button from "@mui/material/Button";
// import Navbar from "@/components/Navbar";
// import Checkbox from "@mui/material/Checkbox";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import { useState, useEffect } from "react";
// import { ButtonBase } from "@mui/material";

export default function MyApp({ bands }) {
  console.log(bands);
  return (
    <>
      <Head>
        <title>Welcome to FooFest!</title>
      </Head>
      <div className="bg-index-background bg-no-repeat bg-center bg-cover  bg-blend-screen min-h-screen flex flex-col gap-12">
        <div class="w-3/4 max-w-2xl flex flex-col justify-center m-auto ">
          <Image src={Logo} height={"100%"} width={"100%"}></Image>
          <h1 className="text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl">FOOFEST</h1>
          <h4 className="text-center uppercase text-base sm:text-2xl md:text-3xl lg:text-4xl text-color-white mt-10 leading-10"> Where amazing music meets Scandinavian Serenity in Dancing Lights! </h4>
          {/* <h3 className="text-center uppercase text-base sm:text-2xl md:text-3xl lg:text-4xl text-color-white mt-10 leading-10">Experience the Magic: FooFest - Where Scandinavian Serenity Meets Dancing Northern Lights!</h3> */}
          <Button className="mt-20 rounded-none border-2 border-solid place-self-center border-color-yellow h-10 px-20 text-color-yellow hover:bg-color-yellow hover:text-color-black">
            <Anchor href="/bands">SECURE YOUR TICKETS HERE</Anchor>
          </Button>
        </div>
        <div className="my-10 mx-auto h-0.5 w-4/5 max-w-3/4 bg-color-white"></div>
        <div className="flex flex-col gap-6">
          <h3 className="mb-16 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">EXPERIENCE BANDS SUCH AS:</h3>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-12 md:gap-6 lg:gap-10  justify-center">
            <BandList1 bands={bands} />
          </div>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-12 md:gap-6 lg:gap-10 justify-center">
            <BandList2 bands={bands} />
          </div>
          <div className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-6 lg:gap-10 justify-center">
            <BandList3 bands={bands} />
          </div>
        </div>
        <Button className="mt-8 rounded-none border-2 border-solid place-self-center border-color-yellow h-10 px-20 text-color-yellow hover:bg-color-yellow hover:text-color-black">
          <Anchor href="/program">SEE ALL ARTIST</Anchor>
        </Button>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const api = "http://localhost:8080/bands";
  const res = await fetch(api);
  const data = await res.json();

  return {
    props: {
      bands: data,
    },
  };
}

function BandList1(props) {
  const bandsToShow = props.bands.slice(0, 2);
  return bandsToShow.map((band) => <Band key={band.name} {...band} />);
}
function BandList2(props) {
  const bandsToShow = props.bands.slice(2, 5);
  return bandsToShow.map((band) => <Band2 key={band.name} {...band} />);
}

function BandList3(props) {
  const bandsToShow = props.bands.slice(5, 10);
  return bandsToShow.map((band) => <Band3 key={band.name} {...band} />);
}

function Band(band) {
  return (
    <>
      <h2 className="text-center uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
        <Anchor href={`/bands/${band.slug}`}>{band.name}</Anchor>
      </h2>
    </>
  );
}
function Band2(band) {
  return (
    <>
      <h3 className="text-center uppercase text-lg sm:text-4xl md:text-5xl lg:text-6xl text-color-white">
        <Anchor href={`/bands/${band.slug}`}>{band.name}</Anchor>
      </h3>
    </>
  );
}
function Band3(band) {
  return (
    <>
      <h3 className="text-center uppercase text-base sm:text-2xl md:text-3xl lg:text-4xl text-color-white">
        <Anchor href={`/bands/${band.slug}`}>{band.name}</Anchor>
      </h3>
    </>
  );
}
