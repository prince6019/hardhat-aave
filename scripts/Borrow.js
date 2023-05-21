const { getNamedAccounts, network } = require("hardhat");
const { getWeth } = require("./getWeth");
const { networkConfig } = require("../helper-hardhat-config");

async function main() {
  await getWeth();

  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const wethAddress = networkConfig[chainId].wethAddress;
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
