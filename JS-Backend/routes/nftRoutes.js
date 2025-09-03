import express from "express";
import { analyzeNFTHandler } from "../controllers/nftController.js";
const router = express.Router();

/**
 * @swagger
 * /api/v1/analyze-nft:
 *   post:
 *     summary: Analyze an NFT
 *     description: Sends NFT metadata to HuggingFace model for rarity, sentiment, prediction, and insights.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               collection:
 *                 type: string
 *               token_id:
 *                 type: string
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     trait_type:
 *                       type: string
 *                     value:
 *                       type: string
 *               floor_price:
 *                 type: number
 *               total_supply:
 *                 type: number
 *     responses:
 *       200:
 *         description: Analysis results
 *       500:
 *         description: Server error
 */

router.post("/analyze-nft", analyzeNFTHandler);
export default router;
