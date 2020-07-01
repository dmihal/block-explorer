import React, { Fragment } from 'react';
import Link from 'next/link';

interface FuelLinkProps {
  type: 'block' | 'root';
  label?: React.ReactNode;
}

const FuelLink: React.FC<FuelLinkProps> = ({ type, label, children }) => {
  switch (type) {
    case 'block':
      return (
        <Link href="/block/[blockNum]" as={`/block/${children}`}><a>{label || children}</a></Link>
      );

    case 'root':
      return (
        <Link href="/root/[rootHash]" as={`/root/${children}`}><a>{label || children}</a></Link>
      );
  }

  return (
    <Fragment>{children}</Fragment>
  );
}

export default FuelLink;
