import Input from "./ui/Input";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { Search, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import UtilityPanel from "./RightPanel";
import { useSearchQuery } from "../contexts/SearchQueryContext";


const mockNFTs = [
    {
      name: "Bored Ape Yacht Club",
      symbol: "BAYC",
      floorPrice: "12.5 ETH",
      volume24h: "1,247 ETH",
      change24h: "+5.2%",
      holders: "5,891",
      totalSupply: "10,000",
      description:
        "A collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.",
      verified: true,
      image: "https://placehold.co/600x400",
    },
    {
      name: "CryptoPunks",
      symbol: "PUNKS",
      floorPrice: "45.2 ETH",
      volume24h: "892 ETH",
      change24h: "+2.1%",
      holders: "3,711",
      totalSupply: "10,000",
      description: "10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.",
      verified: true,
      image: "https://placehold.co/600x400",
    },
    {
      name: "Azuki",
      symbol: "AZUKI",
      floorPrice: "3.8 ETH",
      volume24h: "654 ETH",
      change24h: "-1.5%",
      holders: "4,234",
      totalSupply: "10,000",
      description: "A brand for the metaverse. Take the red bean to join the garden.",
      verified: true,
      image: "https://placehold.co/600x400",
    },
];

const SearchPage = () => {
    const {searchQuery, setSearchQuery} = useSearchQuery();
    const [isSearching, setIsSearching] = useState<boolean>(false);

    return (
        <div className="flex flex-row gap-6">
            <div className="space-y-6 flex-1">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Collection Search</h1>
                    <p className="text-gray-500">Search and analyze NFT collections</p>
                </div>
                <div className="w-full h-fit rounded-lg border border-gray-300 bg-white p-4 shadow-xs">
                    <div className="flex flex-col gap-2">
                        <span className="text-2xl font-semibold leading-none tracking-tight">AI Trading Companion</span>
                        <span className="text-sm text-gray-500">Search NFT collections and instantly get AI-driven recommendations, rarity scores, market sentiment, risk alerts, and live activity from active agent swarms.</span>
                    </div>
                    <div className="space-y-4 w-full mt-6">
                        <span className="flex items-center gap-4">
                            <Input 
                                type="search"
                                placeholder="Search collections... (try 'Bored Ape', 'Punk', 'Azuki')" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button 
                                onClick={async () => {
                                    setIsSearching(true);
                                    // Simulate an API call
                                    setTimeout(() => {
                                        setIsSearching(false);
                                    }, 5000);
                                }}
                                className="btn-neutral">
                                {
                                    isSearching ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Search className="h-4 w-4" />
                                    )}
                            </Button>
                        </span>
                    </div>

                    {/* search results */}
                    {searchQuery && (
                        <div className="space-y-4 mt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    Search Results {mockNFTs.length}
                                </h3>
                                {searchQuery && (
                                    <Button onClick={() => {setSearchQuery("")}}>
                                        Clear
                                    </Button>
                                )}
                            </div>

                            {isSearching ? (
                                <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg">
                                        <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-300 rounded animate-pulse w-1/3"></div>
                                            <div className="h-3 bg-gray-300 rounded animate-pulse w-2/3"></div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            ) : mockNFTs.length > 0 ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {mockNFTs.map((collection, index) => (
                                        <div
                                        key={index}
                                        className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg cursor-pointer"
                                        >
                                        <div className="w-15 h-15 overflow-hidden rounded-lg">
                                            <img
                                                src={collection.image}
                                                alt={collection.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold truncate">{collection.name}</h4>
                                                {collection.verified && (
                                                    <Badge className="text-xs">
                                                        ✓ Verified
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{collection.description}</p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                            <div>
                                                <span className="text-gray-500">Floor:</span>
                                                <div className="font-medium">{collection.floorPrice}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">24h Vol:</span>
                                                <div className="font-medium">{collection.volume24h}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Change:</span>
                                                <div
                                                className={`font-medium ${collection.change24h.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                                                >
                                                {collection.change24h}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Holders:</span>
                                                <div className="font-medium">{collection.holders}</div>
                                            </div>
                                            </div>
                                        </div>
                                        <Button>
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                        </div>
                                ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>No collections found for "{searchQuery}"</p>
                                    <p className="text-sm">Try searching for "Bored Ape", "Punk", or "Azuki"</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <UtilityPanel />
        </div>  
    );
}
 
export default SearchPage;