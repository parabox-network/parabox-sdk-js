

# 概述

`parabox-sdk` 是一个方法, 他接收 `provider` 和 `Web3 Class`(可选) 作为参数, 返回一个支持 Parabox 的 sdk 实例. 该实例下多个对象的使用方法, 如 `sdk.utils`, `sdk.eth`, `sdk.shh`, `sdk.bzz` 均与 [web3](https://web3js.readthedocs.io/en/1.0/getting-started.html) 相同.

# 需注意

Websocket 链接已支持, 但是 pub/sub 模式尚未在 Parabox 上实现.

# 版本

`parabox-sdk` 严格遵守 Semver, 并与 Parabox 的 MAJOR 和 MINOR 版本号保持一致.

# 预备知识

## 学习 `web3@1.0`

如无特别声明, `parabox-sdk` 的使用与 [`web3@1.0.0`](https://web3js.readthedocs.io/en/1.0/getting-started.html) 一致.

## 学习 `Parabox`

`parabox-sdk` 用于 Parabox 相关服务.



# 快速开始

可以通过 yarn 安装 `parabox-sdk`

```shell
yarn add git remote https://github.com/parabox-network/parabox-sdk-js.git 
````

或者直接通过 script 标签引入

```html
<script src="node_modules/parabox-sdk/lib/bundle.js" />
```

# 创建 `sdk.js`

```javascript
import ParaboxSDK from 'parabox-sdk' 
// or 
// const ParaboxSDK = require('parabox-sdk').default;
const sdk = ParaboxSDK('http://localhost:1337')
```

# Parabox SDK

通过 `sdk.base` 与 Parabox 链和 Parabox 智能合约交互.

## RPC API 参考

### peerCount

```javascript
/**
 * @method peerCount
 * @desc request peer count of Parabox
 * @param null
 * @return {Promise<string>} Promise returns peer count
 */
sdk.base.peerCount()
```

### getMetaData

```javascript
/**
 * @method getMetaData
 * @desc request metadata of Parabox, including `chainId`, `chainName`, `operator`, `website`, `genesisTimestamp`, `validators`, `blockInterval`, `tokenName`, `tokenSymbol`, `tokenAvatar`
 * @param null
 * @return {Promise<object>} Promise returns metadata
 * {
 *   "result": {
 *    "website": "https://www.example.com",
 *    "validators": [
 *     "0x71b028e49c6f41aaa74932d703c707ecca6d7321",
 *     "0xee01b9ba97671e8a1891e85b206b499f106822a1",
 *     "0x486bb688c8d29056bd7f87c26733048b0a6abda1",
 *     "0x31042d4f7662cddf8ded5229db3c5e7302875e11"
 *    ],
 *    "tokenSymbol": "PRB",
 *    "tokenName": "Parabox",
 *    "tokenAvatar": "https://avatars1.githubusercontent.com/u/35361817",
 *    "operator": "test-operator",
 *    "number": "0xA2DE3",
 *    "genesisTimestamp": 1532314871400,
 *    "chainName": "test-chain",
 *    "chainId": 1,
 *    "blockInterval": 3000
 *   }
 * }
 */
sdk.base.getMetaData()
```

### getAbi

```javascript
/**
 * @method getAbi
 * @desc request abi object from the Parabox
 * @param {string} - contract address
 * @param {string} - block number
 * @return {Promise<Abi>} Promise returns abi
 */
sdk.base.getAbi('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7', 'latest')
```

### getCode

```javascript
/**
 * @method getCode
 * @desc request contract code from the Parabox
 * @param {string} - contract address
 * @param {string} - block number
 * @return {Promise<string>} Promise returns code
 */
sdk.base.getCode('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7', 'latest')
```

### getBalance

```javascript
/**
 * @method getBalance
 * @desc request balance of specified account
 * @param {string} - account address
 * @return {Promise<BN>} Promise returns balance
 */
sdk.base.getBalance('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7')
```

### getBlock

```javascript
/**
 * @method getBlock
 * @desc request block of specified hash or number
 * @param {string|number} - block hash or block number
 * @return {Promise<Block>} Promise returns block
 */
sdk.base.getBlock(0)
```

### getBlockByNumber

```javascript
/**
 * @method getBlockByNumber
 * @desc request block of specified number
 * @param {number} - block number
 * @return {Promise<Block>} Promise returns block
 */
sdk.base.getBlockByNumber(0)
```

### getBlockByHash

```javascript
/**
 * @method getBlockByHash
 * @desc request block of specified hash
 * @param {string} - block hash
 * @return {Promise<Block>} Promise returns block
 */
sdk.base.getBlockByHash('0x0c56def738d15d9dfaad64ad246e8b5fe39e175ce3da308ea1018869522a1a4d')
```

### getBlockNumber

```javascript
/**
 * @method getBlockNumber
 * @desc request current block number of Parabox
 * @param null
 * @return {Promise<number>} Promise returns current block number
 */
sdk.base.getBlockNumber()
```

### getTransactionCount

```javascript
/**
 * @method getTransactionCount
 * @desc get transaction account of specified account
 * @param {string} - account address
 * @return {Promise<number>} Promise returns transaction count of account address
 */
sdk.base.getTransactionCount('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7')
```

### getLogs

```javascript
/**
 * @method getLogs
 * @desc get logs by filter object and abi
 * @param {object} - filter object
 * @param {object} - [abi], event abi
 * @return {Promise<logs>} Promise returns logs of block or transaction
 */

const abi = [
  {
    indexed: false,
    name: '_sender',
    type: 'address',
  },
  {
    indexed: false,
    name: '_text',
    type: 'string',
  },
  {
    indexed: true,
    name: '_time',
    type: 'uint256',
  },
]
const filter = {
  address: '0x35bD452c37d28becA42097cFD8ba671C8DD430a1',
  fromBlock: '0x0',
}
sdk.base.getLogs(filter, abi).then(console.log)
```

### newMessageFilter

```javascript
/**
 * @method newMessageFilter
 * @desc creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call getFilterChanges.
 * @param {object} - topics object
 * @return {Promise<string>} Promise returns filter id
 */

const topics = {
  topics: ['0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3'],
}
sdk.base.newMessageFilter(topics)
```

### newBlockFilter

```javascript
/**
 * @method newBlockFilter
 * @desc creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call getFilterChanges.
 * @param null
 * @return {Promise<string>} Promise returns filter id
 */

sdk.base.newBlockFilter()
```

### getFilterChanges

```javascript
/**
 * @method getFilterChanges
 * @desc polling method for a filter, which returns an array of logs which occurred since last poll. If parameter is a block filter id, it will return an array of block hashes, otherwise it will return an array of transaction logs
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

sdk.base.getFilterChanges('0x1')
```

### getFitlerLogs

```javascript
/**
 * @method getFitlerLogs
 * @desc Returns an array of all logs matching filter with given id.
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

sdk.base.getFitlerLogs('0x1')
```

### deleteMessageFilter

```javascript
/**
 * @method deleteMessageFilter
 * @desc remove a filter with given id. Should always be called when watch is no longer needed. Additonally Filters timeout when they aren't requested with getFilterChanges for a period of time.
 * @param {string} - filter id
 * @return {Promise<boolean>} Promise returns success
 */

sdk.base.deleteMessageFilter('0x1')
```

### sign

```javascript
/**
 * @method sign
 * @desc sign message by wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @return {Promise<string>} Promise returns signed message
 */

sdk.base.sign('hello', '0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58')
```

### personal.sign

```javascript
/**
 * @method personal.sign
 * @desc sign message by wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @param {string} - password of specified account
 * @return {Promise<string>} Promise returns signed message
 */

sdk.base.personal.sign('message', '0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58', 'password')
```

### sendTransaction

```javascript
/**
 * @method sendTransaction
 * @desc send transaction to Parabox, if transaction including `privateKey`, or wallet has been set, it will sign the transaction locally, otherwise the transaction will be send to node and signed remote.
 * @param {object} - transaction object
 * @return {Promise<object>} Promise returns transaction hash object
 */

sdk.base.sendTransaction(transaction)
```

### sendSignedTransaction

```javascript
/**
 * @method sendSignedTransaction
 * @desc send signed transaction to Parabox
 * @param {string} - signed transaction message
 * @return {Promise<object>} Promise returns transaction hash object
 */

sdk.base.sendSignedTransaction('signedTransaction')
```

### getTransactionReceipt

```javascript
/**
 * @method getTransactionReceipt
 * @desc request transaction receipt
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction receipt object
 */

sdk.base.getTransactionReceipt('0xe418a9cf4f4257aaed8c4c1259d30fb41ea650f4b4ef95ebb28cb3b29ccb1d91')
```

```javascript
/**
 * @method getTransactionProof
 * @desc request transaction proof
 * @param {string} - transaction hash
 * @return {Promise<string>} Promise returns transaction proof
 */

sdk.base.getTransactionProof('0xe418a9cf4f4257aaed8c4c1259d30fb41ea650f4b4ef95ebb28cb3b29ccb1d91')
```

### getTransaction

```javascript
/**
 * @method getTransaction
 * @desc request transaction by hash
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction object
 */

sdk.base.getTransaction('0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58')
```

## Contract Reference

### Deploy Contract

```javascript
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)
const bytecode =
  '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029'
const privateKey = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const transaction = {
  from: '0xb4061fA8E18654a7d51FEF3866d45bB1DC688717',
  privateKey,
  nonce: 999999,
  quota: 1e10,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999,
  value: '0x0',
}
// create contract instance
const myContract = new sdk.base.Contract(abi)

// deploy contract and get transaction result
const txRes = await myContract
  .deploy({
    data: bytecode,
    arguments: [],
  })
  .send(tx)

// get transaction receipt by transaction hash
const receipt = await web3.listeners.listenToTransactionReceipt(txRes.hash)

// set contract address to contract instance
myContract.options.address = receipt.contractAddress
```

### Store Abi

```javascript
/**
 * @method storeAbi
 * @desc send contract abi to Parabox
 * @param {string} - contract hash
 * @param {abi} - abi object
 * @return {Promise<object>} Promise returns transaction receipt object
 */
const contractAddress = '0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58'
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)

