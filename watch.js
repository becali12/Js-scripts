const Web3 = require("web3");


const account = '0x66D0A322E94A8B3be18CCe1E88c34a0E91C28d97'.toLowerCase();

async function watch(){
    const web3 = new Web3(
        new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/YOUR_KEY')
    );

 
    let block = await web3.eth.getBlock('latest');
    console.log(`Searching in block ${block.number} `);

    if(block && block.transactions){
        for (let txHash of block.transactions){
            let tx = await web3.eth.getTransaction(txHash)
            if (tx.to !== null)
                if(account === tx.to.toLowerCase()){
                    console.log(`Transaction found on block ${ block.number }`);
                    console.log({
                        address: tx.from,
                        hash: tx.hash,
                        value: web3.utils.fromWei(tx.value, 'ether'),
                        timestamp: new Date()
                    });
                }
        }
    }    
}


setInterval(()=> {
    watch();
}, 7000)






