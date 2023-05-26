import "@/styles/globals.css";
import Layout from "@/components/Layout";
import App from "next/app";
import { Playfair_Display } from "next/font/google";
import { StyledEngineProvider } from "@mui/material/styles";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function MyApp({ Component, pageProps, bandData }) {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Layout bandData={bandData}>
          <main className={`${playfairDisplay.variable} font-serif`}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </StyledEngineProvider>
    </>
  );
}
