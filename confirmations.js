const Web3 = require("web3");

async function getConfirmations(txHash){
    try{
        const web3 = new Web3(
                new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/YOUR_KEY')
        );

        const tx = await web3.eth.getTransaction(txHash);
        const tx_block = tx.blockNumber;
        const current_block = await web3.eth.getBlockNumber();

        if(tx_block === null)
            return 0;
        
        return current_block - tx_block;
    } catch(err){
        console.log(err);
    }
}

async function main(){
    let result = await getConfirmations('0x3d2ea062b31d03015e45278efc7c32924853c1deea5ac592f4d8462082e3a67b')
    console.log(result)
}

main()