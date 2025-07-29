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

class JuliaOSService {
  private baseUrl: string;
  private agentId: string;

  constructor() {
    // Update this URL to match your JuliaOS backend
    this.baseUrl = "/api/api/v1";
    this.agentId = "nft-analyzer-001";
  }

  /**
   * Analyze an NFT using the JuliaOS agent
   */
  async analyzeNFT(input: NFTAnalysisInput): Promise<NFTAnalysisResult> {
    try {
      // Trigger the agent analysis
      const triggerResponse = await fetch(
        `${this.baseUrl}/agents/${this.agentId}/webhook`,
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

      // Wait a moment for the agent to process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the agent logs to extract the analysis result
      const logsResponse = await fetch(
        `${this.baseUrl}/agents/${this.agentId}/logs`
      );
      if (!logsResponse.ok) {
        throw new Error(`Failed to get agent logs: ${logsResponse.statusText}`);
      }

      const logsData: AgentLog = await logsResponse.json();

      // Parse the analysis result from the logs
      return this.parseAnalysisFromLogs(logsData.logs, input);
    } catch (error) {
      console.error("JuliaOS analysis failed:", error);
      throw error;
    }
  }

  /**
   * Parse the analysis result from agent logs
   */
  private parseAnalysisFromLogs(
    logs: string[],
    input: NFTAnalysisInput
  ): NFTAnalysisResult {
    // Get the most recent analysis (last complete set of logs)
    const recentLogs = logs.slice(-6); // Last 6 log entries for one complete analysis

    let rarityScore = 0;
    let marketSentiment = "neutral";
    let recommendation = "HOLD";

    // Extract values from logs
    for (const log of recentLogs) {
      if (log.includes("Rarity score:")) {
        rarityScore = parseInt(log.split(":")[1].trim());
      } else if (log.includes("Market sentiment:")) {
        marketSentiment = log.split(":")[1].trim();
      } else if (log.includes("Recommendation:")) {
        recommendation = log.split(":")[1].trim();
      }
    }

    // Calculate mock values based on the analysis
    const pricePrediction =
      input.floor_price *
      (marketSentiment === "bullish"
        ? 1.2
        : marketSentiment === "bearish"
        ? 0.8
        : 1.0);
    const riskLevel =
      rarityScore > 7 ? "low" : rarityScore < 4 ? "high" : "medium";
    const confidence = Math.min(95, Math.max(70, 70 + rarityScore * 3));

    return {
      collection: input.collection,
      token_id: input.token_id,
      rarity_score: rarityScore,
      market_sentiment: marketSentiment,
      price_prediction: pricePrediction,
      risk_level: riskLevel,
      recommendation: recommendation,
      confidence: confidence,
      insights: [
        `Rarity score of ${rarityScore}/10 based on ${input.attributes.length} attributes`,
        `Market sentiment is ${marketSentiment}`,
        `Risk level: ${riskLevel}`,
        `Confidence: ${confidence}%`,
      ],
    };
  }

  /**
   * Get agent status
   */
  async getAgentStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/agents/${this.agentId}`);
      return response.ok;
    } catch (error) {
      console.error("Failed to check agent status:", error);
      return false;
    }
  }

  /**
   * Get all available agents
   */
  async getAgents(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/agents`);
      if (!response.ok) {
        throw new Error(`Failed to get agents: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to get agents:", error);
      return [];
    }
  }
}

// Export a singleton instance
export const juliaOSService = new JuliaOSService();
