import BN from 'bn.js';
import { getVal, setVal } from './data-storage';
import { Transaction } from './transactions';

const bn = (val: string) => new BN(val);

export interface Address {
  address: string;
  balances: { [assetAddress: string]: string };
  transactions: string[];
}
type AddressMap = { [address: string]: Address };

export function updateFromTransactions(transactions: Transaction[]) {
  const addresses = getVal('addresses', {}) as AddressMap;

  for (const transaction of transactions) {
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

  setVal('addresses', addresses);
}

export function getAddresses() {
  const addresses = getVal('addresses', {}) as AddressMap;
  return Object.values(addresses);
}

export function getAddress(address: string) {
  const addresses = getVal('addresses', {}) as AddressMap;
  return addresses[address] || null;
}
