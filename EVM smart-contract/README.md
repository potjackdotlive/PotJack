# Blockchain Lottery

A simple on-chain lottery example using Solidity, Chainlink VRF v2 and deployed via Hardhat Ignition.

## Installation

1. Clone the repository

2. Install dependencies  
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with:

    ```dotenv
    # Sepolia testnet RPC URL
    SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_INFURA_KEY"

    # Your wallet private key (0x...)
    PRIVATE_KEY="0xYOUR_PRIVATE_KEY"

    # Chainlink VRF v2 settings
    VRF_COORDINATOR_V2="0x...VRF Coordinator Address"
    SUBSCRIPTION_ID="1234"           # Chainlink subscription ID
    KEY_HASH="0x...Gas Lane KeyHash"
    INTERVAL="300"                   # Time interval in seconds
    ENTRANCE_FEE="0.01"              # Entrance fee in ETH
    CALLBACK_GAS_LIMIT="500000"      # Callback gas limit

    # (Optional) Etherscan API key for verification
    ETHERSCAN_API_KEY="YOUR_ETHERSCAN_KEY"
    ```

## Hardhat Configuration

- **Solidity**: 0.8.30  
- **Network**: Sepolia (chainId 11155111)  
- **Ignition module**: `LotteryModule` from `./ignition/modules/Lottery.js`

`hardhat.config.ts` is already set to load environment variables, plugins and the Ignition module.

## Scripts & Commands

- Compile contracts  
  ```bash
  npx hardhat compile
  ```

- Run tests (if any)  
  ```bash
  npx hardhat test
  ```

- Start a local node  
  ```bash
  npx hardhat node
  ```

- Deploy to Sepolia
  ```bash
  npx hardhat ignition deploy \
    ./ignition/modules/Lottery.js \
    --network sepolia
  ```
  If you want to verify the contract immediately upon deployment just add `--verify` option.


- Clean previous futures and force fresh deploy  
  ```bash
  npx hardhat ignition deploy \
    ./ignition/modules/Lottery.js \
    --network sepolia \
    --reset
  ```

- Verify contract on Etherscan  
  ```bash
  npx hardhat ignition verify <DEPLOYMENT_ID>
  ```

## Project Structure

- `contracts/Lottery.sol` — main lottery contract  
- `ignition/modules/Lottery.js` — Hardhat Ignition deployment module  
- `hardhat.config.ts` — network & plugin configuration  

## Resources

- Hardhat: https://hardhat.org  
- Ignition: https://hardhat.org/ignition  
- Chainlink VRF v2 docs: https://docs.chain.link/docs/vrf/v2  

## Price feeds and tokens (testnet):

- USDC: 0x73d219b3881e481394da6b5008a081d623992200
- DAI: 0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a

- BTC/USD: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
- USDC/USD: 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E
- DAI/USD: 0x14866185B1962B63C3Ea9E03Bc1da838bab34C19


