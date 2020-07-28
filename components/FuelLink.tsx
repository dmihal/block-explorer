import React, { Fragment } from 'react';
import Link from 'next/link';
import Hex from './Hex';

export type FuelLinkTypes = 'block' | 'root' | 'transaction' | 'address';

interface FuelLinkProps {
  type: FuelLinkTypes;
  label?: React.ReactNode;
  title?: boolean;
}

const FuelLink: React.FC<FuelLinkProps> = ({ type, label, title, children }) => {
  const content = label || <Hex>{children}</Hex>;

  switch (type) {
    case 'block':
      return (
        <Link href="/block/[blockNum]" as={`/block/${children}`}>
          <a>{title && 'Block #'}{label || children}</a>
        </Link>
      );

    case 'root':
      return (
        <Link href="/root/[rootHash]" as={`/root/${children}`}>
          <a>{title && 'Root '}{content}</a>
        </Link>
      );

    case 'transaction':
      return (
        <Link href="/transaction/[txHash]" as={`/transaction/${children}`}>
          <a>{title && 'Transaction '}{content}</a>
        </Link>
      );

    case 'address':
      return (
        <Link href="/address/[address]" as={`/address/${children}`}>
          <a>{title && 'Address '}{content}</a>
        </Link>
      );
  }

  return (
    <Fragment>{children}</Fragment>
  );
}

export default FuelLink;
