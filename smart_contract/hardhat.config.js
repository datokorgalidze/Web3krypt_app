// require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-ignition");
// require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/gutlWaw29jr-WAciBUEwf8Ci0ytH54OF',
      accounts: ['41147684248598f0905c168824c6e12696ad7960092e712d238b0167be6965a1'],
    },
  },
};















// module.exports = {
//   solidity: "0.8.24",
// };




// module.exports = {
//   solidity: {
//     version: "0.8.0",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
// };
