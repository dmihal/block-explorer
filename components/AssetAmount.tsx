import React from 'react';
import { Asset } from 'data/assets';
import AssetChip from './AssetChip';
import { fromWei } from 'ethjs-unit';

const units: { [decimals: number]: string } = {
  0: 'wei',
  18: 'ether',
};

interface AssetAmountProps {
  amount: string;
  address: string;
  assets: Asset[];
}

const formatBalance = (amount: string, address: string, assets: Asset[]) => {
  for (const asset of assets) {
    if (asset.address === address) {
      const unit = units[asset.decimals]!;

      return fromWei(amount, unit);
    }
  }
  throw new Error(`Asset ${address} not found`);
};

const AssetAmount: React.FC<AssetAmountProps> = ({ amount, asset, assets }) => {
  const _balance = formatBalance(amount, asset, assets);

  return (
    <div>
      <div className="amount">{_balance}</div>
      <AssetChip address={asset} assets={assets} />

      <style jsx>{`
        .amount {
          display: inline-block;
          margin-right: 10px;
        }
      `}</style>
    </div>
  )
}

export default AssetAmount;
