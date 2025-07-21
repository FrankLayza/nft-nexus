import { Routes, Route } from "react-router-dom";
import {createAppKit} from '@reown/appkit/react'
import { wagmiAdapter, projectId, metadata, networks } from "./config";
import Home from "./pages/Home";

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
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
