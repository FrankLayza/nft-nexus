using ..CommonTypes: ToolSpecification, ToolMetadata, ToolConfig


Base.@kwdef struct ToolPostToXConfig <: ToolConfig
    api_key::String
    api_key_secret::String
    access_token::String
    access_token_secret::String 
end

"""
    tool_post_to_x(cfg::ToolPostToXConfig, task::Dict{String, String}) -> Dict{String, Any}

Posts a tweet with given text to X(Twitter).

# Arguments
- `cfg::ToolPostToXConfig`: Tool config.
- `task::Dict{String, String}`: A dictionary containing the data to post.

# Returns
A dictionary with the execution result.

# Notes
- The tweet text must not exceed 280 characters (as per Twitter/X limits).
- This tool is currently disabled because Python dependencies are not supported.
"""
function tool_post_to_x(cfg::ToolPostToXConfig, task::Dict{String,String})::Dict{String,Any}
    return Dict("success" => false, "error" => "Posting to X(Twitter) is currently unavailable: Python dependencies (PyCall/tweepy) have been removed.")
end

const TOOL_POST_TO_X_METADATA = ToolMetadata(
    "post_to_x",
    "Posts a tweet with given text to X(Twitter). (Currently unavailable)"
)

const TOOL_POST_TO_X_SPECIFICATION = ToolSpecification(
    tool_post_to_x,
    ToolPostToXConfig,
    TOOL_POST_TO_X_METADATA
)


