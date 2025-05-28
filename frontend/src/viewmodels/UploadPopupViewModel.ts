import { postImage } from "../scripts/api";

interface useUploadPopupViewModelReturn {
  uploadImage: (image: File) => void;
}

export function useUploadPopupViewModel(): useUploadPopupViewModelReturn {
  const uploadImage = (image: File) => {
    postImage(image).then((url) => {
      if (url) {
        console.log("Uploaded image URL:", url);
      } else {
        console.log("Upload failed.");
      }
    });
  };
  return { uploadImage };
}

export default useUploadPopupViewModel;
