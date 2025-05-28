import { createContext, useState } from "react";
import useMainViewModel from "../../viewmodels/MainViewModel";
import ImageList from "../image-list/ImageList";
import ElementList from "../List/ElementList";
import Navbar from "../navbar/Navbar";
import "./App.css";
import UploadPopup from "../upload-popup/UploadPopup";

interface AppContext {
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const context = createContext<AppContext>({
  isPopupOpen: false,
  setIsPopupOpen: () => {},
});

function App() {
  useMainViewModel();

  const [isPopupOpen, setIsPopupOpen] = useState(true);

  return (
    <context.Provider value={{ isPopupOpen, setIsPopupOpen }}>
      <Navbar />
      <div className="pageContent">
        <div className="queueAndLoopDiv">
          <ElementList label="Queue" items={["1", "2", "3"]} />
          <ElementList label="Loop" items={["1", "2", "3"]} />
        </div>

        <ImageList />
      </div>
      <UploadPopup
        isVisible={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </context.Provider>
  );
}

export default App;
