import Button from "./ui/Button";
import { Link } from "react-router-dom";
import Input from "./ui/Input";
import { Menu, X } from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";


const Navbar = () => {
  const {sidebarOpen, setSidebarOpen} = useSidebar();
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button onClick={() => setSidebarOpen(!sidebarOpen)} className={`xl:hidden mr-2 transform transition-transform duration-300 ${ sidebarOpen ? "scale-x-[-1]" : "scale-x-[1]" }`}>{ !sidebarOpen ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}</Button>
            <Link className="text-xl font-bold" to="/">NFT NEXUS</Link>
          </div>

          <nav className="hidden xl:flex items-center space-x-5">
            <Button className="btn btn-ghost">EXPLORE</Button>
            <Button className="btn btn-ghost">COLLECTION</Button>
            <Button className="btn btn-ghost">AI AGENTS</Button>
            <Button className="btn btn-ghost">ANALYTICS</Button>
          </nav>

          {/* <div className="hidden xl:flex">
            <Input
              type="search"
              className="w-24 md:w-auto"
            />
          </div> */}

          <appkit-button />
        </div>
      </header>
    </>
  );
};

export default Navbar;
