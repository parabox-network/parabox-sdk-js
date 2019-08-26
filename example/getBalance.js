const SDK = require("../lib/index").default
const sdk = SDK("http://47.92.173.78:1337")

let address = "0xea57cde6138f1c049fc3894331e3ab16c5a07896"
sdk.base.getBalance(address)
.then(balance => {
      console.log(balance)
})
