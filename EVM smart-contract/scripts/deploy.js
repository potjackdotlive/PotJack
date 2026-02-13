#!/usr/bin/env node

import ConfigLoader from "./config-loader.js";
import hre from "hardhat";
import { spawn } from 'child_process';

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  const network = args[0] || "sepolia";
  
  console.log(`\n🚀 Starting deployment to ${network}...`);
  
  // Load configuration
  const configLoader = new ConfigLoader();
  
  try {
    const config = configLoader.loadAllConfigs(network);
    console.log(`✅ Configuration loaded for ${network}`);
    
    // Validate configuration
    if (!configLoader.validateConfig(network)) {
      throw new Error(`Invalid configuration for network: ${network}`);
    }
    
    console.log(`\n📋 Configuration Summary:`);
    console.log(`   Network: ${config.network.name}`);
    console.log(`   Chain ID: ${config.network.chainId}`);
    console.log(`   VRF Coordinator: ${config.network.vrfCoordinator}`);
    
    // Set environment variables for ignition
    process.env.NETWORK = network;
    
    console.log(`\n🔧 Compiling contracts...`);
    await hre.run("compile");
    
    console.log(`\n📦 Deploying Raffle contract...`);
    
    // Run the ignition deployment using spawn
    
    return new Promise((resolve, reject) => {
      const ignitionProcess = spawn('npx', ['hardhat', 'ignition', 'deploy', 'ignition/modules/Raffle.ts', '--network', network, '--verify', '--reset'], {
        stdio: 'inherit'
      });
      
      ignitionProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Ignition deployment failed with code ${code}`));
        }
      });
    });
    
   
  } catch (error) {
    console.error(`\n❌ Deployment failed:`, error.message);
    process.exit(1);
  }
}

// Helper function to list available networks
function listNetworks() {
  const configLoader = new ConfigLoader();
  const networks = configLoader.getAvailableNetworks();
  
  console.log("\n📋 Available networks:");
  networks.forEach((network) => {
    try {
      const config = configLoader.loadNetworkConfig(network);
      console.log(`   ${network}: ${config.name} (Chain ID: ${config.chainId})`);
    } catch (error) {
      console.log(`   ${network}: Configuration error`);
    }
  });
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--list") || args.includes("-l")) {
  listNetworks();
  process.exit(0);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
🚀 Raffle Deployment Script

Usage:
  node scripts/deploy.js [network]

Arguments:
  network        Network to deploy to (default: sepolia)

Examples:
  node scripts/deploy.js sepolia
  node scripts/deploy.js arbitrumSepolia
  node scripts/deploy.js --list

Available networks:
  sepolia, arbitrumSepolia
`);
  process.exit(0);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 