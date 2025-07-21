import AgentPanel from "./Agent-panel";
import SwarmModePanel from "./swarm-mode-panel";

const RightPanel = () => {
    return (  
        <div className="space-y-6">
            <AgentPanel />
            <SwarmModePanel />
        </div>
    );
}
 
export default RightPanel;