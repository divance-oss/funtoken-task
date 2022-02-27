import { utils } from 'ethers';
import { useState } from 'react';
import './TransferForm.css';
import { Audio } from 'react-loader-spinner';
import Account from './Account';


const TransferForm = ({ contract }) => {
  const [transfer, setTransfer] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [lastTransaction, setLastTransaction] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateTransfer = (e, field) => {
      const value = e.target.value;
      setTransfer({...transfer, [field]: value});
  }

  async function sendFundToken() {
    try{
      const transaction = await contract.transfer(transfer.to, utils.parseEther(transfer.amount));
      const response = await transaction.wait();
      setLoading(false);
      setLastTransaction(true);
    } catch(error) {
      setErrorMessage(error.message);
      setError(true);
      setLoading(false);
    }
  }

  const submit = (e) => {
    setError(false);
    setLastTransaction(false);
    setLoading(true);
    e.preventDefault();
    sendFundToken();
  }

  return (
    <>
      <div className="container">
        <h1>Transfer Fun Tokens </h1>
        <form className="form" onSubmit={e => submit(e)}>
          <input className="form-input form-item" type="text" placeholder="To Address" onChange={ e => updateTransfer(e, 'to')} />
          <input className="form-input form-item" type="text" placeholder="Amount" onChange={ e => updateTransfer(e, 'amount')} />
          <button type="submit">Transfer</button>
        </form>
        {isLoading && <><Audio color="#ec1966" height={80} width={80} /> Loading ...</>}
        {lastTransaction && <p style={ {color : 'green' }}>{transfer.amount} Fun Token has been sent to {transfer.to}</p>}
        {isError && <p style={ {color : 'red' }}>Error: {errorMessage} </p>}
      </div>
    </>
  )
}

export default TransferForm;
