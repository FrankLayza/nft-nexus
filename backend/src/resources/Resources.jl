module Resources

include("types/Errors.jl")
include("types/Telegram.jl")
include("utils/Gemini.jl")
include("utils/HuggingFace.jl")

using .Telegram
using .Gemini
using .HuggingFace

end