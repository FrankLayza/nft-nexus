import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow">
                <main className="overflow-hidden">
                    <Sidebar />
                </main>
            </div>
        </div>
    );
}
 
export default Home;