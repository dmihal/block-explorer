import React from 'react';
import { NextPage } from 'next';
import Layout from 'components/Layout';
import SocialBox from 'components/SocialBox';
import science from 'assets/science.svg';
import worker from 'assets/worker.svg';
import bolt from 'assets/mini-bolt.svg';
import nick from 'assets/nick.png';
import john from 'assets/john.png';

const Bubble: React.FC<any> = ({ name, title, img }) => (
  <div className="bubble">
    <div className="img" style={{ backgroundImage: `url('${img}')` }} />
    <div className="name">{name}</div>
    <div className="title">{title}</div>

    <style jsx>{`
      .bubble {
        text-align: center;
      }
      .img {
        height: 110px;
        width: 110px;
        background-size: contain;
        margin: 0 auto;
      }

      .name {
        font-size: 17px;
        font-weight: 600;
        margin: 24px 0 20px;
      }
      .title {
        font-size: 14px;
      }
    `}</style>
  </div>
);

const TeamBox: React.FC = () => {
  return (
    <div className="box-container">
      <div className="box-content">
        <h2>The Team</h2>
        <div className="bubbles">
          <Bubble name="Nick Dodson" title="C.E.O." img={nick} />
          <Bubble name="John Adler" title="V.P Blockchain" img={john} />
          <Bubble name="Samuel Borin" title="Design & Product" img={nick} />
          <Bubble name="Dave Mihal" title="Sr. Engineer" img={john} />
        </div>
      </div>

      <style jsx>{`
        .box-container {
          margin: 0 -1000px;
          background: #021d17;
          background-image: url('${bolt}');
        }

        .box-content {
          color: white;
          margin: 0 auto;
          padding: 30px 0;
          max-width: 700px;
          text-align: center;
        }

        .bubbles {
          display: flex;
          justify-content: space-around;
        }

        @media (max-width: 600px) {
          .bubbles {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

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

      <TeamBox />

      <SocialBox />

      <footer>
        ©2020 Fuel Labs inc.
      </footer>

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

        footer {
          height: 34px;
          opacity: 0.3;
          font-size: 14px;
          color: #69737d;
          text-align: center;
          margin: 12px;
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
