import { NextPage } from 'next';
import Layout from '../components/Layout';
import science from 'assets/science.svg';
import worker from 'assets/worker.svg';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Fuel" simple noSearch active="labs">
      <div className="two-col flip">
        <div className="text">
          <h2>Here at Fuel Labs...</h2>
          <p>
            We envision a frictionless future, where every person on earth has the tools to {}
            control their own financial sovereignty. 
          </p>
        </div>

        <div className="graphic" style={{ backgroundImage: `url('${science}')` }} />
      </div>

      <div className="two-col">
        <div className="graphic" style={{ backgroundImage: `url('${worker}')` }} />

        <div className="text">
          <h2>About Us</h2>
          <p>
            Fuel Labs is the leader in bleeding-edge sustainably scalable, permissionless, {}
            trust-minimized sidechains for Ethereum. We are developing the most efficient and {}
            secure optimistic rollup implementation, designed for high-volume payments, {}
            non-custodial exchanges, decentralized social media, and more.
          </p>
        </div>
      </div>

      <style jsx>{`
        .two-col {
          display: flex;
          margin-bottom: 30px;
        }

        .graphic {
          flex: 1;
          margin: 0 60px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        .text {
          flex: 2;
        }

        .text h2 {
          font-size: 46px;
          font-weight: bold;
          line-height: 1.15;
          margin: 0 0 20px;
        }

        .text p {
          font-size: 16px;
          font-weight: 500;
          line-height: 2.13;
        }

        @media (max-width: 600px) {
          .two-col {
            flex-direction: column;
            align-items: center;
          }
          .two-col.flip {
            flex-direction: column-reverse;
          }

          .graphic {
            margin: 0;
            width: 120px;
            height: 120px;
            flex: 1 0 120px;
            margin-bottom: 20px;
          }

          .cta {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default IndexPage;
