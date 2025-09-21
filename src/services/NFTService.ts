// JuliaOS API Service for NFT Analysis
// Handles communication with the JuliaOS backend agent system

export interface NFTAttributes {
  trait_type: string;
  value: string;
}

export interface NFTAnalysisInput {
  collection: string;
  token_id: string;
  attributes: NFTAttributes[];
  floor_price: number;
  total_supply: number;
}

export interface NFTAnalysisResult {
  collection: string;
  token_id: string;
  rarity_score: number;
  market_sentiment: string;
  price_prediction: number;
  risk_level: string;
  recommendation: string;
  confidence: number;
  insights: string[];
}

export interface AgentLog {
  logs: string[];
}

export interface DyorAnalysisResult {
  prompt: string;
  confidence: number;
  analysis: string;
}

const resultsCache: Record<string, NFTAnalysisResult> = {};

class JuliaOSService {
  private baseUrl: string;
  private agentId: string;

  constructor() {
    // Update this URL to match your JuliaOS backend
    this.baseUrl = "/api/api/v1";
    this.agentId = "analyze-nft";
  }

  /**
   * Analyze an NFT using the JuliaOS agent
   */
  // At the top of your class or module (outside the function)
  async analyzeNFT(input: NFTAnalysisInput): Promise<NFTAnalysisResult> {
    try {
      // 🧠 Define a cache key based on NFT identity
      const cacheKey = `${input.collection}-${input.token_id}`;

      // ✅ Return cached result if it exists
      if (resultsCache[cacheKey]) {
        console.log("Serving result from cache:", cacheKey);
        return resultsCache[cacheKey];
      }

      // 🚀 Trigger the agent analysis
      const triggerResponse = await fetch(
        `${this.baseUrl}/${this.agentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );

      if (!triggerResponse.ok) {
        throw new Error(`Agent trigger failed: ${triggerResponse.statusText}`);
      }

      // 🕒 Wait briefly for processing
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // 📜 Get logs to extract result
      // const logsResponse = await fetch(
      //   `${this.baseUrl}/agents/${this.agentId}/logs`
      // );

      // if (!logsResponse.ok) {
      //   throw new Error(`Failed to get agent logs: ${logsResponse.statusText}`);
      // }

      // const logsData: AgentLog = await logsResponse.json();

      // 🔍 Parse result from logs
      // const result = this.parseAnalysisFromLogs(logsData.logs, input);

      // 💾 Cache it for future requests
      // resultsCache[cacheKey] = result;

      // return result;
      const data =  await triggerResponse.json()
      if(!data.analysis || !data.success){
        throw new Error("Invalid analysis response from the backend")
      }
      console.log(data.analysis)
      return data.analysis
    } catch (error) {
      console.error("JuliaOS analysis failed:", error);
      throw error;
    }
  }


}
// Export a singleton instance
export const juliaOSService = new JuliaOSService();
