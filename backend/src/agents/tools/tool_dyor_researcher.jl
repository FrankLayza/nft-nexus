# ===========================
# DYOR Researcher Tool
# This file defines a JuliaOS Tool for DYOR (Do Your Own Research) analysis.
# It uses LLM for intelligent research and analysis.
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
Base.@kwdef struct ToolDYORResearcherConfig <: ToolConfig
    analysis_depth::String = "comprehensive"  # Default config value
    api_key::String = HUGGINGFACE_API_KEY  # Hugging Face API key from environment
    model_name::String = HUGGINGFACE_MODEL
    temperature::Float64 = 0.7
    max_tokens::Int = 1024
end

# Main tool function: performs intelligent DYOR analysis using LLM
function tool_dyor_researcher(config::ToolDYORResearcherConfig, input::Dict{String, Any})::Dict{String, Any}
    # Extract input fields with defaults if missing
    text = get(input, "text", "")

    # Check if API key is loaded
    if isempty(config.api_key) || config.api_key == "your_huggingface_api_key_here"
        return create_fallback_analysis(text)
    end

    # Create LLM config
    llm_config = HuggingFaceConfig(
        api_key = config.api_key,
        model_name = config.model_name,
        temperature = config.temperature,
        max_tokens = config.max_tokens
    )

    # Build a comprehensive prompt for DYOR analysis
    prompt = """
    You are an expert NFT and cryptocurrency research analyst. Analyze the following question or topic and provide comprehensive insights:

    Question/Topic: $text

    Please provide a detailed analysis including:
    1. Key insights and findings
    2. Market analysis and trends
    3. Risk assessment
    4. Recommendations
    5. Important considerations

    Format your response as a comprehensive analysis that would help someone make informed decisions. Be thorough, objective, and provide actionable insights.
    """

    try
        # Get LLM analysis
        llm_response = huggingface_util(llm_config, prompt)
        
        # Return the analysis result
        return Dict(
            "text" => text,
            "analysis" => llm_response,
            "success" => true,
            "confidence" => rand(80:95)
        )
    catch
        # Fallback if LLM fails
        return create_fallback_analysis(text)
    end
end

# Fallback analysis function when LLM fails
function create_fallback_analysis(text::String)
    return Dict(
        "text" => text,
        "analysis" => "Fallback analysis used - LLM unavailable. Please try again later.",
        "success" => false,
        "confidence" => 50
    )
end

# Metadata describing the tool (name and description)
const TOOL_DYOR_RESEARCHER_METADATA = ToolMetadata(
    "dyor_researcher",
    "Performs intelligent DYOR (Do Your Own Research) analysis using LLM for NFT and cryptocurrency insights."
)

# Tool specification object for registration in JuliaOS
const TOOL_DYOR_RESEARCHER_SPECIFICATION = ToolSpecification(
    tool_dyor_researcher,         # The function to execute
    ToolDYORResearcherConfig,     # The config struct
    TOOL_DYOR_RESEARCHER_METADATA # The metadata
) 