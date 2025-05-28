import axios from "axios";

export async function getImage(name: string) {
  try {
    const response = await axios.get(`http://localhost:3141/images/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export async function get(element: "images" | "loop" | "queue" = "images") {
  try {
    const response = await axios.get(`http://localhost:3141/${element}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${element}:`, error);
    return null;
  }
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
