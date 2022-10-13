import React, {useState} from 'react';
import './App.css';

function App() {
  const ethers = require('ethers')
  const provider_Metamask = new ethers.providers.Web3Provider(window.ethereum);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
  const infuraProvider = new ethers.providers.InfuraProvider(
    'goerli',
    API_KEY
  );

  const [blockNumber, setBlockNumber] = useState(null);
  const [txSent, setTxSent] = useState(null);
  const [txSentInfura, setTxSentInfura] = useState(null);

  const sendTransaction = async (address, amount, signer=null) => {
    console.log(address, amount);
    if (signer==null){
      if (!window.ethereum)
        console.error("No wallet found!");
      else {
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const tx = await signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther(amount)
        });
        console.log("tx", tx);
        setTxSent('Transaction initiated! Tx hash: ' + tx.hash);
      }
    }
    else
    {
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount)
      });
      console.log("tx", tx);
      setTxSentInfura('Transaction initiated! Tx hash: ' + tx.hash);
    }
  }

  const handleButton1 = async () => {
    const latest_block = await infuraProvider.getBlockNumber('latest');
    setBlockNumber(latest_block);
  }

  const handleButton2 = async () => {
    const latest_block = await provider_Metamask.getBlockNumber('latest');
    setBlockNumber(latest_block);
  }

  const handleSubmitWeb3 = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const address = data.get('address');
    const amount = data.get('amount');
    sendTransaction(address, amount);
  }
  
  const handleSubmitInfura = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const address = data.get('address');
    const amount = data.get('amount');
    const signer = new ethers.Wallet(PRIVATE_KEY, infuraProvider);
    sendTransaction(address, amount, signer);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3> Press one of the buttons to find out the latest block number: </h3>
        <div>
          <button onClick={handleButton1}>InfuraProvider</button>
          <button onClick={handleButton2}>Web3Provider</button>
          <p>{blockNumber}</p>
        </div>
        <h3> Fill out the form to send a transaction via Web3Provider: </h3>
        <div>
        <form onSubmit={handleSubmitWeb3}>
          <input type="text" name="address" placeholder='Recipient Address' />
          <input type="text" name="amount" placeholder='Amount (ETH)' />
          <input type="submit" value="Send w/ Web3Provider" />
        </form>
        <p>{txSent}</p>
        </div>
        <h3> Fill out the form to send a transaction via InfuraProvider: </h3>
        <div>
        <form onSubmit={handleSubmitInfura}>
          <input type="text" name="address" placeholder='Recipient Address' />
          <input type="text" name="amount" placeholder='Amount (ETH)' />
          <input type="submit" value="Send w/ InfuraProvider" />
        </form>
        <p>{txSentInfura}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
