import { useEffect, useState } from "react";
import { SERVER_IP } from "../../models/constants";
import "./Slideshow.css";
import { nextImage } from "../../scripts/api";

function Slideshow() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fade, setFade] = useState(true);

  const loadNextImage = async () => {
    try {
      const image = await nextImage();
      console.log("Fetched image:", image);
      setCurrentImage(
        image ? SERVER_IP + "/images/" + image : "../../public/500.jpg"
      );
    } catch (error) {
      console.error("Error fetching next image:", error);
    }
  };

  useEffect(() => {
    loadNextImage();

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        loadNextImage();
        setFade(true);
      }, 500);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshowDiv">
      {currentImage && (
        <img
          src={currentImage}
          className={`slideshowImage ${fade ? "fade-in" : "fade-out"}`}
          alt="Slideshow"
        />
      )}
    </div>
  );
}

export default Slideshow;
