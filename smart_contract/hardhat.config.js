// require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-ignition");
// require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/gutlWaw29jr-WAciBUEwf8Ci0ytH54OF",
      accounts: [PRIVATE_KEY],
    },
  },
};
