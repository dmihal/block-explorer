import api from './api';
import { fromWei } from 'ethjs-unit';

export interface Asset {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  id?: string;
}

export const assets: { [address: string]: Asset } = {
  '0x0000000000000000000000000000000000000000': {
    address: '0x0000000000000000000000000000000000000000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  '0x6b175474e89094c44da98b954eedeac495271d0f': {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    name: 'Dai',
    symbol: 'DAI',
    decimals: 18,
  },
  '0xfed4976b61517a687d866ef4357a67bb89474002': {
    address: '0xfed4976b61517a687d866ef4357a67bb89474002',
    name: 'FakeDAI',
    symbol: 'FDAI',
    decimals: 18,
    id: '0x01',
  },
};

export function getAssetName(address: string) {
  return assets[address] ? assets[address].name : address;
}

const units: { [decimals: number]: string } = {
  0: 'wei',
  18: 'ether',
};

export function formatValue(value: string, assetAddress: string) {
  const decimals = assets[assetAddress] ? assets[assetAddress].decimals : 18;
  const unit = units[decimals]!;
  return fromWei(value, unit);
}

export async function getAsset(addressOrId: string): Promise<Asset> {
  const token = await api.getToken(addressOrId);
  return assets[token];
}

export async function getAssets(addresses?: string[]) {
  if (!addresses) {
    return Object.values(assets);
  }

  return Promise.all(addresses.map((address: string) => getAsset(address)));
}
