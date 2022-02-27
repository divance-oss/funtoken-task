
import { utils } from 'ethers';

export const getTotalSupply = ({ contract }) => {
  const supply = await contract.totalSupply();
  console.log('supply', utils.formatEther(supply));
}

export const burnTonken = ({ contract, amount }) => {
  const transaction = await contract.burn(utils.parseEther(amount));
  await transaction.wait();
}

async function mintTonken({ contract, amount }) {
  const transaction = await contract.mint('0xB84C933cCeB9747cc090B22e03e4578d34322244', utils.parseEther(amount));
  await transaction.wait();
}
