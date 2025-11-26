const express = require("express");
const router = express.Router();
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Extract a JSON array from Gemini text safely.
 */
function extractJsonArray(text) {
  if (!text) return null;
  text = text.trim();

  // if it's already pure JSON array
  if (text.startsWith("[") && text.endsWith("]")) {
    try {
      return JSON.parse(text);
    } catch {
      // fall through to substring search
    }
  }

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");

  if (start === -1 || end === -1 || end <= start) return null;

  const jsonSlice = text.slice(start, end + 1);
  try {
    return JSON.parse(jsonSlice);
  } catch {
    return null;
  }
}

/**
 * POST /api/upload/image
 * Uses Gemini Vision to analyze the dish and return up to 4 ingredients.
 */
router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on server" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const base64Image = req.file.buffer.toString("base64");

    const prompt = `
Analyze this food image or ingredient carefully.
Return ONLY a pure JSON array of ALL the significant INGREDIENTS directly present in the dish or ingredients that you recognize with probability > 30%.

Rules:
- Output MUST be valid JSON.
- Output must be an array only.
- No explanations.
- No markdown.
- No extra text.
- Ingredient names must be lowercase.

Example output:
["tomato", "cheese", "garlic", "basil"]
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: req.file.mimetype || "image/jpeg",
        },
      },
    ]);

    const rawText = result.response.text().trim();
    console.log("[Gemini RAW]:", rawText);

    let ingredients = extractJsonArray(rawText);

    if (!ingredients || !Array.isArray(ingredients)) {
      console.error("JSON parse error from Gemini. Raw:", rawText);
      return res
        .status(500)
        .json({ error: "Gemini returned invalid JSON array", raw: rawText });
    }

    // Normalize: lowercase strings, remove empties, max 4 items
    ingredients = ingredients
      .map((i) => (typeof i === "string" ? i.toLowerCase().trim() : ""))
      .filter((i) => i)
      .slice(0, 4);

    console.log("[Gemini Ingredients]:", ingredients);

    return res.json({ ingredients });
  } catch (error) {
    console.error("Gemini Vision error:", error?.message || error);
    if (error.response) {
      console.error("Gemini HTTP error data:", error.response.data);
    }
    return res
      .status(500)
      .json({ error: "Gemini Vision failed", details: error?.message || String(error) });
  }
});

module.exports = router;
