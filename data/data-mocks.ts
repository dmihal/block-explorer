import BN from 'bn.js';
import { randomAddress, randomHex } from 'utils/hex';
import { getAddresses, updateFromTransactions } from './addresses';
import { assets } from './assets';
import { blocks } from './blocks';
import { roots, Root } from './roots';
import { transactions, Transaction } from './transactions';

const bn = (val: string) => new BN(val);
const randInt = (max: number) => Math.floor(Math.random() * max);

const allAddresses = [
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
  randomAddress(),
];

const producer = randomAddress();

let nextBlockNum = 0;
function mine(txs: Transaction[], parentHash: string | null = null) {
  console.log(txs.slice(0, Math.floor(txs.length / 2)).map(tx => tx.hash));
  const root1: Root = {
    hash: randomHex(64),
    producer,
    block: null,
    merkleTreeRoot: randomHex(64),
    size: 100000,
    commitmentHash: randomHex(64),
    feeToken: '0x0000000000000000000000000000000000000000',
    fee: '0',
    timestamp: Date.now() / 1000,
    transactions: txs.slice(0, Math.floor(txs.length / 2) + 1).map(tx => tx.hash),
  };
  const roots = [root1];
  if (txs.length > 1) {
    roots.push({
      hash: randomHex(64),
      producer,
      block: null,
      merkleTreeRoot: randomHex(64),
      size: 100000,
      commitmentHash: randomHex(64),
      feeToken: '0x0000000000000000000000000000000000000000',
      fee: '0',
      timestamp: Date.now() / 1000,
      transactions: txs.slice(Math.floor(txs.length / 2) + 1).map(tx => tx.hash),
    });
  }

  const block = {
    height: nextBlockNum++,
    hash: randomHex(64),
    parentHash,
    producer,
    ethereumBlockNumber: nextBlockNum + 1000123,
    size: 200000,
    timestamp: Date.now() / 1000,
    roots: roots.map((rt: Root) => rt.hash),
  };

  roots.forEach((_root: Root) => {
    _root.block = block.height;
  });
  txs.forEach((transaction: Transaction, i: number) => {
    transaction.block = block.height;
    transaction.root = i < txs.length ? roots[0].hash : roots[1].hash;
  });

  return { roots, block };
}

function generateGenesis() {
  const tx = {
    hash: '0x6bf6ca63cb47cde2195bbf95f2f1e0b048b4d361e0bba3f70bcbea9a284e133e',
    root: null,
    block: null,
    inputs: [],
    outputs: [
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        value: '1000000000000000000',
        account: allAddresses[0],
      },
    ],
    size: 2000,
    signature: '0x7cde2195bbf95f2f1e0b048b4d361e0b6ba3f70bcbbf6ca63cb4ea9a284e133e',
  };

  const { block, roots: _roots } = mine([tx]);
  _roots.forEach((_root: Root) => roots.push(_root));
  blocks.push(block);
  transactions.push(tx);
  updateFromTransactions([tx]);
}

function generateNewBlock() {
  const addresses = getAddresses();
  const txs: Transaction[] = [];
  for (const address of addresses) {
    const balances = Object.entries(address.balances);
    for (const [asset, balance] of balances) {
      if (Math.random() < (2 / addresses.length / balances.length)) {
        const valuePercent = bn(`${Math.floor(Math.min(Math.random() + 0.5, 1) * 10000)}`);
        const value = bn(balance).mul(valuePercent).div(bn('10000')).toString();

        const tx: Transaction = {
          hash: randomHex(64),
          root: null,
          block: null,
          inputs: [
            {
              asset,
              value,
              account: address.address,
            },
          ],
          outputs: [
            {
              asset,
              value,
              account: allAddresses[randInt(allAddresses.length)],
            },
          ],
          size: 2000,
          signature: randomHex(64),
        };

        txs.push(tx);
      }
    }
  }

  console.log(`Generating ${txs.length} transactions`, txs);

  const { block, roots: _roots } = mine(txs, blocks[blocks.length - 1].hash);
  _roots.forEach((_root: Root) => roots.push(_root));
  blocks.push(block);
  txs.map((tx: Transaction) => transactions.push(tx));
  updateFromTransactions(txs);
}

if (transactions.length === 0) {
  setTimeout(generateGenesis, 1);
  setInterval(generateNewBlock, 5000);
}
