import { getVal, setVal } from './data-storage';

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

export function getRoot(hash: string) {
  const roots = getVal('roots', []) as Root[];

  for (const _root of roots) {
    if (hash === _root.hash) {
      return _root;
    }
  }
  return null;
}

export function getRoots() {
  const roots = getVal('roots', []) as Root[];
  return roots;
}

export function addRoot(_root: Root) {
  const roots = getVal('roots', []) as Root[];

  setVal('roots', [...roots, _root]);
}
