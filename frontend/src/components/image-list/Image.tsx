import { Download, ListEnd, Repeat, Trash } from "lucide-react";
import { useConfirm } from "../comfirmation-popup/useConfirm";
import IconButton from "../icon-button/IconButton";
import { addImageToList, deleteImage } from "../../scripts/api";
import { useDataContext } from "../../models/DataContext";

function isVideo(filename: string): boolean {
  return filename.toLowerCase().endsWith('.mp4');
}

function Image(props: { src: string; image: string }) {
  const { confirm, Confirm } = useConfirm();
  const { fetchData } = useDataContext();
  const handleDelete = async () => {
    const result = await confirm(
      "Delete Item",
      "Are you sure you want to delete this?"
    );
    if (result) {
      deleteImage(props.image).then(() => {
        fetchData();
      });
    } else {
      console.log("Cancelled");
    }
  };

  function downloadImageFromSrc(src: string, filename: string): void {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch file.");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
      });
  }

  return (
    <div className="imageElement">
      {isVideo(props.image) ? (
        <video className="image" src={props.src} muted />
      ) : (
        <img className="image" src={props.src} />
      )}
      <div className="controls">
        <IconButton
          className="controlButton"
          color="var(--color-button)"
          onClick={() => {
            addImageToList("queue", props.image).then(() => {
              fetchData();
            });
          }}
          icon={<ListEnd />}
        />
        <IconButton
          className="controlButton"
          color="var(--color-button)"
          onClick={() => {
            addImageToList("loop", props.image).then(() => {
              fetchData();
            });
          }}
          icon={<Repeat />}
        />
        <IconButton
          className="controlButton"
          color="var(--color-button)"
          onClick={() => {
            downloadImageFromSrc(props.src, props.image);
          }}
          icon={<Download />}
        />
        <IconButton
          className="controlButton"
          color="var(--color-secondary)"
          onClick={handleDelete}
          icon={<Trash />}
        />
      </div>
      {Confirm}
    </div>
  );
}

export default Image;
