import ApiContextProvider from './contexts/ApiContext';
import AccountsContextProvider from './contexts/AccountsContext';
import InjectedAccount from "./components/Accounts";
import RecentBlocks from "./components/RecentBlocks";

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
