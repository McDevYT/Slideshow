function ListItem(props: { src: string }) {
  return (
    <div className="listItem">
      <img src={props.src} className="listImage" />
      <div className="listItemButtonHolder">
        <button className="listItemButton">Remove</button>
      </div>
    </div>
  );
}

export default ListItem;
