import api from './api';

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

function transformTx(fuelTx: any): Transaction {
  const tx: Transaction = {
    hash: fuelTx.decoded.keccak256Packed(),
    root: '0x',
    block: 0,
    inputs: fuelTx.inputProofs.map((input: any) => ({
      account: input.properties.owner.get(),
      asset: input.properties.token.hex(),
      value: input.properties.value.get().toString(),
    })),
    outputs: fuelTx.outputProofs.map((output: any) => ({
      account: output.properties.owner.get(),
      asset: output.properties.token.hex(),
      value: output.properties.amount.get().toString(),
    })),
    feeToken: '0x01',
    fee: '0',
    size: fuelTx.decoded.sizePacked(),
    signature: '0x',
  };
  return tx;
}

export function getTransactions() {
  return [] as Transaction[];
}

export async function getTransaction(hash: string) {
  const tx = await api.getTransactionByHash(hash).catch((error: any) => null);

  if (!tx) {
    console.log('cannot find transaction', hash);
    return null;
  }

  return transformTx(tx);
}
