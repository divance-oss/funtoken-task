require('dotenv').config();
const express= require('express')
const app =express()
const routes = require('./routes')
const Web3 = require('web3');

app.use(express.json())
const url = `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider(url))
}

routes(app, web3);
app.listen(process.env.PORT || 8082, () => {
   console.log('REST API listening on port '+ (process.env.PORT || 8082));
})
