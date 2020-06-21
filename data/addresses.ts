import BN from 'bn.js';
import { transactions } from './transactions';

const bn = (val: string) => new BN(val);

export interface Address {
  address: string;
  balances: { [assetAddress: string]: string };
  transactions: string[];
}

const addresses: { [address: string]: Address } = {};

for (const transaction of Object.values(transactions)) {
  for (const input of transaction.inputs) {
    const address = addresses[input.account];
    if (address && address.balances[input.asset]) {
      address.balances[input.asset] = bn(address.balances[input.asset]).sub(bn(input.value)).toString();

      if (address.transactions.indexOf(transaction.hash) === -1) {
        address.transactions.push(transaction.hash);
      }
    }
  }

  for (const output of transaction.outputs) {
    if (!addresses[output.account]) {
      addresses[output.account] = { address: output.account, balances: {}, transactions: [] };
    }

    const address = addresses[output.account];
    address.balances[output.asset] = bn(address.balances[output.asset]).add(bn(output.value)).toString();

    if (address.transactions.indexOf(transaction.hash) === -1) {
      address.transactions.push(transaction.hash);
    }
  }
}

export function getAddresses() {
  return Object.values(addresses);
}

export function getAddress(address: string) {
  return addresses[address] || null;
}
