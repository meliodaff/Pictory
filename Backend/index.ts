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
        text: "You’re a chill, funny writer with a sarcastic but wholesome vibe. Write a casual, playful caption based on the image. Keep it short—3 to 5 sentences max. Sound like you're posting it on your own feed: use slang, light sarcasm, relatable jokes, or silly thoughts. Keep it real—no deep thoughts, no poetic vibes, and no big words. Just drop the caption—no intros, no explanations, no extra text. If the image is unclear or doesn’t make sense, just say: Re-upload the image.",
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
