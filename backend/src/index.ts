import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3141;

const queue: string[] = ["1748434857398.png"];
const loop: string[] = ["1748434857398.png"];

app.use(
  cors({
    origin: "http://localhost:5173",
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

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res): void => {
  const file = req.file;
  if (!file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  res.json({ url: `/images/${file.filename}` });
});

app.get("/images", (req, res) => {
  const imagesDir = path.join(__dirname, "../public/images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error("Error reading image directory:", err);
      return res.status(500).json({ error: "Failed to list images." });
    }

    const urls = files.map((filename) => `/images/${filename}`);
    res.json(urls);
  });
});

app.get("/queue", (req, res) => {
  const urls = queue.map((filename) => `/images/${filename}`);
  res.json(urls);
});

app.get("/loop", (req, res) => {
  const urls = loop.map((filename) => `/images/${filename}`);
  res.json(urls);
});

app.post("/loop/add/:image", (req, res) => {
  const image = req.params.image;
  const index = loop.indexOf(image);
  if (index == -1) {
    loop.push(image);
    res.send(image + " added to loop");
  } else {
    res.send(image + " not found or already is in loop");
  }
});

app.delete("/loop/remove/:image", (req, res) => {
  const image = req.params.image;
  const index = loop.indexOf(image);
  if (index !== -1) {
    loop.splice(index, 1);
    res.send(image + " removed from loop");
  } else {
    res.send(image + " not found in loop");
  }
});

app.use("/images", express.static("public/images"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
