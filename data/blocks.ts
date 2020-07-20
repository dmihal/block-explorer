import api from './api';

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

function transformBlock(fuelBlock: any): Block {
  const block: Block = {
    height: fuelBlock.properties.height.get().toNumber(),
    hash: '0x',
    parentHash: fuelBlock.properties.previousBlockHash.get(),
    producer: fuelBlock.properties.producer.get(),
    ethereumBlockNumber: fuelBlock.properties.ethereumBlockNumber.get().toNumber(),
    size: fuelBlock.sizePacked(),
    timestamp: 0,
    roots: fuelBlock.properties.roots.get(),
  };
  return block;
}

export async function getBlock(blockNum: number): Block {
  const block = await api.getBlockByHeight(blockNum);

  if (!block) {
    console.log('cannot find block', blockNum);
    return null;
  }

  return transformBlock(block);
}

export async function getBlocks() {
  return await Promise.all(
    [0, 1].map((num: number) =>
      api.getBlockByHeight(num).then((block: any) => transformBlock(block))
    ));
}

export function addBlock(block: Block) {}
