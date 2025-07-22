import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow">
        <main className="container min-h-screen mx-auto flex flex-row">
          <Sidebar />
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
