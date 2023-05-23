import "@/styles/globals.css";
import Layout from "@/components/Layout";
import App from "next/app";
import { Josefin_Sans } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function MyApp({ Component, pageProps, bandData }) {
  return (
    <>
      <Layout bandData={bandData}>
        <main className={`${josefinSans.variable} font-sans ${playfairDisplay.variable} font-serif  `}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}
