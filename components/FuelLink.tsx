import React, { Fragment } from 'react';
import Link from 'next/link';

export type FuelLinkTypes = 'block' | 'root' | 'transaction';

interface FuelLinkProps {
  type: FuelLinkTypes;
  label?: React.ReactNode;
  title?: boolean;
}

const FuelLink: React.FC<FuelLinkProps> = ({ type, label, title, children }) => {
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
          <a>{title && 'Root '}{label || children}</a>
        </Link>
      );

    case 'transaction':
      return (
        <Link href="/transaction/[txHash]" as={`/transaction/${children}`}>
          <a>{title && 'Transaction '}{label || children}</a>
        </Link>
      );
  }

  return (
    <Fragment>{children}</Fragment>
  );
}

export default FuelLink;
