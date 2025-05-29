import { SERVER_IP } from "../../models/constants";
import "./List.css";
import ListItem from "./ListItem";

interface ListPropsInterface {
  label: string;
  items: string[];
  onClear: () => void;
  onRemoveElement: (_item: string) => void;
}

function List(props: ListPropsInterface) {
  return (
    <div className="listContainer">
      <div className="listHeader">
        <h2>{props.label}</h2>
        <button
          className="listClearButton"
          onClick={() => {
            props.onClear();
          }}
        >
          Clear
        </button>
      </div>
      <div className="list">
        {props.items.length <= 0 ? (
          <h3>No Items</h3>
        ) : (
          props.items.map((item, index) => (
            <ListItem
              onRemove={() => {
                props.onRemoveElement(item);
              }}
              key={index}
              src={SERVER_IP + "/images/" + item}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default List;
