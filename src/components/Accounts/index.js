// import Account from "./components/Account"

import { useAccounts } from "../../contexts/AccountsContext/index.js";
import { useApi } from "../../contexts/ApiContext";



const getAccountInfo = async (api, accountAddr) => {
    const accountInfo = await api.query.system.account(accountAddr);
    return accountInfo;
}
const InjectedAccounts = () => {
    const {api , apiState} = useApi();
    const accounts = useAccounts();
    if (apiState === "READY") {
        console.log("value: ", apiState);
        console.log('accounts: ', accounts)
        console.log("type of accounts: ", typeof(accounts))
        Object.values(accounts).map(accountAddr => {
            getAccountInfo(api, accountAddr).then((accountInfo) => {
                console.log(`Account - ${accountAddr} has ${accountInfo}`)
            })
        })
    }

  return (
    <div></div>
  );
};

export default InjectedAccounts;