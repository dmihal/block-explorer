import React from 'react';
import external from 'assets/external-link.svg';

interface EtherscanLinkProps {
  block: number;
  network?: string;
}

const EtherscanLink: React.FC<EtherscanLinkProps> = ({ children, block, network }) => {
  const href = `https://${network ? `${network}.` : ''}etherscan.io/block/${block}`;

  return (
    <a href={href} target="etherscan">
      {children}

      <style jsx>{`
        a {
          background-image: url('${external}');
          padding-right: 18px;
          background-position: right center;
          background-repeat: no-repeat;
          background-size: 14px;
        }
      `}</style>
    </a>
  )
}

export default EtherscanLink;
