import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CardGrid from "../components/CardGrid";
import UtilityPanel from "../components/RightPanel";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow">
        <main className="container min-h-screen mx-auto flex flex-row">
          <Sidebar />
          <div className="flex flex-row flex-1 p-6 gap-6">
            <CardGrid />
            <UtilityPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
