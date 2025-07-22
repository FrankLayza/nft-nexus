import { Routes, Route } from "react-router-dom";
import {createAppKit} from '@reown/appkit/react'
import { wagmiAdapter, projectId, metadata, networks } from "./config";
import Home from "./pages/Home";
import DYORPage from "./components/DYORPage";
import Dashboard from "./components/Dashboard";

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks,
  themeMode: 'light',
  features: {analytics: true}
})
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dyor" element={<DYORPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
