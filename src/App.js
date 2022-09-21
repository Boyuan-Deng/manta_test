import ApiContextProvider from './Contexts/ApiContext';
import AccountsContextProvider from './Contexts/AccountsContext';
import InjectedAccount from "./Components/Accounts";
import RecentBlocks from "./Components/RecentBlocks";

function App() {
  return (
      <ApiContextProvider>
        <AccountsContextProvider>
          <InjectedAccount/>
          <RecentBlocks/>
        </AccountsContextProvider>
      </ApiContextProvider>
  );
}

export default App;
