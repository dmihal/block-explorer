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

export const roots: Root[] = [];

export function getRoot(hash: string) {
  console.log(roots);
  for (const _root of roots) {
    if (hash === _root.hash) {
      return _root;
    }
  }
  return null;
}

export function getRoots() {
  return roots;
}
