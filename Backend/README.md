# Blockchain Lottery Backend

A GraphQL API backend service for aggregating and querying blockchain lottery data across multiple chains (Ethereum, BSC, Solana, etc.).

## Features

- Store and query lottery win events from smart contracts
- Support for multiple blockchains (Ethereum, BSC, Solana)
- GraphQL API for flexible data querying
- Real-time event listening from blockchain networks
- Aggregated statistics for wins by user, token, and chain

## Tech Stack

- Node.js with TypeScript
- Apollo GraphQL Server
- PostgreSQL database with TypeORM
- Ethers.js for Ethereum/BSC interaction
- Solana Web3.js for Solana interaction
- Docker for containerization

## Prerequisites

- Node.js 18+ (for local development)
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (for local development without Docker)

## Getting Started

### Code Quality Tools

This project uses ESLint and Prettier to ensure code quality and consistent formatting:

- **ESLint**: Analyzes code for potential errors and enforces coding standards
- **Prettier**: Ensures consistent code formatting

#### Available Scripts

- `yarn lint`: Check for linting issues
- `yarn lint:fix`: Automatically fix linting issues
- `yarn format`: Format code using Prettier
- `yarn format:check`: Check if code is properly formatted
- `yarn fix`: Run both lint:fix and format to fix all issues

#### Setting up in IntelliJ IDEA

1. Make sure you have the ESLint and Prettier plugins installed in IntelliJ IDEA
2. Go to Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
3. Enable ESLint and set the configuration to:
   - Automatic ESLint configuration
   - Run eslint --fix on save (optional)
4. Go to Settings > Languages & Frameworks > JavaScript > Prettier
5. Enable Prettier and set the configuration to:
   - Run on save (optional)
   - Use .prettierrc.js configuration file

### Environment Setup

1. Clone the repository
2. Copy the example environment file:
   ```
   cp .env.example .env
   ```
3. Edit the `.env` file with your database and server configuration
4. Configure CORS settings in the `.env` file:
   - Set `CORS_ORIGIN` to your frontend URL (e.g., `http://localhost:3000`) to restrict cross-origin requests
   - Leave it commented out to allow all origins (default behavior)
5. Configure blockchain settings in `src/config/blockchain-config.json`:
   - RPC URLs
   - Chain IDs
   - Smart contract addresses

### Running with Docker

The easiest way to run the application is with Docker Compose:

```bash
docker-compose up -d
```

This will start both the PostgreSQL database and the API server.

### Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure PostgreSQL is running and accessible with the credentials in your `.env` file.

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm run build
   npm start
   ```

## API Documentation

The GraphQL API is available at `http://localhost:4000/graphql` when the server is running.

### Main Queries

#### Get User
```graphql
query GetUser($address: String!) {
  user(address: $address) {
    id
    address
    totalWins
  }
}
```

#### Get Win Events
```graphql
query GetWinEvents($address: String!, $token: String, $chainId: Int) {
  winEvents(address: $address, token: $token, chainId: $chainId) {
    id
    token
    roundId
    chainId
    amount
    players {
      id
      address
    }
    blockTimestamp
    transactionHash
    winner {
      address
    }
  }
}
```

#### Get Win Statistics
```graphql
query GetWinStats($address: String, $token: String, $chainId: Int) {
  winStats(address: $address, token: $token, chainId: $chainId) {
    totalWins
    token
    chainId
    user {
      address
    }
  }
}
```

## Smart Contract Events

The backend listens for the following events from the lottery smart contracts:

- `TicketPurchased(address indexed token, uint32 indexed roundId, address indexed buyer, uint40 count, uint256 totalAmount, uint256 timestamp)`
- `FirstTicketBonusAwarded(address indexed token, uint32 indexed roundId, address indexed buyer, uint256 timestamp)`
- `WinnerPicked(address indexed token, uint32 indexed roundId, address indexed player, address[] players, uint256 amount, uint256 timestamp)`
- `StatusChanged(address indexed token, uint32 indexed roundId, uint8 oldStatus, uint8 newStatus, address indexed caller, uint256 timestamp)`

## Database Schema

The application uses the following main entities:

- `User`: Represents a blockchain address that participates in lotteries
- `WinEvent`: Records lottery win events
- `TicketPurchase`: Records ticket purchase events
- `FirstTicketBonus`: Records first ticket bonus events

## License

MIT
