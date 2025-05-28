import "./List.css";
import ListItem from "./ListItem";

interface ListPropsInterface {
  label: string;
  items: any[];
}

function List(props: ListPropsInterface) {
  return (
    <div className="listContainer">
      <div className="listHeader">
        <h2>{props.label}</h2>
        <button className="listClearButton">Clear</button>
      </div>
      <div className="list">
        {props.items.length <= 0 ? (
          <h3>No Items</h3>
        ) : (
          props.items.map((_item, index) => <ListItem key={index} />)
        )}
      </div>
    </div>
  );
}

export default List;
