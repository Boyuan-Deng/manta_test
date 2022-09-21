import React, { useContext, useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';


const getAccounts = async (setAccounts) => {
    await web3Enable("manta_test");
    let allAccounts = await web3Accounts();
    return allAccounts;
}

const AccountsContext = React.createContext();

const AccountsContextProvider = (props) => {
    const [accounts, setAccounts] = useState(null);
    const [isPolkadotJsInjected, setIsPolkadotJsInjected] = useState(!!window.injectedWeb3['polkadot-js']);
    useEffect(() => {
      if (isPolkadotJsInjected) {
        getAccounts().then(accounts => {
          setAccounts(accounts);
        })
      } else {
        setTimeout(() => {
          setIsPolkadotJsInjected(!!window.injectedWeb3['polkadot-js'])
        }, 500);
      }
    }, [isPolkadotJsInjected])


  return (
    <AccountsContext.Provider value={accounts}>
      {props.children}
    </AccountsContext.Provider>
  );
};

const useAccounts = () => ({ ...useContext(AccountsContext) });

export { useAccounts };
export default AccountsContextProvider;