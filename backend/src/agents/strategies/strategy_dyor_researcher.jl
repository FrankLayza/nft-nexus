# ===========================
# DYOR Researcher Strategy
# This file defines a JuliaOS Strategy that uses the DYOR researcher tool.
# It orchestrates the tool and defines the input schema for DYOR analysis.
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
Base.@kwdef struct StrategyDYORResearcherConfig <: StrategyConfig
    analysis_depth::String = "comprehensive"  # Default config value
    api_key::String = HUGGINGFACE_API_KEY  # Hugging Face API key from environment
    model_name::String = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai"
    temperature::Float64 = 0.7
    max_tokens::Int = 1024
end

# Define the input struct for the strategy
# IMPORTANT: All fields must have default values for JSON schema generation!
Base.@kwdef struct DYORResearcherInput <: StrategyInput
    text::String = ""  # Research question or topic
end

# Main strategy function: orchestrates the DYOR analysis tool efficiently
function strategy_dyor_researcher(cfg::StrategyDYORResearcherConfig, ctx::AgentContext, input::DYORResearcherInput)
    # Extract input fields
    text = input.text

    # Log the start of analysis
    push!(ctx.logs, "Starting DYOR analysis for: \"$text\"")

    # Find the DYOR researcher tool in the agent's context
    researcher_tool_index = findfirst(tool -> tool.metadata.name == "dyor_researcher", ctx.tools)
    if researcher_tool_index === nothing
        push!(ctx.logs, "ERROR: DYOR Researcher tool not found in context tools.")
        return
    end
    researcher_tool = ctx.tools[researcher_tool_index]

    # Prepare input for the tool as a dictionary
    tool_input = Dict{String, Any}(
        "text" => text
    )

    # Debug: Check tool config
    push!(ctx.logs, "Tool config API key length: $(length(researcher_tool.config.api_key))")
    push!(ctx.logs, "Tool config API key starts with: $(researcher_tool.config.api_key[1:min(10, length(researcher_tool.config.api_key))])")
    
    # Execute the tool and get the result (single LLM call)
    result = researcher_tool.execute(researcher_tool.config, tool_input)

    # Log the intelligent analysis results
    push!(ctx.logs, "DYOR analysis complete")
    push!(ctx.logs, "Success: $(result["success"])")
    push!(ctx.logs, "Confidence: $(result["confidence"])%")
    
    # Log analysis
    if haskey(result, "analysis") && !isempty(result["analysis"])
        push!(ctx.logs, "Analysis:")
        push!(ctx.logs, result["analysis"])
    end

    # Return the result (can be used by the agent system)
    return result
end

# Metadata describing the strategy (name)
const STRATEGY_DYOR_RESEARCHER_METADATA = StrategyMetadata("dyor_researcher")

# Strategy specification object for registration in JuliaOS
const STRATEGY_DYOR_RESEARCHER_SPECIFICATION = StrategySpecification(
    strategy_dyor_researcher,         # The function to execute
    nothing,                          # No custom state struct
    StrategyDYORResearcherConfig,     # The config struct
    STRATEGY_DYOR_RESEARCHER_METADATA,# The metadata
    DYORResearcherInput               # The input struct
) 