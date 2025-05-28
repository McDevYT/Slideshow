import axios from "axios";

export async function getImage() {
  axios
    .get("http://localhost:3141/GetImage")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function postImage(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:3141/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Upload failed:", response.statusText);
      return null;
    }

    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
