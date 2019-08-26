const SDK = require("../lib/index").default
const sdk = SDK("http://47.92.173.78:1337")

let privateKey = sdk.utils.randomHex(32)
let address = sdk.base.accounts.privateKeyToAccount(privateKey).address
let account = {
      privateKey,
      address
}
console.log(account)
