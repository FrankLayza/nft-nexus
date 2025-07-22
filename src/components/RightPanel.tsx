import AgentPanel from "./Agent-panel";
import SwarmModePanel from "./swarm-mode-panel";

const RightPanel = () => {
    return (  
        <div className="hidden md:block space-y-6 h-[100vh] overflow-y-auto sticky top-0">
            <AgentPanel />
            <SwarmModePanel />
        </div>
    );
}
 
export default RightPanel;