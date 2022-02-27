const { abi } = require("../../artifacts/contracts/FunToken.sol/FunToken.json");
const controller = require('./controller');

function routes(app, web3) {
  const tokenAddress = process.env.APP_TOKEN_ADDRESS; // insert TRON token contract address here
  const contract = new web3.eth.Contract(abi, tokenAddress);

  const { getBalance, getTotalSupply } = controller(web3, contract);

  app.get("/user/:id", getBalance);
  app.get("/token/supply", getTotalSupply);
}

module.exports = routes;
