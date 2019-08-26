const SDK = require("../lib/index").default
const sdk = SDK("http://47.92.173.78:1337")


const transfer = async () => {
      let blockNumber = await sdk.base.getBlockNumber()
      let metaData = await sdk.base.getMetaData()

      let account = {
            "address": "0xea57cde6138f1c049fc3894331e3ab16c5a07896",
            "private": "0x74e2aa5ae5e29aa00bd7a30b8f47db1990e57b66feb9e27984bc5d2c8e7e35be"
      }
      let to = "0xf499ed0e7a5c28bcf610ff4c866c8e5ea421f63c"
      let value = sdk.utils.numberToHex(1e18)
      let quota = 30000
      let tx = {
            to,
            privateKey: account.private,
            nonce: sdk.utils.randomHex(3),
            quota,
            chainId: metaData.chainIdV1,
            version: metaData.version,
            validUntilBlock: blockNumber + 99,
            value,
      }

      let balanceBeforeTransaction = await sdk.base.getBalance(account.address)
      console.log("account banance before transaction:", balanceBeforeTransaction)
      let res = await sdk.base.sendTransaction(tx)
      console.log("send transaction with hash:", res.hash)
      let receipt = await sdk.listeners.listenToTransactionReceipt(res.hash)
      if (!!receipt.errorMessage) {
            console.log("transfer failed with error:", receipt.errorMessage)
      } else {
            console.log("transfer success.")
      }
      let balanceAfterTransaction = await sdk.base.getBalance(account.address, "pending")
      console.log("account banance after transaction:", balanceAfterTransaction)

      let cost = sdk.utils.toBN(balanceBeforeTransaction).sub(sdk.utils.toBN(balanceAfterTransaction)).sub(sdk.utils.toBN(value))
      console.log("transfer cost:", cost.toString())
      let quotaPrice = await sdk.system.priceManager.methods.getQuotaPrice().call()
      console.log("transfer should cost:", receipt.quotaUsed * quotaPrice)
}
transfer()

