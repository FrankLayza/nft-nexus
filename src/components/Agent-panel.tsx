import { Bot, Brain } from "lucide-react";

const agentPanel = () => {
    return (  
        <div className="h-fit w-56 rounded-lg border border-gray-300 bg-white">
            <div className="flex flex-col py-6 px-4 pb-3 items-center">
                <div className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-md font-semibold leading-none tracking-tight">AI Agent Analysis</span>
                </div>
                <div className="text-center py-8 text-gray-500">
                    <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Select an NFT to get AI-powered insights</p>
                </div>
            </div>
        </div>
    );
}
 
export default agentPanel;