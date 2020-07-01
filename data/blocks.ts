import { getVal, setVal } from './data-storage';
import './data-mocks';

export interface Block {
  height: number;
  hash: string;
  parentHash: string | null;
  producer: string;
  ethereumBlockNumber: number;
  size: number;
  timestamp: number;
  roots: string[];
}

export const blocks: Block[] = [];

export function getBlock(blockNum: number) {
  const blocks = getVal('blocks', []) as Block[];

  for (const block of blocks) {
    if (blockNum === block.height) {
      return block;
    }
  }
  console.log('cannot find block', blockNum);
  return null;
}

export function getBlocks() {
  const blocks = getVal('blocks', []) as Block[];

  return blocks;
}

export function addBlock(block: Block) {
  const blocks = getVal('blocks', []) as Block[];

  if (blocks.filter((b: Block) => b.height === block.height).length > 0) {
    throw new Error(`Block already exists with height ${block.height}`);
  }

  setVal('blocks', [...blocks, block]);
}
