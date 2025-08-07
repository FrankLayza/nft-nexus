import { useState } from "react";
import Badge from "./ui/Badge";
import { Brain } from "lucide-react";
import { juliaOSService } from "../services/juliaOSService";

const DYORPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [confidence, setConfidence] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  //   const dummyResponse = [
  //     "Based on my analysis, this NFT collection shows strong fundamentals with a growing community of 15K+ holders. The floor price has increased 23% over the last 30 days, indicating healthy demand. Key traits to watch: rare backgrounds (2% occurrence) and legendary accessories (0.5% occurrence). Market sentiment is bullish with increasing social media mentions.",
  //     "The Bored Ape Yacht Club (BAYC) is a highly sought-after NFT collection with a strong community and brand. The floor price has consistently remained above 50 ETH, indicating high demand. Key traits include unique fur colors (1% occurrence) and rare clothing items (0.2% occurrence). Market sentiment is extremely positive with BAYC being featured in major media outlets and collaborations with top brands.",
  //     "Azuki NFTs have gained significant traction with a dedicated community of 20K+ holders. The floor price has seen a steady increase of 15% over the past month. Key traits to look for include rare hair colors (3% occurrence) and unique accessories (1% occurrence). Market sentiment is optimistic, with many collectors expressing confidence in Azuki's long-term value.",
  //   ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">NEXUS AI</h1>
        <p className="text-muted-foreground">
          Do Your Own Research with our AI-powered insights.
        </p>
      </div>
      <div className="w-full h-fit rounded-lg border border-gray-300 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-semibold leading-none tracking-tight">
            AI Research Assistant
          </span>
          <span className="text-sm text-gray-500">
            Ask questions about NFT projects and market trends
          </span>
        </div>
        <div className="space-y-4 w-full mt-6">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Ask me anything about NFTs, collections, or market trends... (e.g., 'What do you think about Bored Ape Yacht Club?' or 'Should I invest in Azuki NFTs?')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
          <button
            disabled={!prompt.trim() || isAnalyzing}
            onClick={async () => {
              setIsAnalyzing(true);
              setResponse("");
              setConfidence(null);
              setDuration(null);

              try {
                const start = Date.now();
                const result = await juliaOSService.analyzePrompt(prompt);

                const elapsed = (Date.now() - start) / 1000;
                setResponse(result.analysis);
                setConfidence(result.confidence);
                setDuration(elapsed);
              } catch (err: any) {
                setResponse("Failed to get analysis. Please try again later.");
              } finally {
                setIsAnalyzing(false);
              }
            }}
            className="btn btn-neutral"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Analyze with AI
              </>
            )}
          </button>

          {response && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-lg flex items-center gap-2 font-semibold">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Analysis Results
                </div>
              </div>
              <div className="text-gray-700">
                <p className="text-sm leading-relaxed">{response}</p>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <Badge className="text-gray-950">
                    AI Confidence:{" "}
                    {confidence !== null ? `${confidence}` : "N/A"}
                  </Badge>
                  <span>•</span>
                  <span className="font-medium">
                    Analysis completed in {duration?.toFixed(1)}s
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default DYORPage;