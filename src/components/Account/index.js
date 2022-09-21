import { BigNumber } from 'bignumber.js';
import { useApi } from "../../contexts/ApiContext";
import React, { useEffect, useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


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
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={`${account.meta.name}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Account address:
              </Typography>
              { `${account.address}` }
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Account balance:
              </Typography>
              { `${balance} DOL` }
            </React.Fragment>
          }
        />
      </ListItem>
  );
};

export default Account;
