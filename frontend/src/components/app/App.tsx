import ImageList from "../image-list/ImageList";
import Navbar from "../navbar/Navbar";
import Queue from "../queue/Queue";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="pageContent">
        <div className="queueAndLoopDiv">
          <Queue />
          <Queue />
        </div>

        <ImageList />
      </div>
    </>
  );
}

export default App;
