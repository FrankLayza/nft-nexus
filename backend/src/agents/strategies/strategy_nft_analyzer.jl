# ===========================
# NFT Analyzer Strategy
# This file defines a JuliaOS Strategy that uses the NFT analyzer tool.
# It orchestrates the tool and defines the input schema for NFT analysis.
# ===========================

# Import required types from the CommonTypes module
using ..CommonTypes: StrategyConfig, AgentContext, StrategySpecification, StrategyMetadata, StrategyInput

# Load environment variables safely
using DotEnv
const HUGGINGFACE_API_KEY = try
    DotEnv.load!(joinpath(@__DIR__, "..", "..", "..", "..", "JuliaOS", "backend", ".env"))
    get(ENV, "HUGGINGFACE_API_KEY", "")
catch
    get(ENV, "HUGGINGFACE_API_KEY", "")
end

# Define the configuration struct for the strategy, with LLM settings
Base.@kwdef struct StrategyNFTAnalyzerConfig <: StrategyConfig
    analysis_depth::String = "comprehensive"  # Default config value
    api_key::String = HUGGINGFACE_API_KEY  # Hugging Face API key from environment
    model_name::String = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai"
    temperature::Float64 = 0.7
    max_tokens::Int = 512
end

# Define the input struct for the strategy
# IMPORTANT: All fields must have default values for JSON schema generation!
Base.@kwdef struct NFTAnalysisInput <: StrategyInput
    collection::String = ""  # NFT collection name
    token_id::String = ""    # NFT token ID
    attributes::Vector{Dict{String, String}} = Vector{Dict{String, String}}()  # NFT attributes
    floor_price::Float64 = 0.0  # Collection floor price
    total_supply::Int = 0       # Total supply of the collection
end

# Main strategy function: orchestrates the NFT analysis tool efficiently
function strategy_nft_analyzer(cfg::StrategyNFTAnalyzerConfig, ctx::AgentContext, input::NFTAnalysisInput)
    # Extract input fields
    collection = input.collection
    token_id = input.token_id

    # Log the start of analysis
    push!(ctx.logs, "Starting intelligent NFT analysis for collection: $collection, token: $token_id")

    # Find the NFT analyzer tool in the agent's context
    analyzer_tool_index = findfirst(tool -> tool.metadata.name == "nft_analyzer", ctx.tools)
    if analyzer_tool_index === nothing
        push!(ctx.logs, "ERROR: NFT Analyzer tool not found in context tools.")
        return
    end
    analyzer_tool = ctx.tools[analyzer_tool_index]

    # Prepare input for the tool as a dictionary
    tool_input = Dict{String, Any}(
        "collection" => collection,
        "token_id" => token_id,
        "attributes" => input.attributes,
        "floor_price" => input.floor_price,
        "total_supply" => input.total_supply
    )

    # Debug: Check tool config
    push!(ctx.logs, "Tool config API key length: $(length(analyzer_tool.config.api_key))")
    push!(ctx.logs, "Tool config API key starts with: $(analyzer_tool.config.api_key[1:min(10, length(analyzer_tool.config.api_key))])")
    
    # Execute the tool and get the result (single LLM call)
    result = analyzer_tool.execute(analyzer_tool.config, tool_input)

    # Log the intelligent analysis results
    push!(ctx.logs, "Intelligent analysis complete for token $token_id")
    push!(ctx.logs, "Rarity score: $(result["rarity_score"])")
    push!(ctx.logs, "Market sentiment: $(result["market_sentiment"])")
    push!(ctx.logs, "Price prediction: $(result["price_prediction"]) ETH")
    push!(ctx.logs, "Risk level: $(result["risk_level"])")
    push!(ctx.logs, "Recommendation: $(result["recommendation"])")
    push!(ctx.logs, "Confidence: $(result["confidence"])%")
    
    # Log insights
    if haskey(result, "insights") && !isempty(result["insights"])
        push!(ctx.logs, "Key insights:")
        for insight in result["insights"]
            push!(ctx.logs, "  • $insight")
        end
    end

    # Return the result (can be used by the agent system)
    return result
end

# Metadata describing the strategy (name)
const STRATEGY_NFT_ANALYZER_METADATA = StrategyMetadata("nft_analyzer")
# Strategy specification object for registration in JuliaOS
const STRATEGY_NFT_ANALYZER_SPECIFICATION = StrategySpecification(
    strategy_nft_analyzer,         # The function to execute
    nothing,                       # No custom state struct
    StrategyNFTAnalyzerConfig,     # The config struct
    STRATEGY_NFT_ANALYZER_METADATA,# The metadata
    NFTAnalysisInput               # The input struct
)