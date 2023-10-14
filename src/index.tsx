import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web3RainbowKitProvider from 'hooks/Web3RainbowKitProvider';
import ActiveWeb3Provider from 'hooks/useActiveWeb3';


ReactDOM.render(
  <Web3RainbowKitProvider>
    <ActiveWeb3Provider>
      <App />
    </ActiveWeb3Provider>
  </Web3RainbowKitProvider>,
  document.getElementById('root')
);