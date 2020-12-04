const fs = require('fs')
const HDWalletProvider = require('truffle-hdwallet-provider')

function getData(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })
}

(async() => {
    const configJson = await getData('./config.json')
    const config = JSON.parse(configJson)
    const Web3 = require("web3")
    const provider = new HDWalletProvider([config.privateKey], config.rpcEndpoint, 0, 1)

    const web3 = new Web3(provider)
    console.log('Web3 is connecting...')
    await web3.eth.net.isListening()
    console.log('Web3 is connected.')

    let accounts = await web3.eth.getAccounts()
    web3.eth.defaultAccount = web3.eth.accounts[0]

    const hash = await web3.utils.keccak256("0x" + config.bytecode)
    console.log('Init code hash: ', hash)
})();
