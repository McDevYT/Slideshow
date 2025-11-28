import { useEffect, useRef, useState } from "react";
import { SERVER_IP } from "../../models/constants";
import "./Slideshow.css";
import { nextImage } from "../../scripts/api";
import { isVideo, SLIDESHOW_INTERVAL_MS } from "../../utils/media";

function Slideshow() {
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [currentMediaName, setCurrentMediaName] = useState<string | null>(null);
  const [fade, setFade] = useState(true);
  const lastMediaRef = useRef<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload image and return the full image path
  const preloadImage = (mediaName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fullPath = `${SERVER_IP}/images/${mediaName}`;
      
      if (isVideo(mediaName)) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve(fullPath);
        video.onerror = reject;
        video.src = fullPath;
      } else {
        const img = new Image();
        img.onload = () => resolve(fullPath);
        img.onerror = reject;
        img.src = fullPath;
      }
    });
  };

  const loadAndFadeNextMedia = async () => {
    try {
      const mediaName = await nextImage();

      if (!mediaName) {
        console.warn("No media returned from nextImage()");
        return;
      }

      const newMediaUrl = `${SERVER_IP}/images/${mediaName}`;

      if (newMediaUrl === lastMediaRef.current) {
        console.log("Same media received; skipping fade.");
        setCurrentMedia(newMediaUrl);
        setCurrentMediaName(mediaName);
        return;
      }

      await preloadImage(mediaName);

      setFade(false);

      setTimeout(() => {
        // Set new media and fade in
        setCurrentMedia(newMediaUrl);
        setCurrentMediaName(mediaName);
        setFade(true);
        lastMediaRef.current = newMediaUrl;
      }, 500);
    } catch (error) {
      console.error("Error loading next media:", error);
    }
  };

  // Handle video ended event to advance to next media
  const handleVideoEnded = () => {
    loadAndFadeNextMedia();
  };

  useEffect(() => {
    loadAndFadeNextMedia();

    intervalRef.current = setInterval(() => {
      // Only auto-advance for images, videos advance on end
      if (!currentMediaName || !isVideo(currentMediaName)) {
        loadAndFadeNextMedia();
      }
    }, SLIDESHOW_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Clear interval when video starts playing and restart when image is shown
  useEffect(() => {
    if (currentMediaName && isVideo(currentMediaName)) {
      // For videos, clear the interval - video will advance on end
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else if (!intervalRef.current) {
      // For images, restart the interval if not running
      intervalRef.current = setInterval(() => {
        loadAndFadeNextMedia();
      }, SLIDESHOW_INTERVAL_MS);
    }
  }, [currentMediaName]);

  return (
    <div className="slideshowDiv">
      {currentMedia && currentMediaName && (
        isVideo(currentMediaName) ? (
          <video
            ref={videoRef}
            src={currentMedia}
            className={`slideshowImage ${fade ? "fade-in" : "fade-out"}`}
            autoPlay
            muted
            onEnded={handleVideoEnded}
          />
        ) : (
          <img
            src={currentMedia}
            className={`slideshowImage ${fade ? "fade-in" : "fade-out"}`}
            alt="Slideshow"
          />
        )
      )}
    </div>
  );
}

export default Slideshow;
