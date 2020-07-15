import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import SearchBar from 'components/SearchBar';
import { getBlocks } from 'data/blocks';
import { getTransactions } from 'data/transactions';
import graphic from 'assets/home-graphic.svg';

interface IndexPageProps {
  blockNum: number;
  numTx: number;
}

const IndexPage: NextPage<IndexPageProps> = ({ blockNum, numTx }) => {
  return (
    <Layout title="Fuel" simple>
      <div className="two-col">
        <div className="graphic" />

        <div className="text">
          <h2>Earth’s Value Exchange Layer</h2>
          <p>
            Fuel empowers any person on Earth with <b>fast</b>, <b>secure</b>, and <b>cost efficient</b>
            {} ERC-20 transfers and swaps using the world’s most efficient Optimistic Rollup.
          </p>

          <button className="cta">Get Started</button>
        </div>
      </div>

      <style jsx>{`
        .two-col {
          display: flex;
        }

        .graphic {
          flex: 1;
          margin-right: 125px;
          background-image: url('${graphic}');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        .text {
          flex: 1;
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

        .cta {
          height: 59px;
          border-radius: 45px;
          background-color: #04c399;
          border: none;
          color: #ffffff;
          font-size: 21px;
          font-weight: 600;
          padding: 0 64px;
          outline: none;
        }

        @media (max-width: 600px) {
          .two-col {
            flex-direction: column;
          }

          .graphic {
            padding-bottom: 80%;
            margin: 0;
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

export const getServerSideProps: GetServerSideProps = async () => {
  const blocks = getBlocks();
  const blockNum = blocks.length > 0 ? blocks[blocks.length - 1].height : 0;


  return { props: { blockNum, numTx: getTransactions().length } };
};
