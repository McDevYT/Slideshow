import { useDataContext } from "../../models/DataContext";
import Image from "./Image";
import "./ImageList.css";

function ImageList() {
  const { images } = useDataContext();

  return (
    <div>
      <h2>Images</h2>
      <div className="imageList">
        {images.map((image, index) => {
          return <Image key={index} src={image} />;
        })}
      </div>
    </div>
  );
}

export default ImageList;
