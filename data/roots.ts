import api from './api';

export interface Root {
  hash: string;
  producer: string;
  block: number | null;
  merkleTreeRoot: string;
  size: number;
  commitmentHash: string;
  feeToken: string;
  fee: string;
  timestamp: number;
  transactions: string[];
}

function transformRoot(fuelRoot: any, transactions: string[] = []) {
  const _root: Root = {
    hash: fuelRoot.keccak256Packed(),
    producer: fuelRoot.properties.rootProducer().get(),
    merkleTreeRoot: fuelRoot.properties.merkleTreeRoot().get(),
    block: fuelRoot.getAddon().properties.blockHeight().get().toNumber(),
    size: fuelRoot.properties.rootLength().get().toNumber(),
    commitmentHash: fuelRoot.properties.commitmentHash().get(),
    fee: fuelRoot.properties.fee().get().toNumber(),
    feeToken: fuelRoot.properties.feeToken().hex(),
    timestamp: 0,
    transactions,
  };
  return _root;
}

export async function getRoot(hash: string): Promise<Root | null> {
  const fuelRoot = await api.getRootByHash(hash);

  if (!fuelRoot) {
    console.log('cannot find root', hash);
    return null;
  }

  const transactions = await api.getTransactions(
    fuelRoot.getAddon().properties.blockHeight().get().toNumber(),
    fuelRoot.getAddon().properties.rootIndex().get().toNumber()
  );

  return transformRoot(fuelRoot, transactions);
}

export async function getRoots(): Promise<Root[]> {
  return [(await getRoot('0xd00971a9272c314d8752256e76a8391eb0d70a8a8d9bbcdfe46a78772c92748e'))!]
}
