const Web3 = require("web3");

const account = '0x66D0A322E94A8B3be18CCe1E88c34a0E91C28d97'.toLowerCase();

async function watchSubscribe(){

    const web3 = new Web3(
        new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/YOUR_KEY')
    );

    web3ws = new Web3( 
        new Web3.providers.WebsocketProvider(
            'wss://ropsten.infura.io/ws/v3/YOUR_KEY'
        )
    )

    const subscription = web3ws.eth.subscribe('pendingTransactions', (err, res) => {
        if (err) console.log(err);
    });

    console.log("Watching for transactions...");
    subscription.on('data', (txHash) => {
        setTimeout(async () => {
            try {
                let tx = await web3.eth.getTransaction(txHash);
                if(tx)
                if(tx.to !== null){
                    if(tx.to.toLowerCase() === account ) {
                        console.log(
                            {
                                address: tx.from,
                                value: web3.utils.fromWei(tx.value, 'ether'),
                                timestamp: new Date()
                            });
                    }
                }

            } catch (err) {
                console.error(err);
            }
    }, 10000);
});
}

watchSubscribe();