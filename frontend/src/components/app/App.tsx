import Navbar from "../navbar/Navbar"
import Queue from "../queue/Queue"
import "./App.css"

function App() {
    return (
    <>
      <Navbar/>
      <div className="pageContent">
        <div className="queueAndLoopDiv">
          <Queue/>
          <Queue/>
        </div>
      </div>
    </>
  )
}

export default App
