import express from 'express'
import { analyzeNFTHandler } from '../controllers/nftController'
const router = express.route()

router.post("/analyze-nft", analyzeNFTHandler)