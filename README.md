# Decentralized Exchange (DEX) Application

## Overview

This is a decentralized exchange (DEX) application built using **React**, **Redux**, and **Ethers.js** to interact with Ethereum-based smart contracts. The app allows users to connect their wallets, view balances, place orders, and visualize price trends for tokens on the blockchain. It includes key features like an order book, transaction history, and live trades.

## Features

- **Blockchain Integration**: The app connects to Ethereum through MetaMask, allowing users to interact with token smart contracts and an exchange smart contract.
- **Token Trading**: Users can trade between different tokens (e.g., `DApp` and `mETH`), place buy/sell orders, and track open orders.
- **Real-Time Updates**: The app listens to events from the smart contracts and updates the UI in real-time when trades are executed, orders are filled, or tokens are transferred.
- **Charts & Data**: Visualizes token price movements using price charts and displays transaction history, trades, and the order book.
- **Responsive UI**: The interface is split into multiple sections such as the order book, price chart, and markets, providing a seamless user experience.

## How It Works

The app integrates with the Ethereum blockchain using **Ethers.js** for blockchain interaction, and **React Redux** for state management. It loads smart contracts, fetches token balances, monitors account changes, and listens to blockchain events.

### Components

1. **Navbar**: Displays the current account and allows the user to connect their MetaMask wallet.
2. **Markets**: Shows available markets for token trading.
3. **Balance**: Displays the user's balance for each token.
4. **Order**: Allows the user to place buy or sell orders.
5. **PriceChart**: Visualizes the token's price history in chart format.
6. **Transactions**: Shows the user's transaction history.
7. **Trades**: Displays the list of recent trades.
8. **OrderBook**: Displays the current open orders (buy and sell).
9. **Alert**: Shows alerts or notifications based on app interactions.

## Setup & Installation

To run this application, follow the steps below:

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system.
- **MetaMask**: You will need MetaMask installed in your browser to interact with the app.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/DEX-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd DEX-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

- Update the smart contract addresses in the `config.json` file. The app relies on the smart contracts for the tokens (`DApp`, `mETH`) and the exchange.
- Example `config.json`:
  ```json
  {
    "31337": {
      "DApp": { "address": "0x..." },
      "mETH": { "address": "0x..." },
      "exchange": { "address": "0x..." }
    }
  }
  ```

### Running the Application

1. Start the React development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Interactions with the Blockchain

### Loading Blockchain Data

When the app loads, it performs the following actions:

1. **Connects to the blockchain provider**: Using MetaMask to load the Ethereum provider.
2. **Loads network information**: Fetches the current chain ID (e.g., Hardhat, Kovan).
3. **Fetches account and balance**: Retrieves the user’s MetaMask account and token balances.
4. **Loads smart contracts**: Loads the token and exchange smart contracts using the addresses specified in `config.json`.
5. **Subscribes to blockchain events**: Listens for changes to accounts, network, and smart contract events like trades, order fills, and cancellations.

### Supported Operations

- **Placing Orders**: Users can submit buy or sell orders for tokens.
- **Viewing Balances**: Token balances are fetched and displayed in real-time.
- **Order Management**: The app shows open orders in the order book, including buy and sell orders.
- **Transaction History**: Displays a list of past transactions.
- **Live Trading**: Trades executed on the blockchain are displayed in the trades section.

## Technology Stack

- **React**: Frontend library for building the user interface.
- **Redux**: State management for handling blockchain data and user interactions.
- **Ethers.js**: Library for connecting to Ethereum and interacting with smart contracts.
- **MetaMask**: Ethereum wallet for managing accounts and connecting to the app.
- **Solidity** (for smart contracts, not shown in this file): Used to write the smart contracts deployed on Ethereum.
- **JSON**: Configuration file to manage network addresses of smart contracts.

## License

This project is licensed under the MIT License.
