function ListItem() {
  return (
    <div className="listItem">
      <img src="https://placehold.co/600x400" className="listImage" />
      <div className="listItemButtonHolder">
        <button className="listItemButton">Remove</button>
      </div>
    </div>
  );
}

export default ListItem;
