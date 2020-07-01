import { getVal, setVal } from './data-storage';

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
  const transactions = getVal('transactions', []) as Transaction[];
  return transactions;
}

export function getTransaction(hash: string) {
  const transactions = getVal('transactions', []) as Transaction[];

  for (const tx of transactions) {
    if (tx.hash === hash) {
      return tx;
    }
  }
  return null;
}

export function addTransaction(tx: Transaction) {
  const transactions = getVal('transactions', []) as Transaction[];

  setVal('transactions', [...transactions, tx]);
}
