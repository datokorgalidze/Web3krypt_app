const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");

module.exports = buildModule("TransactionsModule", (m, hre) => {
  const network = hre.network;

  // Check if the network configuration is available
  if (!network || !network.config) {
    console.error("Network configuration is not available.");
    return;
  }

  // Check if the network URL is provided
  const url = network.config.url;
  if (!url) {
    console.error("Network URL is not provided in the configuration.");
    return;
  }

  // Define your deployment logic here
  ethers.getContractFactory("Transactions").then((TransactionsFactory) => {
    // Deploy the contract
    TransactionsFactory.deploy({ value: ethers.utils.parseEther("0.001") })
      .then((transactionsContract) => {
        // Wait for the deployment transaction to be mined
        transactionsContract.deployed().then(() => {
          // Log the contract address
          console.log("Transactions deployed at:", transactionsContract.address);
        });
      })
      .catch((error) => {
        console.error("Error deploying contract:", error);
      });
  }).catch((error) => {
    console.error("Error getting contract factory:", error);
  });
});














// const JAN_1ST_2030 = 1893456000;
// const ONE_GWEI = 1_000_000_000n;

// module.exports = buildModule("LockModule", (m) => {
//   const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
//   const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

//   const lock = m.contract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   return { lock };
// });
