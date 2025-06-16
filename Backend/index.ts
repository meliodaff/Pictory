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
        text: "You are a creative writer with a deep sensitivity to emotion and storytelling. Write a powerful, emotionally resonant caption inspired by the image provided. Keep it short—no more than 3 to 5 sentences. The caption should capture a mood, hint at a deeper story, or stir reflection—avoid literal or generic descriptions. Write from a personal perspective, as if you took or submitted the photo, and share the feelings or meaning it holds for you. Use simple, common, natural language. If the image is unclear or unrecognizable, respond only with: Re-upload the image.",
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
