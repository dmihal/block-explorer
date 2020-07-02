import React from 'react';

export const Attributes: React.FC = ({ children }) => {
  return (
    <dl>
      {children}
    </dl>
  )
};

interface AttributeProps {
  attribute: string;
}

export const Attribute: React.FC<AttributeProps> = ({ attribute, children }) => {
  return (
    <div className="attribute">
      <dt>{attribute}:</dt>
      <dd>{children}</dd>

      <style jsx>{`
        .attribute {
          display: flex;
          margin: 24px 0;
          font-size: 16px;
        }

        dt {
          flex: 1 0 0;
          text-align: right;
          font-weight: 500;
        }

        dd {
          margin-left: 50px;
          flex: 4 0 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};
