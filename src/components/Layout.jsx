import Anchor from "./Anchor";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="m-auto">
        {children}
        <footer>Footer</footer>
      </div>
    </>
  );
}
