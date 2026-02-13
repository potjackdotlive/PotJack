import fs from 'fs';
import path from 'path';

class ConfigLoader {
  constructor() {
    this.configPath = path.join(process.cwd(), 'config');
  }

  /**
   * Load network configuration
   * @param {string} network - Network name (e.g., 'sepolia', 'arbitrum-sepolia')
   * @returns {Object} Network configuration
   */
  loadNetworkConfig(network) {
    const filePath = path.join(this.configPath, 'networks.json');
    const config = this.loadJsonFile(filePath);
    
    if (!config[network]) {
      throw new Error(`Network configuration not found for: ${network}`);
    }
    
    return config[network];
  }

  /**
   * Load tokens configuration
   * @param {string} network - Network name
   * @returns {Object} Tokens configuration
   */
  loadTokensConfig(network) {
    const filePath = path.join(this.configPath, 'tokens.json');
    const config = this.loadJsonFile(filePath);
    
    if (!config[network]) {
      console.warn(`⚠️ Tokens configuration not found for: ${network}`);
      return {};
    }
    
    return config[network];
  }

  /**
   * Load all configurations for a network
   * @param {string} network - Network name
   * @returns {Object} Combined configuration
   */
  loadAllConfigs(network) {
    return {
      network: this.loadNetworkConfig(network),
      tokens: this.loadTokensConfig(network)
    };
  }

  /**
   * Get available networks
   * @returns {string[]} Array of available network names
   */
  getAvailableNetworks() {
    const filePath = path.join(this.configPath, 'networks.json');
    const config = this.loadJsonFile(filePath);
    return Object.keys(config);
  }

  /**
   * Load and parse JSON file
   * @param {string} filePath - Path to JSON file
   * @returns {Object} Parsed JSON
   */
  loadJsonFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Failed to load config file: ${filePath}. Error: ${error.message}`);
    }
  }

  /**
   * Validate configuration
   * @param {string} network - Network name
   * @returns {boolean} True if configuration is valid
   */
  validateConfig(network) {
    try {
      const config = this.loadAllConfigs(network);
      
      // Validate required network fields
      const requiredNetworkFields = [
        'vrfCoordinator', 'subscriptionId', 'keyHash', 'chainId',
        'callbackGasLimit'
      ];
      
      for (const field of requiredNetworkFields) {
        if (!config.network[field]) {
          throw new Error(`Missing required network field: ${field}`);
        }
      }

      return true;
    } catch (error) {
      console.error(`Configuration validation failed for ${network}:`, error.message);
      return false;
    }
  }
}

export default ConfigLoader; 