const { getNamedAccounts, network, ethers } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

const AMOUNT = ethers.utils.parseEther("0.02");

async function getWeth() {
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const wethAddress = networkConfig[chainId].wethAddress;
  const iweth = await ethers.getContractAt("IWeth", wethAddress, deployer);
  //   console.log(iweth.address);
  const txResponse = await iweth.deposit({ value: AMOUNT });
  await txResponse.wait(1);

  const wethBalance = await iweth.balanceOf(deployer);

  console.log(`amount of weth received ${wethBalance} `);
}

getWeth();
module.exports = { getWeth, AMOUNT };
