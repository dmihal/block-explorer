import api from './api';

export interface Address {
  address: string;
  balances: { [assetAddress: string]: string };
  transactions: string[];
}

export async function getAddresses(): Promise<Address[]> {
  return [];
}

export async function getAddress(address: string): Promise<Address | null> {
  const inputHashes = await api.getAccount(address);
  const inputs = await Promise.all(inputHashes.map(({ type, hash }: any) => api.getInputByHash(type, hash)));

  const transactions = inputs
    .filter((input: any) => input.properties.transactionHashId)
    .map((input: any) => input.properties.transactionHashId.get());

  return {
    address,
    balances: {},
    transactions,
  };
}
