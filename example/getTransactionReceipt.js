const SDK = require("../lib/index").default
const sdk = SDK("http://47.92.173.78:1337")

let txHash = "0x0e77f2076377117d942c14576ff89a8071bd9f3881c97d886f3be52ae8509332"
sdk.base.getTransactionReceipt(txHash)
.then(receipt => {
      console.log(JSON.stringify(receipt))
})
