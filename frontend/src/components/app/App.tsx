import ImageList from "../image-list/ImageList";
import ElementList from "../List/ElementList";
import Navbar from "../navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="pageContent">
        <div className="queueAndLoopDiv">
          <ElementList label="Queue" items={[]} />
          <ElementList label="Loop" items={["1", "2", "3"]} />
        </div>

        <ImageList />
      </div>
    </>
  );
}

export default App;
