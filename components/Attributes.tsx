import React from 'react';

export const Attributes: React.FC = ({ children }) => {
  return (
    <dl>
      {children}
      <style jsx>{`
        dl {
          margin: 0;
        }
      `}</style>
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

        @media (max-width: 600px) {
          .attribute {
            flex-direction: column;
            margin: 0;
            padding: 15px 0;
          }

          .attribute + .attribute {
            border-top: solid 1px #d5dee5;
          }

          dt, dd {
            flex: 0;
            text-align: left;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};
