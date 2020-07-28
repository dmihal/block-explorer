import { Asset } from 'data/assets';
import React from 'react';
import Cell from './Cell';
import Row from './Row';
import { ColumnType } from './table-types';

const SCROLL_TO_BOTTOM_MARGIN = 20


interface TableProps {
  columns: ColumnType[],
  data: any[],
  assets?: Asset[];
  emptyState?: React.ReactNode,
  onScrollBottom?: () => void,
}

const Table: React.FC<TableProps> = ({ columns, data, children, onScrollBottom, assets=[] }) => {
  const showEmptyState = !!children && data.length === 0;

  const onScroll = (e: any) => {
    const element = e.target
    if (
      onScrollBottom &&
      element.scrollHeight - element.scrollTop - element.clientHeight < SCROLL_TO_BOTTOM_MARGIN
    ) {
      onScrollBottom()
    }
  };

  return (
    <div>
      <div className="table">
        <div className="header">
          {columns.map(column => (
            <Cell column={column} key={column.title} header>
              {column.title}
            </Cell>
          ))}
        </div>

        {showEmptyState && <div className="empty-container">{children}</div>}

        <div className="row-collection" onScroll={onScrollBottom && onScroll}>
          {data.map((row, rowNum) => (
            <Row data={row} columns={columns} key={rowNum} assets={assets} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .table {
          display: flex;
          flex-flow: column nowrap;
          flex: 1 0;
          flex-direction: column;
          box-pack: justify;
          justify-content: space-between;
          font-size: 1rem;
          line-height: 1.5;
          font-size: 15px;
        }

        .header {
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          transition: 0.25s;

          font-size: 17px;
          font-weight: 600;
          border-bottom: solid 2px #04c399;
        }

        .row-collection {
          flex: 1 0 0;
          overflow-y: overlay;
          overflow-x: hidden;
          min-height: 186px;
          margin: 8px;
        }

        .empty-container {
          display: flex;
          flex: 1 0;
          flex-direction: column;
          min-height: 220px;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .empty-container :global(img) {
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .table {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  )
}

export default Table;
