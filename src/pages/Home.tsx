import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CardGrid from "../components/CardGrid";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow">
        <main className="container min-h-screen mx-auto flex flex-row h-[calc(100vh-80px)]">
          <Sidebar />
          <CardGrid className="flex-1 h-full overflow-y-auto" />
        </main>
      </div>
    </div>
  );
};

export default Home;
