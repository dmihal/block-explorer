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
  asset: string;
  assets: Asset[];
  noChip?: boolean;
}

const formatBalance = (amount: string, address: string, assets: Asset[]) => {
  for (const asset of assets) {
    if (asset.address === address || asset.id === address) {
      const unit = units[asset.decimals]!;

      return fromWei(amount, unit);
    }
  }
  throw new Error(`Asset ${address} not found`);
};

const AssetAmount: React.FC<AssetAmountProps> = ({ amount, asset, assets, noChip }) => {
  const fullBalance = formatBalance(amount, asset, assets);
  const shortBalance = fullBalance.indexOf('.') === -1
    ? fullBalance
    : fullBalance.substring(0, fullBalance.indexOf('.') + 5);

  return (
    <div>
      <div className="amount" title={fullBalance}>{shortBalance}</div>
      {!noChip && (
        <AssetChip address={asset} assets={assets} />
      )}

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
