import getAPI from './api';
import { getBlock } from './blocks';

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
  timestamp: number;
  assets: string[];
}

async function transformTx(fuelTx: any, hash: string): Promise<Transaction> {
  const block = await getBlock(parseInt(fuelTx.blockHeight));
  const rootHash = block ? block.roots[parseInt(fuelTx.rootIndex)] : null;

  const assets = new Set([fuelTx.signatureFeeToken]);
  fuelTx.inputProofs.forEach((input: any) => assets.add(input.properties.token().hex()));
  fuelTx.outputProofs.forEach((output: any) => assets.add(output.properties.token().hex()));

  const tx: Transaction = {
    hash,
    root: rootHash,
    block: parseInt(fuelTx.blockHeight),
    inputs: fuelTx.inputProofs.map((input: any) => ({
      account: input.properties.owner().get(),
      asset: input.properties.token().hex(),
      value: (input.properties.value ? input.properties.value() : input.properties.amount()).get().toString(),
    })),
    outputs: fuelTx.outputProofs.map((output: any) => ({
      account: output.properties.owner().get(),
      asset: output.properties.token().hex(),
      value: output.properties.amount().get().toString(),
    })),
    feeToken: fuelTx.signatureFeeToken,
    fee: fuelTx.signatureFee,
    size: fuelTx.decoded.sizePacked(),
    timestamp: parseInt(fuelTx.timestamp),
    assets: Array.from(assets),
  };
  return tx;
}

export function getTransactions() {
  return [] as Transaction[];
}

export async function getTransaction(hash: string) {
  const tx = await getAPI().getTransactionByHash(hash).catch(() => null);

  if (!tx) {
    console.log('cannot find transaction', hash);
    return null;
  }

  return await transformTx(tx, hash);
}
