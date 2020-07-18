import React from 'react';

interface ModalProps {
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
  return (
    <div className="background" onClick={onClose}>
      <div className="modal" onClick={(e: any) => e.stopPropagation()}>
        <div className="header">
          <button className="close" onClick={onClose} />
          <div className="title">{title}</div>
          <div className="spacer" />
        </div>

        <div className="content">
          {children}
        </div>
      </div>

      <style jsx>{`
        .background {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          background-color: rgba(2, 29, 23, 0.3);
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          padding: 20px;
        }

        .header {
          display: flex;
          align-items: center;
        }

        .close, .spacer {
          height: 20px;
          width: 20px;
        }

        .close {
          background: transparent;
          border: none;
          outline: none;
          position: relative;
          cursor: pointer;
        }

        .close:before, .close:after {
          content: '';
          display: block;
          background: #021d17;
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 2px;
          border-radius: 1px;
          transform: rotate(45deg);
        }

        .close:after {
          transform: rotate(-45deg);
        }

        .title {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          color: #021d17;
          flex: 1;
        }

        .content {
          margin: 15px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Modal;
