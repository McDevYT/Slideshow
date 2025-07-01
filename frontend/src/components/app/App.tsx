import useMainViewModel from "../../viewmodels/MainViewModel";
import ImageList from "../image-list/ImageList";
import ElementList from "../List/ElementList";
import Navbar from "../navbar/Navbar";
import "./App.css";
import UploadPopup from "../upload-popup/UploadPopup";
import { useDataContext } from "../../models/DataContext";
import { removeImageFromList } from "../../scripts/api";

function App() {
  useMainViewModel();

  const { isPopupOpen, setIsPopupOpen, loop, queue, clear, fetchData } =
    useDataContext();
  return (
    <>
      <Navbar />
      <div className="pageContent">
        <div className="queueAndLoopDiv">
          <ElementList
            label="Queue"
            items={queue}
            onClear={() => {
              clear("queue").then(() => {
                fetchData();
              });
            }}
            onRemoveElement={(image) => {
              removeImageFromList("queue", image).then(() => {
                fetchData();
              });
            }}
          />
          <ElementList
            label="Loop"
            items={loop}
            onClear={() => {
              clear("loop").then(() => {
                fetchData();
              });
            }}
            onRemoveElement={(image) => {
              removeImageFromList("loop", image).then(() => {
                console.log("Remove Image From Loop");
                fetchData();
              });
            }}
          />
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
