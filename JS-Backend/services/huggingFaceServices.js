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
  try {
    const response = await fetch(HF_URL, {
      headers,
      method: "POST",
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:fireworks-ai",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Error in fetching response", data.error);
    const rawText = data?.choices?.[0]?.message?.content || "";
    const cleanedResponse = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse); // Try to parse the JSON(cleanedResponse) directly
    } catch (e) {
      console.error(
        `Failed to get a response from HuggingFace`,
        cleanedResponse
      );
      parsed = { raw_response: rawText }; // Fallback if it is not a valid JSON
    }
    console.log(parsed);
    return parsed;
  } catch (error) {}
}
