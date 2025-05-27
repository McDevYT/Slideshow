import Image from "./Image";
import "./ImageList.css";

function ImageList() {
  return (
    <div>
      <h2>Images</h2>
      <div className="imageList">
        <Image />
        <Image />
        <Image />
        <Image />
      </div>
    </div>
  );
}

export default ImageList;
