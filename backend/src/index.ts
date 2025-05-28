import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 3141;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
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

app.use("/images", express.static("uploads/images"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
