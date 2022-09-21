import { useEffect, useState } from "react";
import { useAccounts } from "../../Contexts/AccountsContext";
import Account from "../Account";

import List from '@mui/material/List';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';


const InjectedAccounts = () => {
  const accounts = useAccounts();
  const [ retry, setRetry ] = useState(0);
  const [ accountsComponent, setAccountsComponent ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        if (!!accounts && Object.entries(accounts).length !== 0) {
            const accountComponent = Object.values(accounts).map((account, index) => {
                return (<Account key={account.address} account={account} imageId={index} />);
            })
            setAccountsComponent(accountComponent);
            setIsLoading(false);
            
        } else {
            if (retry < 3) {
                setTimeout(() => {
                    const addOne = num => num + 1;
                    setRetry(addOne(retry));
                }, 500);
            }
        }

    }, [retry]);


  return (
    <Box>
        <Divider>Account Board</Divider>
        {isLoading && <CircularProgress color="secondary" />}
        {!isLoading && <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {accountsComponent}
        </List>}
    </Box>
  );
};

export default InjectedAccounts;