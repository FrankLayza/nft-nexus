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

## 🐳 Backend Setup (JuliaOS + PostgreSQL)

cd backend
cp .env.example .env # configure DB and Alchemy keys
docker compose up --build # build and start backend + DB

## 💻 Frontend Setup (React + TypeScript)

cp .env.example .env # set Reown Appkit and Alchemy API key
pnpm install
pnpm dev # start development server

---

## ✅ Quick-start Checklist

| Step | Description                                          |
| ---- | ---------------------------------------------------- |
| ✅   | Clone this repository                                |
| ✅   | Install Docker, Node.js (LTS), and `pnpm`            |
| ✅   | Create `.env` files in `/backend` and `/frontend`    |
| ✅   | Run `docker compose up --build` in `/backend`        |
| ✅   | Run `pnpm dev` in `/frontend`                        |
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
4. **Open a Pull Request** with a clear description of what you’ve added or changed

## 📄 License

This project is licensed under the MIT License.
