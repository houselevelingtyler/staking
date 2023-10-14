import { Contract } from '@ethersproject/contracts';

import StakingContract_ABI from 'contracts/AztecTokenStaking.json'
import IERC20Metadata_ABI from 'contracts/IERC20Metadata.json'

export const Networks = {
  PolygonMainNet: 137
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.PolygonMainNet]: {
    StakingContract: {
      address: '0xA13bfC3C8A1a17549DCa6ff896501Fc5196515f0',
      abi: StakingContract_ABI,
    },
    AztecToken: {
      address: '0xe5087395862a208071A7909687a6c4Fe30458F1e',
      abi: IERC20Metadata_ABI,
    }
  }
}

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getContractObjWithAddress(name, chainId, provider, contractAddress) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(contractAddress, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
