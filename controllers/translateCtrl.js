import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// --- Translation logic ---
async function translateText(text, sourceLang, targetLang) {
  const model = `Helsinki-NLP/opus-mt-${sourceLang}-${targetLang}`;
  const url = `https://api-inference.huggingface.co/models/${model}`;

  console.log("=== Translation Request ===");
  console.log("Text:", text);
  console.log("Source:", sourceLang, "Target:", targetLang);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: text })
  });

  const result = await response.json();

  if (response.status !== 200) {
    throw new Error(result.error || "Translation failed");
  }

  return result[0]?.translation_text || "";
}

// --- Gemini API check ---
async function isDoctorPatientConvo(text) {
  const prompt = `Analyze the following text to determine if it is related to health, medicine, or a doctor-patient consultation.

- If the text contains any symptom, illness, treatment, medical term, or general health discussion, mark is_convo: true.
- If not, mark is_convo: false.
- Always correct spelling mistakes but do not change grammar or meaning.

Return JSON with: is_convo, reason, corrected_text.

Text:
"${text}"`;

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          is_convo: { type: "BOOLEAN" },
          reason: { type: "STRING" },
          corrected_text: { type: "STRING" }
        },
        propertyOrdering: ["is_convo", "reason", "corrected_text"]
      }
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0) {
      const jsonText = result.candidates[0].content.parts[0].text;
      const parsedJson = JSON.parse(jsonText);
      console.log("Gemini Response:", parsedJson);

      // Looser fallback: default true unless explicitly false
      return parsedJson.is_convo !== false;
    } else {
      console.error("Gemini returned unexpected:", result);
      return true; // allow translation anyway
    }
  } catch (err) {
    console.error("Error calling Gemini:", err.message);
    return true; // fallback: don’t block translation
  }
}

// --- Controller ---
export async function handleTranslate(req, res) {
  const { text, sourceLang, targetLang } = req.body;

  console.log("=== Controller Hit ===");
  console.log("Body:", req.body);

  try {
    const isConvo = await isDoctorPatientConvo(text);

    if (!isConvo) {
      throw new Error("Text is not a valid doctor-patient conversation. Please provide context relevant to a medical consultation.");
    }

    const translatedText = await translateText(text, sourceLang, targetLang);
    console.log("Translated:", translatedText);

    res.json({ translatedText });
  } catch (err) {
    console.error("=== Error ===");
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
}
