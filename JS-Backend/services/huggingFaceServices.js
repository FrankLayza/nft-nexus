import fetch from "node-fetch";

export async function analyzeNFT(input) {
  const HF_URL = "https://router.huggingface.co/v1/chat/completions";
  const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
  const headers = {
    Authorization: `Bearer ${HF_API_KEY}`,
    "Content-Type": "application/json",
  };

  const prompt = `
  Analyze the following NFT:
  Collection: ${input.collection}
  Token ID: ${input.token_id}
  Attributes: ${input.attributes
    .map((a) => `${a.trait_type}: ${a.value}`)
    .join(", ")}
  Floor Price: ${input.floor_price} ETH
  Total Supply: ${input.total_supply}

  Return **only** a valid JSON object (no extra text, explanations, or Markdown) with:
  - rarity_score (number, 0-10)
  - market_sentiment ("bearish" | "neutral" | "bullish")
  - price_prediction (number, ETH)
  - risk_level ("low" | "medium" | "high")
  - recommendation ("buy" | "hold" | "sell")
  - confidence (number, percentage)
  - insights (array of strings)
  `;

  try {
    if (!HF_API_KEY) {
      throw new Error("Hugging Face API key is missing");
    }
    const response = await fetch(HF_URL, {
      headers,
      method: "POST",
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-R1:novita",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("HF API error details:", data);
      throw new Error(`HF API error: ${data.error || response.statusText}`);
    }

    // Get raw text from LLM response
    const rawText = data?.choices?.[0]?.message?.content || "";

    // Improved cleaning: Remove <think> block and extract JSON
    const jsonMatch = rawText.match(/{[\s\S]*}/); // Match the JSON object
    if (!jsonMatch) {
      console.error("No valid JSON found in response:", rawText);
      throw new Error("No valid JSON object in LLM response");
    }
    const cleanedResponse = jsonMatch[0].trim(); // Extract just the JSON

    // Parse the cleaned JSON string
    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (e) {
      console.error("Failed to parse JSON from HuggingFace:", cleanedResponse);
      throw new Error("Invalid JSON response from LLM");
    }

    // Validate required fields
    const requiredFields = [
      "rarity_score",
      "market_sentiment",
      "price_prediction",
      "risk_level",
      "recommendation",
      "confidence",
      "insights",
    ];
    const missingFields = requiredFields.filter((field) => !(field in parsed));
    if (missingFields.length > 0) {
      console.error("Missing required fields in JSON:", missingFields);
      throw new Error(
        `Invalid JSON structure: missing fields ${missingFields.join(", ")}`
      );
    }

    return parsed; // Return parsed object
  } catch (error) {
    console.error("Error analyzing NFT:", error);
    throw error;
  }
}

export async function analyzePrompt(input) {
  const HF_URL = "https://router.huggingface.co/v1/chat/completions";
  const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
  if (!HF_API_KEY) {
    throw new Error("Hugging Face API key is missing");
  }

  const headers = {
    Authorization: `Bearer ${HF_API_KEY}`,
    "Content-Type": "application/json",
  };

  // Provide an explicit schema and small example to encourage a clean JSON-only reply
  const prompt = `Perform a DYOR (Do Your Own Research) analysis on the following user input.

User input:
${String(input)}

Return ONLY a single valid JSON object (no extra text or markdown) with this structure:
{
  "input": "<original input as string>",
  "confidence": <number 0-100>,
  "analysis": "<detailed summary, pros/cons, key insights, and recommendations>"
}

Example:
{
  "input": "CoolNFT collection",
  "confidence": 78,
  "analysis": "Summary here..."
}
`;

  try {
    const response = await fetch(HF_URL, {
      headers,
      method: "POST",
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:fireworks-ai",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that outputs strict JSON when asked.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("HF API error details:", data);
      throw new Error(`HF API error: ${data.error || response.statusText}`);
    }

    const rawText = data?.choices?.[0]?.message?.content || "";

    // Try to extract the first JSON object from the model response
    const jsonMatch = rawText.match(/{[\s\S]*}/);
    const cleanedResponse = jsonMatch
      ? jsonMatch[0].trim()
      : rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (e) {
      console.error(
        "Failed to parse JSON from HuggingFace response:",
        cleanedResponse
      );
      throw new Error("Invalid JSON response from LLM");
    }

    // Validate expected fields and types
    const missing = [];
    if (!("input" in parsed)) missing.push("input");
    if (!("confidence" in parsed)) missing.push("confidence");
    if (!("analysis" in parsed)) missing.push("analysis");

    if (missing.length) {
      console.error(
        "Missing required fields in JSON:",
        missing,
        "parsed:",
        parsed
      );
      throw new Error(
        `Invalid JSON structure: missing fields ${missing.join(", ")}`
      );
    }

    if (typeof parsed.input !== "string") {
      throw new Error("Invalid type: input must be a string");
    }
    if (typeof parsed.analysis !== "string") {
      throw new Error("Invalid type: analysis must be a string");
    }
    if (typeof parsed.confidence !== "number") {
      // allow numeric strings that can be coerced
      const coerced = Number(parsed.confidence);
      if (!Number.isFinite(coerced)) {
        throw new Error("Invalid type: confidence must be a number");
      }
      parsed.confidence = coerced;
    }

    // Clamp confidence between 0-100
    parsed.confidence = Math.max(0, Math.min(100, parsed.confidence));

    return parsed;
  } catch (error) {
    console.error("Error generating analysis", error);
    throw error;
  }
}
