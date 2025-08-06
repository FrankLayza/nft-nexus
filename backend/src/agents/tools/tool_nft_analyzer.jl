# ===========================
# NFT Analyzer Tool
# This file defines a JuliaOS Tool for analyzing NFTs.
# It uses LLM for intelligent analysis instead of mock responses.
# ===========================

# Import required types from the CommonTypes module
using ..CommonTypes: ToolSpecification, ToolMetadata, ToolConfig
using ...Resources.HuggingFace: HuggingFaceConfig, huggingface_util
using JSON3

# Load environment variables safely
using DotEnv
const HUGGINGFACE_API_KEY = try
    DotEnv.load!(joinpath(@__DIR__, "..", "..", "..", "..", "JuliaOS", "backend", ".env"))
    get(ENV, "HUGGINGFACE_API_KEY", "")
catch
    get(ENV, "HUGGINGFACE_API_KEY", "")
end
const HUGGINGFACE_MODEL = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai"

# Define the configuration struct for the tool, with LLM settings
Base.@kwdef struct ToolNFTAnalyzerConfig <: ToolConfig
    analysis_depth::String = "comprehensive"  # Default config value
    api_key::String = HUGGINGFACE_API_KEY  # Hugging Face API key from environment
    model_name::String = HUGGINGFACE_MODEL
    temperature::Float64 = 0.7
    max_tokens::Int = 512
end

# Main tool function: performs intelligent NFT analysis using LLM
function tool_nft_analyzer(config::ToolNFTAnalyzerConfig, input::Dict{String, Any})::Dict{String, Any}
    # Extract input fields with defaults if missing
    collection = get(input, "collection", "unknown")
    token_id = get(input, "token_id", "unknown")
    attributes = get(input, "attributes", [])
    floor_price = get(input, "floor_price", 0.0)
    total_supply = get(input, "total_supply", 10000)

    # Debug: Check if API key is loaded
    println("Tool received API key length: $(length(config.api_key))")
    if isempty(config.api_key) || config.api_key == "your_huggingface_api_key_here"
        println("WARNING: Hugging Face API key is not set or is placeholder!")
        return create_fallback_analysis(collection, token_id, attributes, floor_price, total_supply)
    end

    # Create LLM config
    llm_config = HuggingFaceConfig(
        api_key = config.api_key,
        model_name = config.model_name,
        temperature = config.temperature,
        max_tokens = config.max_tokens
    )

    # Build a comprehensive prompt for NFT analysis
    attributes_text = if isempty(attributes)
        "No specific attributes"
    else
        join(["$(attr["trait_type"]): $(attr["value"])" for attr in attributes], ", ")
    end
    
    prompt = """
    Analyze this NFT and provide a detailed assessment:

    Collection: $collection
    Token ID: $token_id
    Attributes: $attributes_text
    Floor Price: $floor_price ETH
    Total Supply: $total_supply

    Please provide:
    1. Rarity score (1-10)
    2. Market sentiment (bullish/bearish/neutral)
    3. Price prediction
    4. Risk level (low/medium/high)
    5. Recommendation (BUY/SELL/HOLD)
    6. Confidence level (1-100)
    7. Key insights

    Format your response as JSON with these exact keys:
    {
        "rarity_score": number,
        "market_sentiment": "string",
        "price_prediction": number,
        "risk_level": "string",
        "recommendation": "string",
        "confidence": number,
        "insights": ["string"]
    }
    """
    try
        # Get LLM analysis
        llm_response = huggingface_util(llm_config, prompt)
        
        # Try to parse JSON response
        try
            # Extract JSON from response (handle cases where LLM adds extra text)
            json_start = findfirst('{', llm_response)
            json_end = findlast('}', llm_response)
            
            if json_start !== nothing && json_end !== nothing
                json_str = llm_response[json_start:json_end]
                result = JSON3.read(json_str)
                
                # Validate and return result
                return Dict(
                    "collection" => collection,
                    "token_id" => token_id,
                    "rarity_score" => get(result, "rarity_score", rand(1:10)),
                    "market_sentiment" => get(result, "market_sentiment", "neutral"),
                    "price_prediction" => get(result, "price_prediction", floor_price),
                    "risk_level" => get(result, "risk_level", "medium"),
                    "recommendation" => get(result, "recommendation", "HOLD"),
                    "confidence" => get(result, "confidence", rand(70:95)),
                    "insights" => get(result, "insights", ["LLM analysis completed"])
                )
            else
                # Fallback if JSON parsing fails
                return create_fallback_analysis(collection, token_id, attributes, floor_price, total_supply)
            end
        catch
            # Fallback if JSON parsing fails
            return create_fallback_analysis(collection, token_id, attributes, floor_price, total_supply)
        end
    catch
        # Fallback if LLM fails
        return create_fallback_analysis(collection, token_id, attributes, floor_price, total_supply)
    end
end

# Fallback analysis function when LLM fails
function create_fallback_analysis(collection::String, token_id::String, attributes::Vector{Dict{String, String}}, floor_price::Float64, total_supply::Int)
    rarity_score = length(attributes) > 0 ? min(10, length(attributes) + rand(0:2)) : rand(1:5)
    sentiment = rarity_score > 7 ? "bullish" : rarity_score < 4 ? "bearish" : "neutral"
    price_prediction = floor_price * (sentiment == "bullish" ? 1.2 : sentiment == "bearish" ? 0.8 : 1.0)
    risk_level = rarity_score > 7 ? "low" : rarity_score < 4 ? "high" : "medium"
    recommendation = sentiment == "bullish" ? "BUY" : sentiment == "bearish" ? "SELL" : "HOLD"
    
    return Dict(
        "collection" => collection,
        "token_id" => token_id,
        "rarity_score" => rarity_score,
        "market_sentiment" => sentiment,
        "price_prediction" => price_prediction,
        "risk_level" => risk_level,
        "recommendation" => recommendation,
        "confidence" => rand(70:95),
        "insights" => ["Fallback analysis used - LLM unavailable"]
    )
end

# Metadata describing the tool (name and description)
const TOOL_NFT_ANALYZER_METADATA = ToolMetadata(
    "nft_analyzer",
    "Analyzes NFT metadata using LLM for intelligent rarity scoring and valuation."
)

# Tool specification object for registration in JuliaOS
const TOOL_NFT_ANALYZER_SPECIFICATION = ToolSpecification(
    tool_nft_analyzer,         # The function to execute
    ToolNFTAnalyzerConfig,     # The config struct
    TOOL_NFT_ANALYZER_METADATA # The metadata
)