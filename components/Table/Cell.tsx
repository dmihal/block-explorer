import React from 'react';
import { format } from 'date-fns'
import { Asset } from 'data/assets';
import AssetChip from '../AssetChip';
import AssetAmount from '../AssetAmount';
import FuelLink from '../FuelLink';

interface CellProps {
  column: any;
  header?: boolean;
  assets?: Asset[];
}

const Cell: React.FC<CellProps> = ({ column, children, header, assets=[] }) => {
  let content = children;
  let title: string | null = children!.toString();

  const classes = ['cell'];
  if (!header) {
    classes.push(column.type)
  }

  const props = {};

  const type = header ? 'header' : column.type;
  switch (type) {
    case 'number':
      if (children === null) {
        content = null
        classes.push('empty')
        break
      }

      content = column.decimals ? children as number / 10 ** column.decimals : children as number
      if (column.format) {
        content = content.toLocaleString()
      } else if (column.pad) {
        content = content.toString().padStart(column.pad, '0')
      }
      break

    case 'asset':
      content = (
        <AssetChip address={children as string} assets={assets} />
      );
      break;

    case 'amount':
      const amount = children as { asset: string, value: string };
      content = (
        <AssetAmount amount={amount.value} asset={amount.asset} assets={assets} />
      );
      break

    case 'link':
      if (children !== column.ignore) {
        content = (
          <FuelLink type={column.linkType}>{children}</FuelLink>
        );
      }
      break;

    case 'component':
      title = null;
      break

    case 'date':
      content = format(new Date(children as string), column.format);
      title = content.toString();
      break
  }

  return (
    <div
      className={classes.join(' ')}
      title={title ? title.toString() : undefined}
      style={{
        flexGrow: column.grow,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        fontWeight: column.fontWeight,
        fontSize: column.fontSize,
      }}
      {...props}
    >
      {content}
      <style jsx>{`
        .cell {
          flex-grow: 1;
          flex-basis: 0;

          padding: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
        }
        .number {
          font-weight: 500;
          color: #7dca46;
          font-size: 16px;
          font-style: normal;
        }
        .price {
          color: #7dca46;
        }
        .long-text {
          font-size: 14px;
        }
        .hex,
        .address,
        .txhash {
          font-family: 'PT Mono', monospace;
          font-size: 16px;
        }
        .cell :global(a) {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cell :global(button a:hover) {
          text-decoration: none;
        }
        .txhash :global(a) {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .enum {
          font-size: 16px;
          font-weight: 500;
          color: #7dca46;
        }
        .empty:after {
          content: '-';
          color: #ffffff;
          font-weight: normal;
        }
      `}</style>
    </div>
  )
};

export default Cell;
