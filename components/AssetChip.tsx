import React from 'react';
import { Asset } from 'data/assets';

interface AssetChipProps {
  address: string;
  assets: Asset[];
}

const getAsset = (address: string, assets: Asset[]) => {
  for (const asset of assets) {
    if (asset.address === address) {
      return asset;
    }
  }
  throw new Error(`Asset ${address} not found`);
}

const AssetChip: React.FC<AssetChipProps> = ({ address, assets }) => {
  const asset = getAsset(address, assets);

  return (
    <div className="chip">
      {asset.symbol}
      <style jsx>{`
        .chip {
          width: 57px;
          height: 26px;
          line-height: 26px;
          border-radius: 20px;
          background-color: #f5f5f5;
          color: #26282a;
          font-size: 15px;
          text-align: center;
          display: inline-block;
        }
      `}</style>
    </div>
  )
}

export default AssetChip;
