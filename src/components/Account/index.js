import { BigNumber } from 'bignumber.js';
import { useApi } from "../../contexts/ApiContext";
import React, { useEffect, useState } from 'react';


const Account = ({ account }) => {
  const { api } = useApi();
  const [ balance, setBalance ] = useState(null); 

  const getAccountMetadata = async () => {
    await api.isReady;
    await api.query.system.account(account.address, ({ nonce, data: balance }) => {
      const balanceInAtomicUnit = new BigNumber(balance.free.toString());
      const balanceInBaseUnit = balanceInAtomicUnit.div(new BigNumber("10e17")).toNumber();
      setBalance(balanceInBaseUnit);
    });
  }

  useEffect(() => {
    getAccountMetadata();
  }, []);

  
  return (
    <div id={account.address}>
      <div>{`Account name: ${account.meta.name}`}</div>
      <div>{`Account address: ${account.address}`}</div>
      <div>{`Account balance: ${balance}`}</div>
    </div>
  );
};

export default Account;
