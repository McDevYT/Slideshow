import useMainViewModel from "../../viewmodels/MainViewModel";
import ImageList from "../image-list/ImageList";
import ElementList from "../List/ElementList";
import Navbar from "../navbar/Navbar";
import "./App.css";
import UploadPopup from "../upload-popup/UploadPopup";
import { useDataContext } from "../../models/DataContext";

function App() {
  useMainViewModel();

  const { isPopupOpen, setIsPopupOpen, loop, queue } = useDataContext();

  return (
    <>
      <Navbar />
      <div className="pageContent">
        <div className="queueAndLoopDiv">
          <ElementList label="Queue" items={queue} />
          <ElementList label="Loop" items={loop} />
        </div>

        <ImageList />
      </div>
      <UploadPopup
        isVisible={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}

export default App;
