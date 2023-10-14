import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { polygon, mainnet } from 'wagmi/chains'

export const injectedConnector = new InjectedConnector({
  chains: [polygon, mainnet],
  options: {
    shimDisconnect: true,
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains: [polygon, mainnet],
  options: {
    projectId: 'e528c307b911855869f6eefc24b6c900',
  },
})

export const coinbaseWalletConnector = new CoinbaseWalletConnector({
  chains: [polygon, mainnet],
  options: {
    appName: 'Aztec Token Staking'
  },
})
