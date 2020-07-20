export interface UTXO {
  value: string;
  asset: string;
  account: string;
}

export interface Transaction {
  hash: string;
  root: string | null;
  block: number | null;
  inputs: UTXO[];
  outputs: UTXO[];
  feeToken: string;
  fee: string;
  size: number;
  signature: string;
}

export function getTransactions() {
  return [] as Transaction[];
}

export function getTransaction(hash: string) {
  return null;
}
