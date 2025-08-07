import { useState } from "react";
import Badge from "./ui/Badge";
import { Brain } from "lucide-react";
import { juliaOSService } from "../services/juliaOSService";

const DYORPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;

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
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">NEXUS AI</h1>
        <p className="text-muted-foreground">
          Do Your Own Research with our AI-powered insights.
        </p>
      </header>

      <section className="bg-white border border-gray-300 p-4 rounded-lg shadow-xs">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">AI Research Assistant</h2>
          <p className="text-sm text-gray-500">
            Ask questions about NFT projects and market trends
          </p>
        </div>

        <div className="mt-4 space-y-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="E.g., 'What do you think about Bored Ape Yacht Club?'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />

          <button
            className="btn btn-neutral"
            disabled={!prompt.trim() || isAnalyzing}
            onClick={handleAnalyze}
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
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="text-lg font-semibold">
                  AI Analysis Results
                </span>
              </div>

              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {response}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                <Badge className="text-gray-950">
                  AI Confidence:{" "}
                  {confidence !== null ? `${confidence}%` : "N/A"}
                </Badge>
                <span>•</span>
                <span>Analysis completed in {duration?.toFixed(1)}s</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DYORPage;
