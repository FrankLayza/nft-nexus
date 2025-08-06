# 🧠 NFT Nexus

## 📌 Project Overview

**NFT Nexus** is a decentralized, AI-powered platform for analyzing NFT collections.  
Built as a fullstack application with a **JuliaOS backend** and a modern **React + TypeScript frontend**, it leverages intelligent agents to deliver real-time insights into NFT metadata—helping users make informed decisions on NFT purchases and sales.

Key capabilities:

- Explore NFTs by contract or wallet address
- View trait rarity and metadata analysis
- Connect a wallet to analyze owned NFTs
- Receive AI-driven buy/sell recommendations

---

## 🚧 Work in Progress Disclaimer

⚠️ **NFT Nexus is actively under development.**  
While the core collection analysis and wallet integration are functional, the platform is still evolving. Some features (e.g., advanced filtering, richer visualizations) are experimental. Suitable for feedback, exploration, or bounty/grant submissions.

---

## 🧠 Features

- 🔎 **NFT Collection Analysis** — Fetches metadata from Alchemy NFT API v3
- 🧬 **Trait & Rarity Breakdown** — Computes trait frequencies across collections
- 🤖 **AI-Powered Insights** — Julia agents analyze metadata to suggest buy/sell actions
- 👛 **Wallet Integration** — Connect your wallet to explore personal NFT holdings
- 🌐 **Cross-Chain Ready** — Supports Ethereum and compatible EVM chains
- 🎛️ **Filterable Interface** — Filter by blockchain, collection, rarity and more

---

## ⚙️ Tech Stack

| Layer        | Stack & Tools                                      |
| ------------ | -------------------------------------------------- |
| **Frontend** | React, TypeScript, Tailwind CSS, Zustand, Vite     |
| **Backend**  | Julia, JuliaOS agents, REST API via HTTP interface |
| **API**      | [Alchemy NFT API v3](https://www.alchemy.com/nft)  |
| **Database** | PostgreSQL (via Docker)                            |
| **DevOps**   | Docker Compose, `.env` configuration               |

---

## 📂 Folder Structure

/
├── backend/ # JuliaOS backend, agent logic, Docker setup
│ ├── docker-compose.yml
│ ├── src/
│ └── README.md # backend-specific setup
├── frontend/ # React + TypeScript UI (NFT explorer, wallet view)
│ ├── public/
│ ├── src/
│ └── .env.example
└── README.md # ← main repository overview

> 📎 For backend environment variables and agent setup, see [`/backend/README.md`](./backend/README.md)

---

## 🛠️ Installation & Setup

### 🔧 Prerequisites

- [Docker](https://www.docker.com/) (latest version)
- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) globally installed
  ```bash
  npm install -g pnpm
  ```
- [Postman](https://www.postman.com/) (for agent management)

## 🐳 Backend Setup (JuliaOS + PostgreSQL)

```bash
cd backend
cp .env.example .env           # configure DB and Alchemy keys
docker compose up --build      # build and start backend + DB
```

## 💻 Frontend Setup (React + TypeScript)

```bash
cp .env.example .env           # set Reown Appkit and Alchemy API key
pnpm install
pnpm dev                       # start development server
```

---

## 🤖 JuliaOS Agent Management

### 📋 Prerequisites
- Backend running on `http://localhost:8052` (default JuliaOS port)
- Postman installed and configured

### 🔧 Step 1: Create an Agent

**Method: POST** `http://localhost:8052/api/v1/agents`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "nft-analyzer-001",
  "description": "AI agent for NFT analysis and price prediction",
  "instructions": "You are an expert NFT analyst. Analyze the provided NFT data including collection, token ID, attributes, floor price, and total supply. Provide insights on rarity, market sentiment, price predictions, risk assessment, and buy/sell recommendations.",
  "model": "gpt-4",
  "tools": []
}
```

### 🚀 Step 2: Set Agent to Running State

**Method: PUT** `http://localhost:8052/api/v1/agents/nft-analyzer-001/state`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "state": "running"
}
```

### ⚡ Step 3: Trigger Agent Analysis

**Method: POST** `http://localhost:8052/api/v1/agents/nft-analyzer-001/webhook`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "collection": "Bored Ape Yacht Club",
  "token_id": "2223",
  "attributes": [
    { "trait_type": "Mouth", "value": "Grin" },
    { "trait_type": "Background", "value": "Orange" },
    { "trait_type": "Eyes", "value": "Blue Beams" }
  ],
  "floor_price": 12.579996,
  "total_supply": 10000
}
```

### 📊 Step 4: Retrieve Analysis Results

**Method: GET** `http://localhost:8052/api/v1/agents/nft-analyzer-001/logs`

This returns the agent's analysis logs, which are parsed by the frontend to extract structured results.

---

## 🔍 Agent Response Format

The agent will analyze the NFT and return insights in the following format:

```json
{
  "collection": "Bored Ape Yacht Club",
  "token_id": "2223",
  "rarity_score": 8.5,
  "market_sentiment": "Bullish",
  "price_prediction": 15.2,
  "risk_level": "Medium",
  "recommendation": "Hold",
  "confidence": 85.0,
  "insights": [
    "Orange background is relatively rare (12% frequency)",
    "Blue Beams eyes are highly sought after",
    "Grin mouth trait shows good market performance"
  ]
}
```

---

## ✅ Quick-start Checklist

| Step | Description                                          |
| ---- | ---------------------------------------------------- |
| ✅   | Clone this repository                                |
| ✅   | Install Docker, Node.js (LTS), and `pnpm`            |
| ✅   | Create `.env` files in `/backend` and `/frontend`    |
| ✅   | Run `docker compose up --build` in `/backend`        |
| ✅   | Run `pnpm dev` in `/frontend`                        |
| ✅   | Create JuliaOS agent via Postman (see above)         |
| ✅   | Set agent state to "running"                         |
| ✅   | Test agent with sample NFT data                      |
| ✅   | Open `http://localhost:3000` and connect your wallet |

## 🤝 Contributing

We welcome your ideas and improvements!  
You can contribute by:

- Improving Julia agents or analysis logic
- Enhancing UI/UX or wallet features
- Expanding support for more chains or marketplaces

### To contribute:

1. **Fork** the repository
2. **Create a new branch** (`feature/xyz`, `fix/bug`, etc.)
3. **Commit** your changes
4. **Open a Pull Request** with a clear description of what you've added or changed

## 📄 License

This project is licensed under the MIT License.