const receipt = sdk.base.storeAbi(contractAddress, abi, transaction)
```

### Use Contract

```javascript
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)
const contract = new sdk.base.Contract(abi, contractAddress)

// call method
// get method is specified by contract through abi
// contract.methods.myMethod(paramters).call(transaction)
contract.methods.get().call()

// send method
// set method is specified by contract through abi
// contract.methods.myMethod(parameters).send(transaction)
contract.methods.set(5).send(transaction)
```

## Utils API

### signer

```javascript
/**
 * @method signer
 * @desc sign a transaction
 * @param {object} transaction object
 * @param {string} [externalPrivateKey] - if external private key exsits, the one in transaction object will be overriden
 * @return {string} signedTransaction
 */
sdk.base.signer({
  privateKey: '0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d9',
  data:
    '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
  nonce: '47',
  quota: 2.1e13,
  validUntilBlock: 114930,
  version: 0,
  chainId: 1,
  value: '0',
})
```

### unsigner

```javascript
/**
 * @method unsigner
 * @desc unsign a signed transaction
 * @param {string} signed transaction
 * @return {object} unsigned transaction
 * {
 *    crypot: 0,
 *    sender: {
 *      address: 'f74b3a9c67d4b657dd335e1d5f57e7ef7d160470',
 *      publicKey: '708e8f442b8b94735d09c7f32eb05c0831f1f888dbbde5f979c0fd0613808facb857207c420b1c75a62612995a78455c2c21756e28a0a1c881d62ea3d6f975f0',
 *    },
 *    signature: '9941c2619195b833b3292a6aeb5aa568ee0a8cd5eef67e1ff77612c87121b65866483ba0c79d88445ad368459c600fbf52b6d0c20aaa507ecdaf233ff4cf2c4701',
 *    transaction: {
 *      chainId: 1,
 *      data: [...],
 *      nonce: '2e96d7a387092faa' ,
 *      quota: 1e10,
 *      to: '',
 *      validUntilBlock: 663228,
 *      value: [...],
 *      version: 0,
 *    }
 * }
 */
sdk.base.unsigner(transactionContent)
```

### transactionReceiptListener

```javascript
/**
 * @method listenToTransactionReceipt
 * @desc listen to transaction receipt by hash
 * @param {string} transaction hash
 * @return {Promise<object>} transaction receipt object
 */
sdk.listeners.listenToTransactionReceipt(result.hash).then(console.log)
```

## System Contracts API

系统合约位于 `sdk.system`, 使用方法与一般合约相同.

```javascript
sdk.system.admin
sdk.system.authorization
sdk.system.batchTx
sdk.system.chainManager
sdk.system.emergencyBrake
sdk.system.groupManagement
sdk.system.nodeManager
sdk.system.permissionManagement
sdk.system.priceManager
sdk.system.quotaManager
sdk.system.roleManagement
sdk.system.sysConfig
sdk.system.versionManage
```



## 其他功能

```javascript
/**
 * @function isPrivateKey
 * @desc check if private key is in right format
 * @param {string} - privateKey
 * @return {boolean} - valid
 */
const valid = sdk.utils.isPrivateKey('0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d')
```
