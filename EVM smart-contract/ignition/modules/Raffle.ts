    // ignition/modules/Lottery.ts
    import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
    import "dotenv/config";

    // Import the config loader
    import ConfigLoader from "../../scripts/config-loader.js";

    export default buildModule("RaffleModule", (m) => {
      const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

      // Get network from environment or default to sepolia
      const network = process.env.NETWORK || "sepolia";
      
      console.log(`Loading configuration for network: ${network}`);
      
      // Load configuration
      const configLoader = new ConfigLoader();
      const config = configLoader.loadAllConfigs(network);
      
      // Validate configuration
      if (!configLoader.validateConfig(network)) {
        throw new Error(`Invalid configuration for network: ${network}`);
      }

      // Core parameters from config
      const subscriptionId = m.getParameter(
        "subscriptionId",
        BigInt(config.network.subscriptionId)
      );
      const callbackGasLimit = m.getParameter(
        "callbackGasLimit",
        BigInt(config.network.callbackGasLimit)
      );
      const entranceFee = m.getParameter("entranceFee", BigInt(config.network.entranceFee));
      const gasLane = m.getParameter("gasLane", config.network.keyHash);
      const vrfCoordinator = m.getParameter("vrfCoordinator", config.network.vrfCoordinator);
      const beneficiaryAddress = m.getParameter(
        "beneficiaryAddress",
        config.network.beneficiaryAddress
      );

      // Price feed parameters from config
      const btcToUsdPriceFeed = m.getParameter("btcToUsdPriceFeed", config.network.btcToUsdPriceFeed || ZERO_ADDRESS);
      const nativeToUsdPriceFeed = m.getParameter("nativeToUsdPriceFeed", config.network.nativeToUsdPriceFeed || ZERO_ADDRESS);
      const btcToNativePriceFeed = m.getParameter("btcToNativePriceFeed", config.network.btcToNativePriceFeed || ZERO_ADDRESS);

      // Token configuration arrays
      const tokenAddresses: string[] = [];
      const tokenPriceFeeds: string[] = [];

      // Convert tokens object to arrays
      const tokens = Object.values(config.tokens);
      tokens.forEach((token: any) => {
        tokenAddresses.push(token.address);
        tokenPriceFeeds.push(token.priceFeed);
        console.log(`Added ${token.name} token: ${token.address}`);
      });

      console.log(`Deploying Raffle with ${tokenAddresses.length} supported tokens`);

      const raffle = m.contract("Raffle", [
        subscriptionId,
        gasLane,
        entranceFee,
        callbackGasLimit,
        vrfCoordinator,
        beneficiaryAddress,
        btcToUsdPriceFeed,
        nativeToUsdPriceFeed,
        btcToNativePriceFeed,
        tokenAddresses,
        tokenPriceFeeds
      ]);

      return { raffle };
    });
