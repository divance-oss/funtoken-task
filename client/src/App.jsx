import { useState } from 'react';
import './App.css'
import Account from './components/Account'
import Balance from './components/Balance'
import TransferForm from './components/TransferForm'
import { ethers, utils } from "ethers";
import TokenArtifact from "../contracts/FunToken.json";

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState();
  const [active, setActive] = useState(false);

  const tokenAddress = '0xD93AA2A4B6933297Ee030a3af10CFF0AF4B6860e';

  function isMetamaskInstalled() {
    if (window.ethereum) {
      return true;
    } else {
      return false;
    }
  }

  async function connect()  {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const [ acc ] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const signerInit = provider.getSigner();
      setContract(await new ethers.Contract(tokenAddress, TokenArtifact.abi, signerInit));
      setAccount(acc);
      setActive(true);
    } catch (ex) {
      console.log(ex)
    }
  }

  const disconnect = async () => {
    try {
      setAccount('');
      setActive(false);
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://funtoken.io/wp-content/themes/funtoken/assets/img/logo_funtoken.png" alt="logo" />
        <span>
          <Account account={account} className="App-header-element" />
          <Balance account={account} className="App-header-element" />
          {active
            ? <button onClick={disconnect}>Disconnect</button>
            : isMetamaskInstalled() ? <button onClick={connect}>Connect</button> : <span>Please install Metamask</span>
          }
        </span>
      </header>
      {account
       ?  <section className='App-section'>
            <div className='App-form-container'>
              <TransferForm contract={contract}/>
            </div>
          </section>
       : <p>Please Connect your wallet</p>
      }
    </div>
  )
}

export default App
