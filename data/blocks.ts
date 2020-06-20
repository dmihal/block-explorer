export interface Block {
  number: number;
  hash: string;
  parentHash: string | null;
  size: number;
  timestamp: number;
  transactions: string[];
}

const blocks: Block[] = [
  {
    number: 0,
    hash: '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
    parentHash: null,
    size: 10000,
    timestamp: Date.now(),
    transactions: ['0x6bf6ca63cb47cde2195bbf95f2f1e0b048b4d361e0bba3f70bcbea9a284e133e'],
  },
  {
    number: 1,
    hash: '0xca60b048b4d361e0bba6f70bcbea9a2c4e133e34b46bf67cde21959ef95f2f1e',
    parentHash: '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
    size: 10000,
    timestamp: Date.now(),
    transactions: ['0x7cde2170bcbea9a284e133e95bbf95f2f1e0b046bf6ca63cb48b4d361e0bba3f'],
  },
  {
    number: 2,
    hash: '0xba6f702c4e133e34bca60b048b4d361e0b46bf67cde21959ef95f2f1ebcbea9a',
    parentHash: '0xca60b048b4d361e0bba6f70bcbea9a2c4e133e34b46bf67cde21959ef95f2f1e',
    size: 10000,
    timestamp: Date.now(),
    transactions: [],
  },
];

export function getBlock(blockNum: number) {
  for (const block of blocks) {
    if (blockNum === block.number) {
      return block;
    }
  }
  return null;
}

interface BlockQueryOptions {

}

export function getBlocks({}: BlockQueryOptions = {}) {
  return blocks.reverse();
}
