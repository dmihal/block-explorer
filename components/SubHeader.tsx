import React from 'react';

interface SubHeaderProps {
  type: string;
  inline?: boolean;
}

const SubHeader: React.FC<SubHeaderProps> = ({ type, inline, children }) => {
  return (
    <h2 className={inline ? 'inline' : ''}>
      <div className="primary">{type}{!inline && ':'}</div>
      <div>{children}</div>

      <style>{`
        h2 {
          border-bottom: solid 1px #d4dee5;
          font-weight: 500;
          font-size: 25px;
        }
        h2.inline {
          display: flex;
          align-items: baseline;
        }

        .primary {
          font-size: 35px;
          margin-right: 20px;
        }
      `}</style>
    </h2>
  );
};

export default SubHeader;
