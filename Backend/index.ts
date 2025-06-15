import express from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
const app = express();

dotenv.config();

const port = 3000;
app.use(
  cors({ origin: ["http://localhost:5173", "https://pictory-j.netlify.app"] })
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function imageToStory(file: Express.Multer.File): Promise<string> {
  const base64Image = file.buffer.toString("base64");
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: file.mimetype,
          data: base64Image,
        },
      },
      {
        text: "You are a creative writer skilled in crafting emotionally resonant captions based on images. Write a compelling caption inspired by the content of this image. Keep it concise—between 3 to 5 engaging sentences. The caption should evoke emotion, set a specific mood, or suggest a deeper story behind the image. Avoid generic or literal descriptions. Write as if you personally took or submitted the image, and express the feelings or meaning it holds for you. If you cant understand the image or you are unsure about it, just send `Re upload the image`",
      },
    ],
  });
  if (!response.text) return "It returned falsy value";
  return response.text;
}

app.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "No image uploaded" });
    return;
  }

  console.log(file);

  try {
    const response = await imageToStory(file);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: "An error calling api" });
  }

  //   res.send(response);
});

app.get("/", (req, res) => {
  res.status(200).json("Server for pictory is up");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running at port ${port}`);
});
