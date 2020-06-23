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
  for (const block of blocks) {
    if (blockNum === block.height) {
      return block;
    }
  }
  return null;
}

interface BlockQueryOptions {

}

export function getBlocks({}: BlockQueryOptions = {}) {
  return blocks;
}
