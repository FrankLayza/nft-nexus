module HuggingFace

using HTTP
using JSON3

export HuggingFaceConfig, huggingface_util

@kwdef struct HuggingFaceConfig
    api_key::String
    model_name::String = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai"
    temperature::Float64 = 0.0
    max_tokens::Int = 256
end

"""
    huggingface_util(cfg::HuggingFaceConfig, prompt::String) :: String

Sends prompt to Hugging Face's inference API and returns its text completion.
"""
function huggingface_util(
    cfg::HuggingFaceConfig,
    prompt::String
)::String
    endpoint_url = "https://router.huggingface.co/v1/chat/completions"

    body_dict = Dict(
        "model" => cfg.model_name,
        "messages" => [
            Dict("role" => "user", "content" => prompt)
        ],
        "temperature" => cfg.temperature,
        "max_tokens" => cfg.max_tokens
    )
    request_body = JSON3.write(body_dict)

    resp = HTTP.request(
        "POST",
        endpoint_url;
        headers = [
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $(cfg.api_key)"
        ],
        body = request_body
    )

    if resp.status != 200
        error("Hugging Face chat completion failed with status $(resp.status): $(String(resp.body))")
    end

    resp_json = JSON3.read(String(resp.body))

    if !haskey(resp_json, "choices")  isempty(resp_json.choices)
        error("Hugging Face response missing 'choices' or the list is empty.")
    end
    first_choice = resp_json.choices[1]

    if !haskey(first_choice, :message)  !haskey(first_choice.message, :content)
        error("Hugging Face response's first choice missing 'message.content'.")
    end

    generated_text = first_choice.message.content
    return generated_text
end

end