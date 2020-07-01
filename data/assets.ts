import { fromWei } from 'ethjs-unit';

interface Asset {
  address: string;
  name: 'Dai',
  symbol: 'DAI',
  decimals: number;
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

export function getAssets(addresses?: string[]) {
  if (!addresses) {
    return Object.values(assets);
  }

  return addresses.map((address: string) => assets[address]);
}
