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
          font-size: 15px;
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

        .open .network-selector {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        .network-selector:before {
          content: '';
          width: 11px;
          height: 11px;
          border-radius: 11px;
          background-color: #04c399;
          margin-right: 15px;
        }

        .network-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          background-color: white;
          border: solid 1px #04c399;
          border-top: 0;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .network-dropdown li {
          list-style: none;
          margin: 0;
          padding: 2px 10px;
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
