const { getNamedAccounts, network } = require("hardhat");
const { getWeth, AMOUNT } = require("./getWeth");
const { networkConfig } = require("../helper-hardhat-config");

async function main() {
  await getWeth();

  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const wethAddress = networkConfig[chainId].wethAddress;
  0;
  // getLendingpool
  const ILendingPool = await getLendingPool(deployer, chainId);
  console.log(`lending pool address : ${ILendingPool.address}`);

  // approve the weth to lendingpool
  const erc20approved = await approveERC20(
    wethAddress,
    AMOUNT,
    ILendingPool.address,
    deployer
  );

  //   deposit collateral
  await ILendingPool.deposit(wethAddress, AMOUNT, deployer, 0);
  console.log("deposited....");

  const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
    await ILendingPool.getUserAccountData(deployer);
  console.log(`total collateral in eth : ${totalCollateralETH}`);
  console.log(`total DEbt in eth : ${totalDebtETH}`);
  console.log(`total availableBorrows in eth : ${availableBorrowsETH}`);

  // getting dai/eth price
  const Daiprice = await getDaiEthFeed();
  const DaitoBorrow =
    availableBorrowsETH.toString() * 0.95 * (1 / Daiprice.toNumber());
  console.log(`Dai which is available to borrow : ${DaitoBorrow}`);
}

//-------------------------- get the lendingpool contract
async function getLendingPool(account, chainId) {
  const IlendingPoolAddressProvider = await ethers.getContractAt(
    "ILendingPoolAddressesProvider",
    networkConfig[chainId].IlendingpoolAddressProvider,
    account
  );
  const lendingPoolAddress = await IlendingPoolAddressProvider.getLendingPool();

  const IlendingPool = await ethers.getContractAt(
    "ILendingPool",
    lendingPoolAddress,
    account
  );
  return IlendingPool;
}
// -------------------------approve the weth token
async function approveERC20(erc20Address, amount, spenderAddress, signer) {
  const IERC20 = await ethers.getContractAt("IERC20", erc20Address, signer);
  const tx = await IERC20.approve(spenderAddress, amount);
  await tx.wait(1);

  console.log("approved");
}
// ------------------------get dai eth price feed
async function getDaiEthFeed() {
  const DaiEthfeed = await ethers.getContractAt(
    "AggregatorV3Interface",
    networkConfig[network.config.chainId].AggregatorV3Interface
  );
  const feed = (await DaiEthfeed.latestRoundData())[1];
  console.log(`dai eth price feed is ${feed.toString()}`);
  return feed;
}

// ---------------------borrow the dai from aave
async function borrowDai(IlendingPool, DaiAmount, account) {
  await ILendingPool.borrow(
    networkConfig[network.config.chainId].DaiAddress,
    DaiAmount,
    1,
    0,
    account
  );
  console.log("you h've borrowed.....");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
