import { Transaction } from './transactions';
import api from './api';

export interface Address {
  address: string;
  balances: { [assetAddress: string]: string };
  transactions: string[];
}

export function getAddresses() {
  // const addresses = getVal('addresses', {}) as AddressMap;
  // return Object.values(addresses);
}

export async function getAddress(address: string) {
  const account = await api.getAccount(address);
  const id = await api.getAddressId(address);
  // const _address = await api.getAddress(await api.getAddressId(address));
  console.log({ account, id });
  return null;
}
