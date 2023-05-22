require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOERLI_API_KEY = process.env.GOERLI_API_KEY;
const SEPOLIA_API_KEY = process.env.SEPOLIA_API_KEY;
const MAINNET_API_KEY = process.env.MAINNET_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.18" },
      { version: "0.4.19" },
      { version: "0.6.6" },
      { version: "0.6.7" },
      { version: "0.6.12" },
    ],
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_API_KEY,
      },
    },
    localhost: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_API_KEY,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    sepolia: {
      url: SEPOLIA_API_KEY,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      saveDeployments: true,
      blockConfirmations: 6,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
};
