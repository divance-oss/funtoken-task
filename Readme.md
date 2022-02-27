# Funtoken

![image](https://user-images.githubusercontent.com/3521485/155858751-bed2f5e1-634b-41b1-80f7-75ce08ef3144.png)

## Description

Dapp for transfering FUN tokens

## Token Deploy info Rinkeby

Deploying contracts with the account: 0xb7B5DE77b7aAA50dD38a3dBE10eF423F183bC630
Account balance: 100000000000000000
Token address: 0xD93AA2A4B6933297Ee030a3af10CFF0AF4B6860e


```
npx hardhat compile
npx hardhat run scripts/deploy.js --network rinkeby
```
## USAGE

### RUN Rest Api

```sh
npm install
npm run rest-api
```
### RUN Client

```sh
cd client
npm install
npm run dev
```

## Tests

### Smart contract

```
npx hardhat test
```
or

```
npm run test
```

### Rest API

```
npm run test-api
```
### CLIENT

WIP


## Tools

### hardhat commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
## Env vars

APP_TOKEN_ADDRESS=0xD93AA2A4B6933297Ee030a3af10CFF0AF4B6860e
APP_ADMIN_ADDRESS=0xb7B5DE77b7aAA50dD38a3dBE10eF423F183bC630
RINKEBY_PRIVATE_KEY= --> This PK has no real assets Warning never use it on mainnet
INFURA_API_KEY=af81b75368af499a949f204caa1b2bdf
