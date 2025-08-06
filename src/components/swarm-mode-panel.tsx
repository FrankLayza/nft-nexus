import { Activity,} from "lucide-react";
import { useFilter } from "../contexts/FilterContext";
const SwarmModePanel = () => {
const swarmData = {
  activeAgents: 2,
  totalScans: 12847,
  trendsDetected: 8,
  volumeSpikes: 3,
  newOpportunities: 5,
};
const {count} = useFilter();

// const recentActivity = [
//     {
//         type: "volume_spike",
//         collection: "Cosmic Warriors",
//         change: "+340%",
//         time: "2m ago",
//     },
//     {
//         type: "new_mint",
//         collection: "Digital Dreams",
//         count: 150,
//         time: "5m ago",
//     },
//     {
//         type: "price_drop",
//         collection: "Cyber Cats",
//         change: "-15%",
//         time: "8m ago",
//     },
//     {
//         type: "whale_activity",
//         collection: "Pi Punks",
//         amount: "50 ETH",
//         time: "12m ago",
//     },
// ]
    return (
        <div className="h-fit rounded-lg border border-gray-300 bg-white">
            <div className="flex flex-col py-6 px-4 pb-3 items-center">
                <div className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-md font-semibold leading-none tracking-tight">Swarm Intelligence</span>
                </div>
                <div className="mt-4 w-full space-y-4 font-medium">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="text-center py-3 px-2 bg-gray-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{swarmData.activeAgents}</div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">Active Agents</div>
                        </div>
                        <div className="text-center py-3 px-2 bg-gray-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{count}</div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">Total Scans</div>
                        </div>
                    </div>
                    {/* <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Trends Detected</span>
                            <Badge className="bg-neutral-100 text-neutral-800 border-neutral-200">{swarmData.trendsDetected}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Volume Spikes</span>
                            <Badge className="bg-orange-100 text-orange-800 border-orange-200">{swarmData.volumeSpikes}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">New Opportunities</span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">{swarmData.newOpportunities}</Badge>
                        </div>
                    </div> */}
                    {/* <div className="space-y-3">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Live Activity
                        </h4>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg text-sm">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                                    {activity.type === "volume_spike" && <TrendingUp className="w-4 h-4 text-orange-600" />}
                                    {activity.type === "new_mint" && <Zap className="w-4 h-4 text-green-600" />}
                                    {activity.type === "price_drop" && <Eye className="w-4 h-4 text-red-600" />}
                                    {activity.type === "whale_activity" && <Users className="w-4 h-4 text-blue-600" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{activity.collection}</div>
                                <div className={`text-xs 
                                    ${activity.type === "volume_spike" ? "text-orange-600" : activity.type === "new_mint" ? "text-green-600" : activity.type === "price_drop" ? "text-red-600" : "text-blue-600"}`}>
                                    {activity.type === "volume_spike" && `Volume ${activity.change}`}
                                    {activity.type === "new_mint" && `${activity.count} new mints`}
                                    {activity.type === "price_drop" && `Floor ${activity.change}`}
                                    {activity.type === "whale_activity" && `${activity.amount} purchase`}
                                </div>
                                </div>
                                <div className="text-xs text-gray-500">{activity.time}</div>
                            </div>
                            ))}
                        </div>
                    </div> */}
                    {/* <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Swarm Health</span>
                            <span className="text-green-600 font-medium">Optimal</span>
                        </div>
                        <Progress className="progress-neutral" value="87" max="100"></Progress>
                        <div className="text-xs text-gray-500">94% of agents reporting normally</div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
 
export default SwarmModePanel;