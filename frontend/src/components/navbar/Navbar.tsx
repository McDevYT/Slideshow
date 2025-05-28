import "./Navbar.css";
import { Upload } from "lucide-react";
import { useDataContext } from "../../models/DataContext";

function Navbar() {
  const { setIsPopupOpen } = useDataContext();

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
