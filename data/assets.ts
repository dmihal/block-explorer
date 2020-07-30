import getAPI from './api';
import { fromWei } from 'ethjs-unit';
import { getTokenMetadata } from './ethereum';

export interface Asset {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  id: string;
}

export const assets: { [address: string]: Asset } = {
  '0x0000000000000000000000000000000000000000': {
    address: '0x0000000000000000000000000000000000000000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    id: '0x00',
  },
};

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
  const address = addressOrId.length === 42
    ? addressOrId.toLowerCase()
    : (await getAPI().getToken(addressOrId)).toLowerCase();
  const id = addressOrId.length === 42
    ? await getAPI().getTokenId(addressOrId)
    : addressOrId;

  if (assets[address]) {
    return assets[address];
  }

  const metadata = await getTokenMetadata(address);
  assets[address] = {
    ...metadata,
    address,
    id,
  };

  return assets[address];
}

export async function getAssets(addresses: string[]) {
  return Promise.all(addresses.map((address: string) => getAsset(address)));
}
