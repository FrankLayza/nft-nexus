import { Filter } from "lucide-react";
import Button from "./ui/Button";

const Sidebar = () => {
    return (  
        <>
            <aside className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold flex items-center">
                            <Filter className="w-5 h-5 mr-2" />
                            Filters
                        </h2>
                        <Button className="text-gray-500">
                            Clear all
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
 
export default Sidebar;