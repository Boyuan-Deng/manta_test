import { useEffect, useState } from "react";
import { useAccounts } from "../../contexts/AccountsContext";
import Account from "../Account";


const InjectedAccounts = () => {
  const accounts = useAccounts();
  const [ retry, setRetry ] = useState(0);
  const [ accountsComponent, setAccountsComponent ] = useState(null);
  useEffect(() => {
        if (!!accounts && Object.entries(accounts).length !== 0) {
            const accountComponent = Object.values(accounts).map((account) => {
                return (<Account account={account}/>);
            })
            setAccountsComponent(accountComponent);
            
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
    <div>
    <div>This is Injected Accounts Component</div>
    <div>{accountsComponent}</div>
    </div>
  );
};

export default InjectedAccounts;