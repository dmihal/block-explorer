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
  size: number;
  signature: string;
}

export const transactions: Transaction[] = [];

export function getTransactions() {
  return transactions;
}

export function getTransaction(hash: string) {
  for (const tx of transactions) {
    if (tx.hash === hash) {
      return tx;
    }
  }
  return null;
}
