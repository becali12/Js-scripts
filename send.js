const Web3 = require("web3");
const network = "ropsten"
const INFURA_PROJECT_ID = "YOUR_KEY"
const SIGNER_PRIVATE_KEY = "YOUR_PRIVAYE_KEY"

async function main(){

    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`
        )
    );

    const signer = web3.eth.accounts.privateKeyToAccount(SIGNER_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(signer);

    const tx = { 
        from: signer.address,
        to: "0x66D0A322E94A8B3be18CCe1E88c34a0E91C28d97",
        value: web3.utils.toWei("0.001"),
    }

    tx.gas = await web3.eth.estimateGas(tx);

    const receipt = await web3.eth.sendTransaction(tx).once("transactionHash", (txhash) => {
        console.log("Mining transaction..");
        console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
    
    console.log(`Mined in block ${receipt.blockNumber}`);
}

main();