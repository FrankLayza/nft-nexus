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

const resultsCache: Record<string, NFTAnalysisResult> = {};

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

      // 🕒 Wait briefly for processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 📜 Get logs to extract result
      const logsResponse = await fetch(
        `${this.baseUrl}/agents/${this.agentId}/logs`
      );

      if (!logsResponse.ok) {
        throw new Error(`Failed to get agent logs: ${logsResponse.statusText}`);
      }

      const logsData: AgentLog = await logsResponse.json();

      // 🔍 Parse result from logs
      const result = this.parseAnalysisFromLogs(logsData.logs, input);

      // 💾 Cache it for future requests
      resultsCache[cacheKey] = result;

      return result;
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
    // Step 1: Identify all indexes where this NFT's analysis started
    const startIndexes: number[] = logs
      .map((line, index) => ({ line, index }))
      .filter(
        ({ line }) =>
          line.includes(
            `Starting intelligent NFT analysis for collection: ${input.collection}`
          ) && line.includes(`token: ${input.token_id}`)
      )
      .map(({ index }) => index);

    if (startIndexes.length === 0) {
      throw new Error("No matching analysis logs found for this NFT.");
    }

    // Step 2: Pick the *most recent* matching analysis block
    const startIndex = startIndexes[startIndexes.length - 1];

    // Step 3: Slice from the start of the block to the end
    // (assumes log for an analysis always ends with "Key insights:")
    const relevantLogs = logs.slice(startIndex);
    const endIndex = relevantLogs.findIndex((line) =>
      line.includes("Key insights:")
    );

    if (endIndex === -1) {
      throw new Error("Incomplete log block. Could not find 'Key insights'.");
    }

    const analysisBlock = relevantLogs.slice(0, endIndex + 1);

    // Step 4: Extract fields from the matched block
    const getField = (prefix: string) =>
      analysisBlock
        .find((line) => line.startsWith(prefix))
        ?.split(":")[1]
        .trim() || "";

    return {
      collection: input.collection,
      token_id: input.token_id,
      rarity_score: parseFloat(getField("Rarity score")),
      market_sentiment: getField("Market sentiment"),
      price_prediction: parseFloat(
        getField("Price prediction").replace(" ETH", "")
      ),
      risk_level: getField("Risk level"),
      recommendation: getField("Recommendation"),
      confidence: parseFloat(getField("Confidence").replace("%", "")),
      insights: analysisBlock
        .filter(
          (line) => line.trim().startsWith("•") || line.trim().startsWith("-")
        )
        .map((line) => line.replace(/^[-•]\s*/, "").trim()),
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
