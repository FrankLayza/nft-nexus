import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { wagmiAdapter } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";
import { FilterProvider } from "./contexts/filterContext.tsx";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <SearchQueryProvider>
          <FilterProvider>
            <WagmiProvider config={wagmiAdapter.wagmiConfig}>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </WagmiProvider>
          </FilterProvider>
        </SearchQueryProvider>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
