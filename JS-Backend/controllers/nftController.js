import { analyzeNFT, analyzePrompt } from "../services/huggingFaceServices.js";

export async function analyzeNFTHandler(req, res) {
  try {
    const { collection, token_id, attributes, floor_price, total_supply } =
      req.body;

    // Basic validation to ensure that collection, token aand the attributes are present
    if (!collection || !token_id || !Array.isArray(attributes)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid request: collection, token_id, and attributes are required",
      });
    }

    const result = await analyzeNFT({
      collection,
      token_id,
      attributes,
      floor_price: floor_price || null,
      total_supply: total_supply || null,
    });

    res.status(200).json({
      success: true,
      analysis: result,
    });
  } catch (error) {
    console.error("NFT Analysis error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
export async function analyzePromptHandler(req, res) {
  try {
    const { prompt } = req.body;
    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: prompt must be a non-empty string",
      });
    }

    const result = await analyzePrompt(prompt);

    // Flatten the response for clients and avoid exposing internal details
    res.status(200).json({
      success: true,
      input: result.input,
      confidence: result.confidence,
      analysis: result.analysis,
    });
  } catch (error) {
    console.error("analyzePromptHandler error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate analysis",
    });
  }
}
