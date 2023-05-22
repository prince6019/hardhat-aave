const developmentChains = ["hardhat", "localhost"];

const networkConfig = {
  31337: {
    wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    IlendingpoolAddressProvider: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
    AggregatorV3Interface: "0x773616e4d11a78f511299002da57a0a94577f1f4",
    DaiAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
};

module.exports = {
  developmentChains,
  networkConfig,
};
