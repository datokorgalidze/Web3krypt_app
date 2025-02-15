# Krypt - Web 3.0 Blockchain Application

![Krypt](https://i.ibb.co/DVF4tNW/image.png)

This project is a blockchain-based application that utilizes Solidity smart contracts and connects to MetaMask for user interactions. The project is configured using Hardhat and deployed on the Sepolia test network.

## Project Structure

The project consists of two main parts:

1. **Client**: The frontend part of the application, built with React and various web technologies.
2. **Smart Contract**: The backend part of the application, built with Solidity and deployed using Hardhat.

## Getting Started

### Prerequisites

To run this project, you'll need the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MetaMask](https://metamask.io/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/datokorgalidze/Web3krypt_app.git
   cd Web3krypt_app
cd client
npm install
cd ../smart_contract
npm install
cd client
npm run dev
cd smart_contract
npx hardhat run scripts/deploy.js --network sepolia

