const web3Controller = (web3, contract) => {

  const getBalance = async (req, res) => {
    const { id } = req.params;
    const balance = await contract.methods.balanceOf(id).call();
    res.status(200).json({
      balance: web3.utils.fromWei(balance, "ether"),
    });
  }

  const getTotalSupply = async (req, res) => {
    const supply = await contract.methods.totalSupply().call()
    res.status(200).json({
      balance: web3.utils.fromWei(supply, "ether"),
    });
  }

  return {
    getBalance,
    getTotalSupply
  }
}

module.exports = web3Controller;
