# Blockchain Configuration

This document explains how to configure the blockchain settings for the application.

## Configuration File

The blockchain configuration is stored in a JSON file with the following structure:

```json
{
  "blockchains": [
    {
      "name": "ethereum",
      "rpcUrl": "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      "chainId": 11155111,
      "contractAddresses": [
        "0x142747c254709FDDA094564b0B20d3F781101315"
      ]
    },
    {
      "name": "arbitrum",
      "rpcUrl": "https://arbitrum-sepolia.infura.io/v3/YOUR_INFURA_KEY",
      "chainId": 421614,
      "contractAddresses": [
        "0x1618be5057f865565E881bF7F00FBEF5c6a46c2a"
      ]
    }
  ]
}
```

Each blockchain configuration includes:
- `name`: A unique identifier for the blockchain
- `rpcUrl`: The URL of the RPC endpoint for the blockchain
- `chainId`: The chain ID of the blockchain
- `contractAddresses`: An array of contract addresses to monitor on the blockchain

## Custom Configuration Path

By default, the application loads the blockchain configuration from `./src/config/blockchain-config.json`. However, you can specify a custom path to the configuration file using the `BLOCKCHAIN_CONFIG_PATH` environment variable in the `.env` file:

```
# Path to blockchain configuration file (relative to project root or absolute)
BLOCKCHAIN_CONFIG_PATH=./path/to/your/custom-config.json
```

The path can be:
- Relative to the project root (e.g., `./src/config/custom-config.json`)
- Absolute (e.g., `/path/to/your/custom-config.json`)

## Verifying the Configuration

When the application starts, it will log a message indicating which configuration file was loaded:

```
Loaded blockchain configuration from ./src/config/blockchain-config.json
```

If you've specified a custom path, you should see your custom path in the log message.

If the application fails to load the configuration file, it will log an error message and exit:

```
Failed to load blockchain configuration from ./path/to/your/custom-config.json: Error: ENOENT: no such file or directory
```

## Disabling Blockchain Synchronization

You can disable blockchain synchronization entirely by setting the `DISABLE_BLOCKCHAIN_SYNC` environment variable to `true` in the `.env` file:

```
DISABLE_BLOCKCHAIN_SYNC=true
```

This will prevent the application from listening for blockchain events, regardless of the configuration file.
