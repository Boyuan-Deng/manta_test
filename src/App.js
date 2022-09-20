import ApiContextProvider from './contexts/ApiContext';
import AccountsContextProvider from './contexts/AccountsContext';
import InjectedAccount from "./components/Accounts";

function App() {
  return (
      <ApiContextProvider>
        <AccountsContextProvider>
          <InjectedAccount/>
        </AccountsContextProvider>
      </ApiContextProvider>
  );
}

export default App;
