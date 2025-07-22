import { Bot, Brain, Zap, TrendingUp, Target, AlertTriangle, Sparkles } from "lucide-react";
import { useState } from "react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Separator from "./ui/Separator";
import Progress from "./ui/Progress";

const AgentPanel = () => {
    const [selectedNFT, setSelectedNFT] = useState<boolean>(true);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [agentInsights, setAgentInsights] = useState<"BUY" | "SELL" | null>("BUY");
    
    return (  
        <div className="h-fit w-56 rounded-lg border border-gray-300 bg-white">
            <div className="flex flex-col py-6 px-4 pb-3 items-center">
                <div className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-md font-semibold leading-none tracking-tight">AI Agent Analysis</span>
                </div>
                {
                    selectedNFT ? (
                        <div className="w-full">
                            <div className="py-4 w-full space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <img
                                        src="https://placehold.co/600x400"
                                        alt=""
                                        className="w-12 h-12 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium truncate">NFT 1</h4>
                                        <p className="text-sm text-gray-600">Pi Punks</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={async () => {
                                        setIsAnalyzing(true);

                                        // Simulate an API call
                                        setTimeout(() => {
                                            setIsAnalyzing(false);
                                        }, 10000);
                                    }}
                                    disabled={isAnalyzing} className="btn btn-neutral text-white w-full disabled:pointer-events-none">
                                    {isAnalyzing ? (
                                        <>
                                        <Zap className="w-4 h-4 mr-2 animate-pulse" />
                                        Analyzing...
                                        </>
                                    ) : (
                                        <>
                                        <Brain className="w-4 h-4 mr-2" />
                                        Run AI Analysis
                                        </>
                                    )}
                                </button>
                            </div>
                            {
                                isAnalyzing && (
                                    <div>
                                        <div className="space-y-4 w-full">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Recommendation</span>
                                                <Badge
                                                className={`${agentInsights === "BUY" ? "bg-green-100 text-green-800 border-green-200" : agentInsights === "SELL" ? "bg-red-100 text-red-800 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"} `}>
                                                {agentInsights}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="w-full mt-2">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">Confidence</span>
                                                    <span className="text-sm text-gray-600">87%</span>
                                                </div>
                                                <Progress value="87" max="100" className="progress-neutral"></Progress>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-gray-600">Price Target</p>
                                                    <p className="font-bold text-green-600">3.8 ETH</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">Risk Level</p>
                                                    <p className="font-semibold">Medium</p>
                                                </div>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2 w-full">
                                            <h4 className="font-medium text-sm">Market Insights</h4>
                                            <div className="flex items-center justify-between text-sm font-semibold">
                                                <span className="text-gray-600">Sentiment</span>
                                                <div className="flex items-center gap-1">
                                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                                    <span className="text-green-600">Bullish</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between font-semibold text-sm">
                                                <span className="text-gray-600">Volume Spike</span>
                                                <Badge className="bg-neutral-100 text-neutral-800 border-neutral-200">
                                                    Yes
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between font-semibold text-sm">
                                                <span className="text-gray-600">Rarity Rank</span>
                                                <span className="font-medium">
                                                    #234 / 10000
                                                </span>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2 w-full">
                                            <h4 className="font-medium text-sm">AI Insights</h4>
                                            <div className="flex items-center justify-between text-sm font-semibold">
                                                <span className="text-gray-600">Rarity Score</span>
                                                <div className="flex items-center gap-1">
                                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                                    <span className="text-purple-600">9.2/10</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between font-semibold text-sm">
                                                <span className="text-gray-600">Market Prediction</span>
                                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                                    +15%
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-xs pt-4">
                                                <span className="text-gray-600">This NFT shows strong fundamentals with above-average rarity traits. Market sentiment is positive with increasing floor price trends.</span>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2 w-full">
                                            <h4 className="font-medium text-sm">Quick Actions</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                            <Button className="flex items-center text-xs font-medium bg-transparent rounded-full">
                                                <Target className="w-7 h-7 mr-1" />
                                                Set Alert
                                            </Button>
                                            <Button className="flex items-center text-xs font-medium bg-transparent rounded-full">
                                                <TrendingUp className="w-7 h-7 mr-1" />
                                                Track Price
                                            </Button>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg w-full my-4">
                                            <div className="flex items-center gap-2 text-red-800">
                                                <AlertTriangle className="w-4 h-4" />
                                                <span className="text-sm font-medium">Risk Alert</span>
                                            </div>
                                            <p className="text-xs text-red-700 mt-1">
                                                This NFT has been flagged for suspicious activity. Exercise caution.
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">Select an NFT to get AI-powered insights</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
 
export default AgentPanel;