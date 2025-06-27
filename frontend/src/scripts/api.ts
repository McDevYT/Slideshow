import axios from "axios";
const ip = "http://109.199.119.222/api";

export async function deleteImage(name: string) {
  try {
    const response = await axios.delete(`${ip}/delete/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    return null;
  }
}

export async function get(element: "images" | "loop" | "queue" = "images") {
  try {
    const response = await axios.get(`${ip}/${element}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${element}:`, error);
    return null;
  }
}

export async function removeImageFromList(
  list: "queue" | "loop",
  imageName: string
): Promise<void> {
  if (!imageName) {
    console.error("Image name is required.");
    return;
  }

  try {
    const response = await fetch(
      `${ip}/${list}/remove/${encodeURIComponent(imageName)}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.text();

    if (response.ok) {
      console.log(data);
    } else {
      console.error(`Failed to remove image from ${list}: ${data}`);
    }
  } catch (error) {
    console.error(`Error removing image from ${list}:`, error);
  }
}

export async function addImageToList(
  list: "queue" | "loop",
  imageName: string
): Promise<void> {
  if (!imageName) {
    console.error("Image name is required.");
    return;
  }

  try {
    const response = await fetch(
      `${ip}/${list}/add/${encodeURIComponent(imageName)}`,
      {
        method: "POST",
      }
    );

    const data = await response.text();

    if (response.ok) {
      console.log(data);
    } else {
      console.error(`Failed to add image to ${list}: ${data}`);
    }
  } catch (error) {
    console.error(`Error adding image to ${list}:`, error);
  }
}

export async function postImage(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${ip}/upload`, {
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

export async function clear(element: "loop" | "queue" = "queue") {
  try {
    const response = await axios.delete(`${ip}/${element}/clear`);
    return response.data;
  } catch (error: any) {
    console.error(
      `Error clearing ${element}:`,
      error.response?.data || error.message
    );
    return null;
  }
}

export async function nextImage(): Promise<string | undefined> {
  try {
    const res = await fetch(`${ip}/images/next`);
    if (res.status === 204) {
      console.error("Error fetching image");
      return;
    }
    const data: { image: string } = await res.json();
    return data.image;
  } catch (err) {
    console.error("Error fetching image:", err);
  }
}
