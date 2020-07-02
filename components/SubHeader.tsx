import React from 'react';

interface SubHeaderProps {
  type: string;
  inline?: boolean;
}

const SubHeader: React.FC<SubHeaderProps> = ({ type, inline, children }) => {
  return (
    <h2 className={inline ? 'inline' : ''}>
      <div className="primary">{type}{!inline && ':'}</div>
      <div className="secondary">{children}</div>

      <style jsx>{`
        h2 {
          border-bottom: solid 1px #d4dee5;
          font-weight: 500;
          font-size: 17px;
          margin-bottom: 28px;
        }
        h2.inline {
          display: flex;
          align-items: baseline;
        }

        .primary {
          font-size: 25px;
          margin-right: 10px;
        }

        .secondary {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </h2>
  );
};

export default SubHeader;
