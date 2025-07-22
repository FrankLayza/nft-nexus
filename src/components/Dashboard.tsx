import CardGrid from "./CardGrid";
import UtilityPanel from "./RightPanel";

const Dashboard = () => {
    return (  
        <div className="flex flex-row gap-6">
            <CardGrid />
            <UtilityPanel />
        </div>
    );
}
 
export default Dashboard;