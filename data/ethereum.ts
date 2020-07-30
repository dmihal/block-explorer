import { getNetwork } from './environment';

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
}

export async function getTokenMetadata(_address: string): Promise<TokenMetadata> {
  if (getNetwork() === 'unspecified') {
    return generateFakeToken();
  }
  throw new Error(`Unsupported network ${getNetwork()}`);
}

function generateFakeToken(): TokenMetadata {
  const tokens = [
    { name: 'Dai', symbol: 'DAI' },
    { name: 'Chainlink', symbol: 'LINK' },
    { name: 'Maker', symbol: 'MKR' },
    { name: 'Synthetix', symbol: 'SNX' },
    { name: 'USDC', symbol: 'USDC' },
  ];

  const token = tokens[Math.floor(Math.random() * tokens.length)];
  return {
    ...token,
    decimals: 18,
  };
}
