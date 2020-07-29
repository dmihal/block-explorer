import React from 'react';

const Hex: React.FC = ({ children, style }) => {
  const text = children!.toString();
  return (
    <div className="hex" style={style}>
      <span className="first">{text.substring(0, text.length - 6)}</span>
      <span className="last">{text.substring(text.length - 6)}</span>

      <style jsx>{`
        .hex {
          overflow: hidden;
          white-space: nowrap;
          display: flex;
        }
        .first {
          text-overflow: ellipsis;
          display: inline-block;
          overflow: hidden;
        }
        .last {
          display: inline-block;
        }
      `}</style>
    </div>
  )
}

export default Hex;
