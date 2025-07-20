import Button from "./Button";

const Navbar = () => {
    return ( 
        <>
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">NFT NEXUS</h2>
                    </div>

                    <nav className="flex items-center space-x-5">
                        <Button className="btn btn-ghost">EXPLORE</Button>
                        <Button className="btn btn-ghost">COLLECTION</Button>
                        <Button className="btn btn-ghost">AI AGENTS</Button>
                        <Button className="btn btn-ghost">ANALYTICS</Button>
                    </nav>

                    <div>
                        <input type="search" placeholder="Search NFT, Collections" className="input input-bordered w-24 md:w-auto" />
                    </div>
                </div>
            </header>
        </>
     );
}
 
export default Navbar;