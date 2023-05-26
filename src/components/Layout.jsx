import Anchor from "./Anchor";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="m-auto">{children}</div>
      <Footer />
    </>
  );
}
