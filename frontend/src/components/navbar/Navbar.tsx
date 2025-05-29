import "./Navbar.css";
import { Upload, RefreshCw } from "lucide-react";
import { useDataContext } from "../../models/DataContext";
import IconButton from "../icon-button/IconButton";

function Navbar() {
  const { setIsPopupOpen, fetchData } = useDataContext();

  return (
    <div className="navbar">
      <h1>Slideshow</h1>
      <div className="navbarButtonDiv">
        <IconButton
          onClick={() => {
            fetchData();
          }}
          icon={<RefreshCw />}
        />
        <IconButton
          onClick={() => {
            setIsPopupOpen(true);
          }}
          icon={<Upload />}
        />
      </div>
    </div>
  );
}

export default Navbar;
