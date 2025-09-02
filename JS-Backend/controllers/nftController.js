import { analyzeNFT } from "../services/huggingFaceServices";

export async function analyzeNFTHandler(req, res) {
  try {
    const data = req.body;
    const result = await analyzeNFT(data);

    res.status(200).json({
      success: true,
      analysis: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
