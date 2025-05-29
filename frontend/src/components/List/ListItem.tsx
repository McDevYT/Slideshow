function ListItem(props: { src: string; onRemove: () => void }) {
  return (
    <div className="listItem">
      <img src={props.src} className="listImage" />
      <div className="listItemButtonHolder">
        <button className="listItemButton" onClick={props.onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default ListItem;
