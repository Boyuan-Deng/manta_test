import React, { useReducer, useContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
// Initial state for `useReducer`
const INIT_STATE = {
  socket: "wss://ws.rococo.dolphin.engineering",
  api: null,
  apiError: null,
  apiState: null,
  blockNumber: 0
};

// Reducer function for `useReducer`
const reducer = (state, action) => {
  switch (action.type) {
  case 'CONNECT_INIT':
    return { ...state, apiState: 'CONNECT_INIT' };

  case 'CONNECT':
    return { ...state, api: action.payload, apiState: 'CONNECTING' };

  case 'CONNECT_SUCCESS':
    return { ...state, apiState: 'READY' };

  case 'CONNECT_ERROR':
    return { ...state, apiState: 'ERROR', apiError: action.payload };

  case 'DISCONNECTED':
    const provider = action.payload;
    if (state.provider === provider) {
      return { ...state, apiState: 'DISCONNECTED' };
    }
    return state;

  case 'UPDATE_BLOCK':
    return { ...state, blockNumber: action.payload };

  default:
    throw new Error(`Unknown type: ${action.type}`);
  }
};

// Connecting to the Substrate node

const connect = async (dispatch) => {
  dispatch({ type: 'CONNECT_INIT' });

  const provider = new WsProvider("wss://ws.rococo.dolphin.engineering");
  const _api = new ApiPromise({ provider });

  dispatch({ type: 'CONNECT', payload: _api });

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api });

    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(async () => {
      dispatch({ type: 'CONNECT_SUCCESS' });
    });
  });
  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
  _api.on('error', (err) => dispatch({ type: 'CONNECT_ERROR', payload: err }));
  _api.on('disconnected', () =>
    dispatch({ type: 'DISCONNECTED', payload: provider })
  );

};

const ApiContext = React.createContext();

const ApiContextProvider = (props) => {

  const initState = { ...INIT_STATE };
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {connect(dispatch)}, []);
  const value = {...state}
  return (
    <ApiContext.Provider value={value}>
      {props.children}
    </ApiContext.Provider>
  );
};

const useApi = () => ({...useContext(ApiContext)});

export { useApi };
export default ApiContextProvider;