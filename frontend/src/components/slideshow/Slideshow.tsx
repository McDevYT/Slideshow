import { useEffect, useRef, useState } from "react";
import { SERVER_IP } from "../../models/constants";
import "./Slideshow.css";
import { nextImage } from "../../scripts/api";

function Slideshow() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fade, setFade] = useState(true);
  const lastImageRef = useRef<string | null>(null);

  // Preload image and return the full image path
  const preloadImage = (imageName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const fullPath = `${SERVER_IP}/images/${imageName}`;

      img.onload = () => resolve(fullPath);
      img.onerror = reject;
      img.src = fullPath;
    });
  };

  const loadAndFadeNextImage = async () => {
    try {
      const imageName = await nextImage();

      if (!imageName) {
        console.warn("No image returned from nextImage()");
        return;
      }

      const newImageUrl = `${SERVER_IP}/images/${imageName}`;

      if (newImageUrl === lastImageRef.current) {
        console.log("Same image received; skipping fade.");
        setCurrentImage(newImageUrl);
        return;
      }

      await preloadImage(imageName);

      setFade(false);

      setTimeout(() => {
        // Set new image and fade in
        setCurrentImage(newImageUrl);
        setFade(true);
        lastImageRef.current = newImageUrl;
      }, 500);
    } catch (error) {
      console.error("Error loading next image:", error);
    }
  };

  useEffect(() => {
    loadAndFadeNextImage();

    const interval = setInterval(() => {
      loadAndFadeNextImage();
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
