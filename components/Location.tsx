import React, { useState } from 'react';
import BreadCrumbs, { BreadCrumb } from './BreadCrumbs';

const Location: React.FC<{ breadCrumbs: BreadCrumb[] }> = ({ breadCrumbs }) => {
  const [networkOpen, setNetworkOpen] = useState(false);

  return (
    <div className="location">
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className={`network-container ${networkOpen ? 'open' : ''}`}>
        <div className="network-selector" onClick={() => setNetworkOpen(!networkOpen)}>Mainnet</div>
        {networkOpen && (
          <ul className="network-dropdown">
            <li>Mainnet</li>
            <li>Ropsten</li>
            <li>Rinkeby</li>
            <li>Goerli</li>
          </ul>
        )}
      </div>

      <style jsx>{`
        .location {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .network-container {
          cursor: pointer;
          position: relative;
          color: #04c399;
        }

        .network-selector {
          border: solid 1px #04c399;
          height: 30px;
          border-radius: 15px;
          display: flex;
          padding: 0 20px;
          align-items: center;
        }

        .network-selector:after {
          content: '';
          height: 5px;
          width: 5px;
          display: block;
          margin-left: 10px;
          border-top: solid 1px #41c9af;
          border-right: solid 1px #41c9af;
          transform: rotate(45deg);
        }

        .open .network-selector:after {
          transform: rotate(135deg);
        }

        .network-selector:before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 11px;
          background-color: #04c399;
          margin-right: 15px;
        }

        .network-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          background-color: white;
          margin: 0;
          padding: 0;
          overflow: hidden;
          z-index: 2;
          border-radius: 3px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          background-color: #ffffff;
        }

        .network-dropdown li {
          list-style: none;
          margin: 0;
          padding: 2px 10px;
          display: flex;
          align-items: center;
        }

        .network-dropdown li:before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 11px;
          background-color: #04c399;
          margin-right: 7px;
          display: block;
        }

        .network-dropdown li:hover {
          background: #eeeeee;
        }

        @media (max-width: 600px) {
          .location {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Location;
