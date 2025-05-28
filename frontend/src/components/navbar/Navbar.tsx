import { useContext } from "react";
import "./Navbar.css";
import { Upload } from "lucide-react";
import { context } from "../app/App";

function Navbar() {
  const { setIsPopupOpen } = useContext(context);

  return (
    <div className="navbar">
      <h1>Slideshow</h1>
      <button
        className="uploadButton"
        onClick={() => {
          setIsPopupOpen(true);
        }}
      >
        <Upload />
      </button>
    </div>
  );
}

export default Navbar;
