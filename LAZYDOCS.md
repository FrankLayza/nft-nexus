
<!-- LAZYDOCS START -->
# Project Title nft-nexus

NFT Nexus is a decentralized, AI-driven platform designed to analyze NFT collections and provide actionable insights through a modern full-stack application. It combines a React + TypeScript frontend with Vite for tooling and Tailwind CSS for styling, alongside a Node.js/Express backend leveraging the Alchemy NFT API for metadata retrieval. The platform employs AI models via Hugging Face’s API to evaluate NFT traits, rarity, market sentiment, and risk levels, generating buy/sell recommendations and price predictions. Users can explore NFTs by contract or wallet address, view trait analytics, and connect wallets to assess owned assets. The backend uses Swagger for API documentation and integrates intelligent agents for real-time metadata analysis, while the frontend features Zustand for state management and React Query for data handling. Built with ESLint for code quality and daisyUI for components, the project aims to simplify NFT decision-making through data-driven AI insights, though it remains under active development for enhanced features.

## Tech Stack
- **Runtime:** Node.js
- **Dependencies:** 
@reown/appkit
@reown/appkit-adapter-wagmi
@tailwindcss/vite
@tanstack/react-query
lucide-react
marked
react
react-dom
react-router-dom
tailwindcss
viem
wagmi
zustand
- **Dev Tools:** 
@reown/appkit
@reown/appkit-adapter-wagmi
@tailwindcss/vite
@tanstack/react-query
lucide-react
marked
react
react-dom
react-router-dom
tailwindcss
viem
wagmi
zustand


## Installation
Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd <project>
npm install   # or yarn / pnpm
```

## Usage
Run the development server:

```bash
npm run dev
```


## Project Structure
```
├── App.tsx
├── assets
│   ├── confused.jpg
│   ├── nexus.png
│   └── react.svg
├── components
│   ├── Agent-panel.tsx
│   ├── CardGrid.tsx
│   ├── CollectionPage.tsx
│   ├── Dashboard.tsx
│   ├── DYORPage.tsx
│   ├── Navbar.tsx
│   ├── RightPanel.tsx
│   ├── SearchPage.tsx
│   ├── Sidebar.tsx
│   ├── swarm-mode-panel.tsx
│   ├── ui
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Progress.tsx
│   │   ├── Separator.tsx
│   │   └── SkeletonLoader.tsx
│   └── wagmiButtons
│       └── ActionButton.tsx
├── config
│   └── index.tsx
├── contexts
│   ├── FilterContext.tsx
│   ├── SearchQueryContext.tsx
│   └── SidebarContext.tsx
├── index.css
├── main.tsx
├── pages
│   └── Home.tsx
├── services
│   └── NFTService.ts
├── utils
│   ├── fetchNFT.ts
│   ├── rarityScore.ts
│   └── test.json
└── vite-env.d.ts
```

<!-- LAZYDOCS END -->
