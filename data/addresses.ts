// import api from './api';

export interface Address {
  address: string;
  balances: { [assetAddress: string]: string };
  transactions: string[];
}

export function getAddresses() {
  // const addresses = getVal('addresses', {}) as AddressMap;
  // return Object.values(addresses);
}

export async function getAddress(_address: string): Promise<Address | null> {
  // const account = await api.getAccount(address);
  // const id = await api.getAddressId(address);
  // const _address = await api.getAddress(await api.getAddressId(address));
  return null;
}
