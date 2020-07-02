import React, { useState } from 'react';
import { Asset } from 'data/assets';
import Cell from './Cell';
import { ColumnType } from './table-types';

interface RowProps {
  columns: ColumnType[];
  data: any;
  assets: Asset[];
}

const Row: React.FC<RowProps> = ({ data, columns, assets }) => {
  const [hover, setHover] = useState(false);

  const classes = ['row'];
  if (hover) {
    classes.push('hover');
  }

  return (
    <div
      className={classes.join(' ')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {columns.map((column, colNum) => (
        <Cell column={column} key={colNum} assets={assets}>
          {data[column.name]}
        </Cell>
      ))}

      <style jsx>{`
        .row {
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          transition: 0.25s;

          border-bottom: solid 1px #e8e8e8;
        }

        .row.hover {
          background: #e8e8e8;
        }
      `}</style>
    </div>
  );
};

export default Row;
