import Button from "./Button";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Link className="text-xl font-bold" to="/">NFT NEXUS</Link>
          </div>

          <nav className="flex items-center space-x-5">
            <Button className="btn btn-ghost">EXPLORE</Button>
            <Button className="btn btn-ghost">COLLECTION</Button>
            <Button className="btn btn-ghost">AI AGENTS</Button>
            <Button className="btn btn-ghost">ANALYTICS</Button>
          </nav>

          <div>
            <input
              type="search"
              placeholder="Search NFT, Collections"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>

          <appkit-button />
        </div>
      </header>
    </>
  );
};

export default Navbar;
