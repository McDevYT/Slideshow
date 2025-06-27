import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

let loopIndex = 0;

const lists: Record<"queue" | "loop", string[]> = {
  queue: [],
  loop: [],
};

app.use(
  cors({
    origin: "*",
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

app.post("/api/upload", upload.single("image"), (req, res): void => {
  const file = req.file;
  if (!file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  res.json({ url: `/images/${file.filename}` });
});

app.get("/api/images", (req, res) => {
  const imagesDir = path.join(__dirname, "../public/images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error("Error reading image directory:", err);
      return res.status(500).json({ error: "Failed to list images." });
    }

    const urls = files;
    res.json(urls);
  });
});

app.get("/api/images/next", (req: Request, res: Response) => {
  if (lists.queue.length > 0) {
    const nextImage = lists.queue.shift()!;
    res.json({ image: nextImage });
    return;
  }

  if (lists.loop.length > 0) {
    loopIndex = (loopIndex + 1) % lists.loop.length;
    const nextImage = lists.loop[loopIndex];

    res.json({ image: nextImage });
    return;
  }

  const imagesDir = path.join(__dirname, "../public/images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error("Error reading image directory:", err);
      return res.status(500).json({ error: "Failed to read images." });
    }

    if (files.length === 0) {
      return res.status(204).json({ image: undefined });
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomImage = files[randomIndex];
    res.json({ image: randomImage });
    return;
  });
});

app.get("/api/:list", (req, res) => {
  const list = req.params.list;
  if (list !== "queue" && list !== "loop") {
    res.status(400).send("Invalid list name.");
    return;
  }
  const urls = lists[list];
  res.json(urls);
});

app.delete("/api/:list/clear", (req, res) => {
  const list = req.params.list;
  if (list !== "queue" && list !== "loop") {
    res.status(400).send("Invalid list name.");
    return;
  }
  lists[list].length = 0;
  res.send(`${list} cleared!`);
});

app.post("/api/:list/add/:image", (req, res) => {
  const list = req.params.list;
  if (list !== "queue" && list !== "loop") {
    res.status(400).send("Invalid list name.");
    return;
  }
  const image = req.params.image;
  const arr = lists[list];
  if (!arr.includes(image)) {
    arr.push(image);
    res.send(`${image} added to ${list}`);
  } else {
    res.send(`${image} not found or already is in ${list}`);
  }
});

app.delete("/api/:list/remove/:image", (req, res) => {
  const list = req.params.list;
  if (list !== "queue" && list !== "loop") {
    res.status(400).send("Invalid list name.");
    return;
  }
  const image = req.params.image;
  const arr = lists[list];
  const index = arr.indexOf(image);
  if (index !== -1) {
    arr.splice(index, 1);
    res.send(`${image} removed from ${list}`);
  } else {
    res.send(`${image} not found in ${list}`);
  }
});

app.delete("v/delete/:image", (req: Request, res: Response) => {
  const imageName = req.params.image;
  const imagePath = path.join(__dirname, "../public/images", imageName);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "Image not found." });
    }

    fs.unlink(imagePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting image:", unlinkErr);
        return res.status(500).json({ error: "Failed to delete image." });
      }

      ["queue", "loop"].forEach((list) => {
        const index = lists[list as "queue" | "loop"].indexOf(imageName);
        if (index !== -1) {
          lists[list as "queue" | "loop"].splice(index, 1);
        }
      });

      res.json({ message: `${imageName} deleted successfully.` });
    });
  });
});

app.use("/api/images", express.static("public/images"));

app.listen(3141, () => {
  console.log(`Server is running on http://109.199.119.222:3141`);
});
