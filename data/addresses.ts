import getAPI from './api';

export interface Address {
  address: string;
  balances: { [assetAddress: string]: string };
  transactions: string[];
  assets: string[];
}

export async function getAddresses(): Promise<Address[]> {
  return [];
}

export async function getAddress(address: string): Promise<Address | null> {
  const inputHashes = await getAPI().getAccount(address);
  const inputs = await Promise.all(inputHashes.map(({ type, hash, isWithdraw }: any) =>
    getAPI().getInputByHash(type, isWithdraw, hash)));

  const transactions = inputs
    .filter((input: any) => input.properties.transactionHashId)
    .map((input: any) => input.properties.transactionHashId().get());

  const assets = new Set(inputs.map((input: any) => input.properties.token().hex()));

  return {
    address,
    balances: {},
    transactions,
    assets: Array.from(assets),
  };
}
