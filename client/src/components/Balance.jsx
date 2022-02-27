import { useEffect, useState } from 'react'
import { formatEther, parseUnits } from '@ethersproject/units'
import { utils } from 'ethers'

function Balance({ account }) {
  const [balance, setBalance] = useState()

  useEffect(async () => {
    if(!account) {
      return setBalance(0)
    }

    if (!!account) {
      let stale = false
        const response = await fetch('http://localhost:8082/user/' + account)
        const { balance: balanceApi } = await response.json();
        setBalance(parseUnits(balanceApi))
      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account])

  return (
    <>
      <span role="img" aria-label="gold">
        💰 FUN TOKEN
      </span>
      <span>{balance === null ? 'Error' : balance ? ` Ξ ${Number(utils.formatEther(balance)).toFixed(2)} ` : 'Ξ 0 '}</span>
    </>
  )
}

export default Balance;
