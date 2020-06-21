export interface UTXO {
  value: string;
  asset: string;
  account: string;
}

export interface Transaction {
  hash: string;
  block: number;
  inputs: UTXO[];
  outputs: UTXO[];
  size: number;
  signature: string;
}

export const transactions: { [hash: string]: Transaction } = {
  '0x6bf6ca63cb47cde2195bbf95f2f1e0b048b4d361e0bba3f70bcbea9a284e133e': {
    hash: '0x6bf6ca63cb47cde2195bbf95f2f1e0b048b4d361e0bba3f70bcbea9a284e133e',
    block: 0,
    inputs: [
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        value: '1000000000000000000',
        account: '0x0000000000000000000000000000000000000001',
      },
    ],
    outputs: [
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        value: '1000000000000000000',
        account: '0x0000000000000000000000000000000000000002',
      },
    ],
    size: 2000,
    signature: '0x7cde2195bbf95f2f1e0b048b4d361e0b6ba3f70bcbbf6ca63cb4ea9a284e133e',
  },
  '0x7cde2170bcbea9a284e133e95bbf95f2f1e0b046bf6ca63cb48b4d361e0bba3f': {
    hash: '0x7cde2170bcbea9a284e133e95bbf95f2f1e0b046bf6ca63cb48b4d361e0bba3f',
    block: 1,
    inputs: [
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        value: '1000000000000000000',
        account: '0x0000000000000000000000000000000000000002',
      },
    ],
    outputs: [
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        value: '1000000000000000000',
        account: '0x0000000000000000000000000000000000000003',
      },
    ],
    size: 2000,
    signature: '0x7cde2195bbf95f2f1e0b048b4d361e0b6ba3f70bcbbf6ca63cb4ea9a284e133e',
  },
};

export function getTransactions() {
  return Object.values(transactions);
}

export function getTransaction(hash: string) {
  return transactions[hash] || null;
}
