import {
  Bot,
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Badge from "./ui/Badge";
import Separator from "./ui/Separator";
import Progress from "./ui/Progress";
import { useFilter } from "../contexts/FilterContext";
import { juliaOSService } from "../services/juliaOSService";
import type {
  NFTAnalysisResult,
  NFTAnalysisInput,
} from "../services/juliaOSService";

const AgentPanel = () => {
  const { selectedNFT, increment } = useFilter();
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] =
    useState<NFTAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sanitizing the nft attributes before passing data to julia
  function sanitizeAttributes(
    attributes: any[]
  ): { trait_type: string; value: string }[] {
    return attributes
      .filter(
        (attr) =>
          attr &&
          typeof attr.trait_type === "string" &&
          attr.trait_type.trim() !== "" &&
          attr.value !== null &&
          attr.value !== undefined &&
          attr.value !== "Calculation in progress..."
      )
      .map((attr) => ({
        trait_type: String(attr.trait_type).trim(),
        value: String(attr.value).trim(),
      }));
  }

  const analyzeNFTWithAgent = async () => {
    if (!selectedNFT) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Prepare the input for the JuliaOS agent with enhanced NFT data
      const input: NFTAnalysisInput = {
        collection: selectedNFT.collection || "Unknown Collection",
        token_id: selectedNFT.tokenId || selectedNFT.name || "Unknown",
        attributes: sanitizeAttributes(selectedNFT.attributes || []),
        floor_price: selectedNFT.floorPrice || 0,
        total_supply: selectedNFT.totalSupply || 10000,
      };

      console.log("Sending NFT data to JuliaOS agent:", input);

      // Call the JuliaOS agent
      const result = await juliaOSService.analyzeNFT(input);
      setAnalysisResult(result);

      console.log("JuliaOS agent analysis result:", result);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-fit rounded-lg border border-gray-300 bg-white">
      <div className="flex flex-col py-6 px-4 pb-3 items-center">
        <div className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-md font-semibold leading-none tracking-tight">
            AI Agent Analysis
          </span>
        </div>
        {selectedNFT ? (
          <div className="w-full">
            <div className="py-4 w-full space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={selectedNFT.image}
                  alt=""
                  className="w-12 h-12 object-cover object-center rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{selectedNFT.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedNFT.collection || "Unknown Collection"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  analyzeNFTWithAgent();
                  increment();
                }}
                disabled={isAnalyzing}
                className="btn btn-neutral text-white w-full disabled:pointer-events-none"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing with JuliaOS Agent...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Run AI Analysis
                  </>
                )}
              </button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Analysis Error</span>
                  </div>
                  <p className="text-xs text-red-700 mt-1">{error}</p>
                </div>
              )}
            </div>
            {analysisResult && (
              <div>
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Recommendation</span>
                    <Badge
                      className={`${
                        analysisResult?.recommendation === "BUY"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : analysisResult?.recommendation === "SELL"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      } `}
                    >
                      {analysisResult?.recommendation || "ANALYZING"}
                    </Badge>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className="text-sm text-gray-600">
                        {analysisResult?.confidence || 0}%
                      </span>
                    </div>
                    <Progress
                      value={analysisResult?.confidence?.toString() || "0"}
                      max="100"
                      className="progress-neutral"
                    ></Progress>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Price Target</p>
                      <p className="font-bold text-green-600 text-sm">
                        {analysisResult?.price_prediction.toFixed(2) || "0"} ETH
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Risk Level</p>
                      <p className="font-semibold capitalize">
                        {analysisResult?.risk_level || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 w-full">
                  <h4 className="font-medium text-sm">Market Insights</h4>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-600">Sentiment</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp
                        className={`w-4 h-4 ${
                          analysisResult?.market_sentiment === "bullish"
                            ? "text-green-500"
                            : analysisResult?.market_sentiment === "bearish"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      />
                      <span
                        className={`capitalize ${
                          analysisResult?.market_sentiment === "bullish"
                            ? "text-green-600"
                            : analysisResult?.market_sentiment === "bearish"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {analysisResult?.market_sentiment || "Analyzing"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-sm">
                    <span className="text-gray-600">Collection</span>
                    <span className="font-medium text-xs">
                      {analysisResult?.collection || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-sm">
                    <span className="text-gray-600">Token ID</span>
                    <span className="font-medium">
                      {analysisResult?.token_id || "Unknown"}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 w-full">
                  <h4 className="font-medium text-sm">AI Insights</h4>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-600">Rarity Score</span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="text-purple-600">
                        {analysisResult?.rarity_score || 0}/10
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-sm">
                    <span className="text-gray-600">Market Prediction</span>
                    <Badge
                      className={`${
                        analysisResult?.market_sentiment === "bullish"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : analysisResult?.market_sentiment === "bearish"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }`}
                    >
                      {analysisResult?.market_sentiment === "bullish"
                        ? "+20%"
                        : analysisResult?.market_sentiment === "bearish"
                        ? "-20%"
                        : "0%"}
                    </Badge>
                  </div>
                  {analysisResult?.insights && (
                    <div className="space-y-1 pt-2">
                      {analysisResult.insights.map((insight, index) => (
                        <div
                          key={index}
                          className="text-xs text-gray-600 bg-gray-50 p-2 rounded"
                        >
                          {insight}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {analysisResult?.risk_level === "high" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg w-full my-4">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Risk Alert</span>
                    </div>
                    <p className="text-xs text-red-700 mt-1">
                      This NFT has been flagged as high risk. Exercise caution.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Select an NFT to get AI-powered insights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentPanel;
