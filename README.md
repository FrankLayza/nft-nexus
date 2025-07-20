# NFT Analyzer dApp

A decentralized AI-powered NFT analysis platform built using JuliaOS agent infrastructure and a custom React + Tailwind CSS frontend. The platform enables users to evaluate NFT collections using AI models, agent swarms, and optional on-chain data interaction.

---

## Overview

The NFT Analyzer helps users:

- Get real-time insights and metadata analysis on NFTs
- Understand market trends and floor price fluctuations
- Evaluate rarity, sentiment, and community performance using AI agents
- Interact optionally with blockchain data sources or contracts

This project leverages **JuliaOS** for agent logic, swarm orchestration, and optional no-code dashboarding.

---

## Features

- **AI Agent Execution**  
  Uses `agent.useLLM()` to analyze NFT metadata, floor price trends, and community signals.

- **Swarm Coordination**  
  JuliaOS Swarm is used to assign tasks to multiple agents (e.g. image analysis, metadata parsing, valuation scoring).

- **NFT Valuation Engine**  
  Fetches NFT data and runs it through custom scoring logic using machine learning outputs.

- **Custom React + Tailwind UI**  
  A professional UI for users to search, analyze, and compare NFT collections and tokens.

- **Optional Blockchain Access**  
  Can query floor prices and collection info directly from APIs like Alchemy, OpenSea, or on-chain contracts (Ethereum, Solana, etc).

---

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend / Agent Layer**: JuliaOS agents & swarms
- **AI**: `agent.useLLM()` for NLP-based scoring
- **Blockchain (optional)**: Alchemy SDK, OpenSea API, or RPC interaction

---

## ESLint Configuration (for Devs)

This project uses a minimal ESLint setup for TypeScript + React via Vite.

To expand linting capabilities for production apps, consider using:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
