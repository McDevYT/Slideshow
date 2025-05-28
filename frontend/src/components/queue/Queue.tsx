import "./Queue.css";
import QueueItem from "./QueueItem";

function Queue() {
  return (
    <div className="queueContainer">
      <h2>Queue</h2>
      <div className="queue">
        <QueueItem />
        <QueueItem />
        <QueueItem />
      </div>
    </div>
  );
}

export default Queue;
