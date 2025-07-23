import AgentPanel from "./Agent-panel";
import SwarmModePanel from "./swarm-mode-panel";
import { useState } from "react";
import { Bot, X } from "lucide-react";


const RightPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <div className="hidden md:block w-60 space-y-6 h-[100vh] overflow-y-auto sticky top-0">
                <AgentPanel />
                <SwarmModePanel />
            </div>

            {/* Sidebar for Mobile */}
            <div className={`md:hidden fixed inset-0 z-50 transform transition-transform duration-500 ease-in-out xl:hidden ${isOpen ? "-translate-y-0" : "translate-y-full"}`}>
                <div className="absolute bottom-0 left-0 right-0 bg-white max-h-[70vh] overflow-y-auto space-y-4 p-4 rounded-t-2xl">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">AI Agent Analysis</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <AgentPanel />
                    <SwarmModePanel />
                </div>
            </div>
            {
                !isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-110 transition-transform cursor-pointer">
                        <Bot className="w-6 h-6 text-white" />
                    </button>
                )
            }  
        </>
    );
}
 
export default RightPanel;