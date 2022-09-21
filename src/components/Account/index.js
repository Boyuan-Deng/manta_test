import { BigNumber } from 'bignumber.js';
import { useApi } from "../../contexts/ApiContext";
import React, { useEffect, useState } from 'react';


const Account = ({ account }) => {
  const { api } = useApi();
  const [ balance, setBalance ] = useState(null); 

  const getAccountMetadata = async () => {
    await api.isReady;
    const unsub = await api.query.system.account(account.address, ({ nonce, data: balance }) => {
      console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
      const balanceInAtomicUnit = new BigNumber(balance.free.toString());
      const balanceInBaseUnit = balanceInAtomicUnit.div(new BigNumber("10e17")).toNumber();
      setBalance(balanceInBaseUnit);
    });
  }

  useEffect(() => {
    getAccountMetadata();
  }, []);

  
  return (
    <div>
      <div>{`Account name: ${account.meta.name}`}</div>
      <div>{`Account address: ${account.address}`}</div>
      <div>{`Account balance: ${balance}`}</div>
    </div>
  );
};

export default Account;
