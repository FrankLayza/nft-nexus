import fetch from "node-fetch";

export async function analyzeNFT(input) {
  const HF_URL = "https://router.huggingface.co/v1/chat/completions";
  const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

  const headers = {
    Authorization: `Bearer ${HF_API_KEY}`,
    "Content-Type": "application/json",
  };

  //This is the prompt for the LLM
  const prompt = `
  Analyze the following NFT:
  Collection: ${input.collection}
  Token ID: ${input.token_id}
  Attributes: ${input.attributes
    .map((a) => `${a.trait_type}: ${a.value}`)
    .join(", ")}
  Floor Price: ${input.floor_price} ETH
  Total Supply: ${input.total_supply}

  Please return a JSON object with:
  - rarity_score (number)
  - market_sentiment ("bearish" | "neutral" | "bullish")
  - price_prediction (ETH number)
  - risk_level ("low" | "medium" | "high")
  - recommendation ("buy" | "hold" | "sell")
  - confidence (percentage number)
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
        model: "openai/gpt-oss-20b:fireworks-ai",
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

    // Most HF chat models return text inside choices[0].message.content
    const rawText = data?.choices?.[0]?.message?.content || "";

    //remove markdown
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

    return parsed;
  } catch (error) {
    console.error("Error analyzing NFT:", error);
    throw error;
  }
}
