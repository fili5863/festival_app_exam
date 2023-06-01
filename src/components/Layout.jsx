import Anchor from "./Anchor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="http://webdesam.dk/test/logoSmall.svg"
        />
      </Head>
      <Navbar />
      <div className="m-auto">{children}</div>
      <Footer />
    </>
  );
}
