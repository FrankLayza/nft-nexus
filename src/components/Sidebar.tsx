import { Filter, X, Activity, Target } from "lucide-react";
import Button from "./ui/Button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "./ui/Input";
import { useSidebar } from "../contexts/SidebarContext";


const blockchains = [
    { id: "ethereum", name: "Ethereum", icon: "⟠", count: 1234 },
    { id: "polygon", name: "Polygon", icon: "⬟", count: 567 },
    { id: "bnb", name: "BNB Chain", icon: "◆", count: 890 },
    { id: "pi", name: "Pi Network", icon: "π", count: 234 },
    { id: "solana", name: "Solana", icon: "☀️", count: 456 },
];

const collections = [
    { id: "bayc", name: "Bored Ape Yacht Club", icon: "🐵", floor: 45.2 },
    { id: "cryptopunks", name: "CryptoPunks", icon: "👾", floor: 67.8 },
    { id: "azuki", name: "Azuki", icon: "🌸", floor: 12.3 },
    { id: "doodles", name: "Doodles", icon: "🎨", floor: 8.9 },
];
const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const {sidebarOpen, setSidebarOpen} = useSidebar();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState<string | null>(null);
    const [value, setValue] = useState(0);

    const SidebarContent = (
        <div className="py-6 px-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                </h2>
                <Button className="btn-ghost text-gray-500 hover:text-gray-700 active:text-gray-800">
                    Clear all
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-gray-100">
                    All Chains
                    <X className="w-3 h-3 cursor-pointer hover:text-blue-700 focus:text-green-700 active:text-red-700" />
                </div>
                <div className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-gray-100">
                    On Sale
                    <X className="w-3 h-3 cursor-pointer hover:text-blue-700 focus:text-green-700 active:text-red-700" />
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium mb-2">Collections</h3>
                    <Input type="search" placeholder="Search collection..." className="w-full" />
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-2">Price Range</h3>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => setValue(parseFloat(e.target.value))}
                        className="w-full appearance-none h-2 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-black"
                        style={{
                            background: `linear-gradient(to right, lightgray ${value}%, black ${value}%)`,
                        }}
                    />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{value} ETH</span>
                        <span>100+ ETH</span>
                    </div>
                </div>
            </div>  
            <div className="space-y-6 w-full mt-6">
                <div tabIndex={0} className={`collapse collapse-arrow ${collapsed === "blockchain" ? "collapse-open" : "collapse-close" } border border-gray-200 bg-transparent rounded-md w-full`}>
                    <div className="collapse-title font-medium text-sm text-gray-600" onClick={() => setCollapsed(collapsed === "blockchain" ? null : "blockchain")}>Blockchain</div>
                    <div className="collapse-content">
                        {
                            blockchains.map((blockchain) => (
                                <div key={blockchain.id} className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <input type="checkbox" id={blockchain.id} />
                                        <label htmlFor={blockchain.id} className="flex items-center space-x-2 cursor-pointer">
                                            <span className="text-lg">{blockchain.icon}</span>
                                            <span className="text-sm">{blockchain.name}</span>
                                        </label>
                                    </div>
                                    <span className="text-xs text-gray-500">{blockchain.count}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div tabIndex={0} className={`collapse collapse-arrow ${collapsed === "availability" ? "collapse-open" : "collapse-close" } border border-gray-200 bg-transparent rounded-md w-full`}>
                    <div className="collapse-title font-medium text-sm text-gray-600" onClick={() => setCollapsed(collapsed === "availability" ? null : "availability")}>Availability</div>
                    <div className="collapse-content">
                        <div className="flex items-center space-x-3 mb-2">
                            <input type="checkbox" id="all" defaultChecked />
                            <label htmlFor="all" className="text-sm cursor-pointer">
                            All
                            </label>
                        </div>
                        <div className="flex items-center space-x-3 mb-2">
                            <input type="checkbox" id="on-sale" />
                            <label htmlFor="on-sale" className="text-sm cursor-pointer">
                            On Sale
                            </label>
                        </div>
                        <div className="flex items-center space-x-3 mb-2">
                            <input type="checkbox" id="auction" />
                            <label htmlFor="auction" className="text-sm cursor-pointer">
                            Auction
                            </label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="new-listing" />
                            <label htmlFor="new-listing" className="text-sm cursor-pointer">
                            New Listings
                            </label>
                        </div>
                    </div>
                </div>
                <div tabIndex={0} className={`collapse collapse-arrow ${collapsed === "collection" ? "collapse-open" : "collapse-close" } border border-gray-200 bg-transparent rounded-md w-full`}>
                    <div className="collapse-title font-medium text-sm text-gray-600" onClick={() => setCollapsed(collapsed === "collection" ? null : "collection")}>Collections</div>
                    <div className="collapse-content">
                        {collections.map((collection) => (
                            <div key={collection.id} className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                                <input type="checkbox" id="all" defaultChecked />
                                <label htmlFor={collection.id} className="flex items-center space-x-2 cursor-pointer">
                                <span className="text-lg">{collection.icon}</span>
                                <div>
                                    <div className="text-sm font-medium">{collection.name}</div>
                                    <div className="text-xs text-gray-500">Floor: {collection.floor} ETH</div>
                                </div>
                                </label>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div tabIndex={0} className={`collapse collapse-arrow ${collapsed === "rarity" ? "collapse-open" : "collapse-close" } border border-gray-200 bg-transparent rounded-md w-full`}>
                    <div className="collapse-title font-medium text-sm text-gray-600" onClick={() => setCollapsed(collapsed === "rarity" ? null : "rarity")}>Rarity</div>
                    <div className="collapse-content">
                        <div className="flex items-center space-x-3 mb-2">
                            <input type="checkbox" id="all" defaultChecked />
                            <label htmlFor="legendary" className="text-sm cursor-pointer flex items-center">
                                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                                Legendary (0.1%)
                            </label>
                        </div>
                        <div className="flex items-center space-x-3 mb-2">
                            <input type="checkbox" id="on-sale" />
                            <label htmlFor="epic" className="text-sm cursor-pointer flex items-center">
                                <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                                Epic (1%)
                            </label>
                        </div>
                        <div className="flex items-center space-x-3 mb-2">
                            <input type="checkbox" id="auction" />
                            <label htmlFor="rare" className="text-sm cursor-pointer flex items-center">
                                <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                                Rare (5%)
                            </label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="new-listing" />
                            <label htmlFor="common" className="text-sm cursor-pointer flex items-center">
                                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                                Common (93.9%)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => navigate("/dyor")} className="w-full mt-6 flex flex-col items-center">
                <Button className="flex flex-col items-start h-fit p-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors w-full cursor-pointer">
                    <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">NEXUS DYOR AI</span>
                    </div>
                </Button>
            </div>
            <div className="w-full mt-6 flex flex-col items-center">
                <div className="flex flex-col items-start h-fit p-4 rounded bg-gray-100 w-full cursor-default">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">System Status</span>
                    </div>
                    <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
            </div>
        </div>
    );
    return (  
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden xl:block w-80 bg-white border-r border-gray-200 h-[100vh] overflow-y-auto sticky top-0">
                {SidebarContent}
            </aside>

            {/* Mobile Sidebar */}
            <aside className={`fixed top-0 left-0 h-[100vh] overflow-y-auto w-72 z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out xl:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4">
                    <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
                {SidebarContent}
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                className="fixed inset-0 bg-black/70 bg-opacity-40 z-40 xl:hidden transition-opacity duration-300"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                />
            )}
        </>
    );
}
 
export default Sidebar;