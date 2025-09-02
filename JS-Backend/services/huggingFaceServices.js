import fetch from "node-fetch";

export async function analyzeNFT(attributes) {
  const HF_URL = "https://router.huggingface.co/v1/chat/completions";
  const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

  //used the inference endpoint provider example for the header
  const header = {
    Authorization: `Bearer ${HF_API_KEY}`,
    "Content-Type": "application/json",
  };



  //the 2 in line 27 is for indentation for the returned json
  try {
    const response = await fetch(HF_URL, {
      headers: header,
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Analyze the following NFT attributes and return rarity, market sentiment, price prediction, risk level, recommendation, confidence, and insights in JSON format:\n\n${JSON.stringify(
              attributes,
              null,
              2
            )}`,
          },
        ],
        model: "openai/gpt-oss-20b:fireworks-ai",
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("HF API error details:", data);
      throw new Error(`HF API error: ${data.error || response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
