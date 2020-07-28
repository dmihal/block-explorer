import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';
import copyIcon from 'assets/copy.svg';
import qricon from 'assets/qr-icon.svg';
import Modal from './Modal';

interface SubHeaderProps {
  type: string;
  inline?: boolean;
  qr?: boolean;
  copy?: boolean;
}

const SubHeader: React.FC<SubHeaderProps> = ({ type, inline, children, qr, copy }) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <h2 className={inline ? 'inline' : ''}>
      <div className="primary">{type}{!inline && ':'}</div>
      <div className="secondary">
        <div className="secondary-text">{children}</div>

        {copy && (
          <CopyToClipboard text={children as string} onCopy={onCopy}>
            <button
              className={`button copy-btn ${copied ? 'copied' : ''}`}
              style={{ backgroundImage: `url('${copyIcon}')` }}
            />
          </CopyToClipboard>
        )}

        {qr && (
          <button
            className="button"
            style={{ backgroundImage: `url('${qricon}')` }}
            onClick={() => setShowQR(true)}
          />
        )}
      </div>

      {showQR && (
        <Modal title="QR code" onClose={() => setShowQR(false)}>
          <div>{children}</div>
          <div className="qrContainer">
            <QRCode value={children as string} fgColor="#01ccaa" />
          </div>
        </Modal>
      )}

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
          display: flex;
        }

        .secondary-text {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .button {
          outline: none;
          width: 24px;
          height: 24px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #ffffff;
          margin: 0 5px;
          border-radius: 12px;
          border: none;
          background-size: 60%;
          background-repeat: no-repeat;
          background-position: center;
          flex: 0 0 24px;
        }

        .button:hover {
          background-color: rgba(130, 255, 239, 0.17);
        }

        .copy-btn.copied:after {
          content: 'Copied';
          position: absolute;
          transform: translate(-50%, -36px);
          background: #04c399;
          padding: 4px;
          border-radius: 4px;
          opacity: 0.17;
          color: #13d0b0;
        }

        .qrContainer {
          margin: 20px;
        }
      `}</style>
    </h2>
  );
};

export default SubHeader;
