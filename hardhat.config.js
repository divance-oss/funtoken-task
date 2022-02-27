require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};
