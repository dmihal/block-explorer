import api from './api';

const ZERO_BLOCK = '0x0000000000000000000000000000000000000000000000000000000000000000';

export interface Block {
  height: number;
  hash: string;
  parentHash: string | null;
  producer: string;
  ethereumBlockNumber: number;
  size: number;
  numAddresses: number;
  numTokens: number;
  timestamp: number;
  roots: string[];
}

function transformBlock(fuelBlock: any): Block {
  const parentHash = fuelBlock.properties.previousBlockHash.get();
  const block: Block = {
    height: fuelBlock.properties.height.get().toNumber(),
    hash: fuelBlock.keccak256Packed(),
    parentHash: parentHash === ZERO_BLOCK ? null : parentHash,
    producer: fuelBlock.properties.producer.get(),
    ethereumBlockNumber: fuelBlock.properties.ethereumBlockNumber.get().toNumber(),
    size: fuelBlock.sizePacked(),
    numAddresses: fuelBlock.properties.numAddresses.get().toNumber(),
    numTokens: fuelBlock.properties.numTokens.get().toNumber(),
    timestamp: 0,
    roots: fuelBlock.properties.roots.get(),
  };
  return block;
}

export async function getBlock(blockNum: number): Promise<Block> {
  const block = await api.getBlockByHeight(blockNum);

  if (!block) {
    console.log('cannot find block', blockNum);
    return null;
  }

  return transformBlock(block);
}

export async function getBlocks() {
  const state = await api.getState();
  const numBlocks = state.properties.blockHeight.get().toNumber();

  return await Promise.all(
    [...new Array(numBlocks)].map((_: any, blockNum: number) =>
      api.getBlockByHeight(blockNum).then((block: any) => transformBlock(block))
    ));
}

export async function getNumBlocks() {
  const state = await api.getState();
  return state.properties.blockHeight.get().toNumber();
}

export function addBlock(block: Block) {}
