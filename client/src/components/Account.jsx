function Account({ account }) {

  return (
    <>
      <span role="img" aria-label="robot">
        🧾
      </span>
      <span>
        {account === null
          ? '-'
          : account
          ? ` ${account.substring(0, 6)}...${account.substring(account.length - 4)} `
          : '0x...  '}
      </span>
    </>
  )
}

export default Account;
