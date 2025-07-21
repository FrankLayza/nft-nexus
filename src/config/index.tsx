import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

export const projectId = import.meta.env.VITE_PROJECT_ID;
if (!projectId) {
  throw new Error("NO Project ID found");
}

export const metadata = {
  name: "NFT NEXUS",
  description: "nft analyzer",
  url: window.location.origin,
  icons: ["../../public/nexus_pfp.jpg"],
};

export const networks = [mainnet, arbitrum, sepolia] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
