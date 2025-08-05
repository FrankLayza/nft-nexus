import { Routes, Route } from "react-router-dom";
import {createAppKit} from '@reown/appkit/react'
import { wagmiAdapter, projectId, metadata, networks } from "./config";
import Home from "./pages/Home";
import DYORPage from "./components/DYORPage";
import Dashboard from "./components/Dashboard";
import SearchPage from "./components/SearchPage";
import CollectionPage from "./components/CollectionPage"

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
          <Route path="Search" element={<SearchPage />} />
          <Route path="collection" element={<CollectionPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
