import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import SearchBar from 'components/SearchBar';
import { getNumBlocks } from 'data/blocks';
import { getTransactions } from 'data/transactions';
import graphImg from 'assets/graph.png';
import cardImg from 'assets/credit-card.png';
import speedImg from 'assets/speed.png';
import swapImg from 'assets/swap.png';
import gasImg from 'assets/gas.png';

interface NetworkPageProps {
  blockNum: number;
  numTx: number;
}

const NetworkPage: NextPage<NetworkPageProps> = ({ blockNum, numTx }) => {
  return (
    <Layout title="Block Explorer" noSearch active="network">
      <div className="col">
        <div className="search-container">
          <SearchBar />
        </div>

        <div className="defs">
          <dl>
            <div style={{ backgroundImage: `url('${graphImg}')` }}>
              <dt>Block</dt>
              <dd>
                <Link href="/block/[blockNum]" as={`/block/${blockNum}`}>
                  <a>#{blockNum}</a>
                </Link>
              </dd>
            </div>

            <div style={{ backgroundImage: `url('${cardImg}')` }}>
              <dt>Transactions</dt>
              <dd>{numTx}</dd>
            </div>

            <div style={{ backgroundImage: `url('${swapImg}')` }}>
              <dt>Trades</dt>
              <dd>0</dd>
            </div>
          </dl>

          <dl>
            <div style={{ backgroundImage: `url('${speedImg}')` }}>
              <dt>Average Speed</dt>
              <dd>0</dd>
            </div>

            <div style={{ backgroundImage: `url('${gasImg}')` }}>
              <dt>Average Cost per Tx</dt>
              <dd>0</dd>
            </div>
          </dl>
        </div>
      </div>

      <style jsx>{`
        .col {
          max-width: 1088px;
          margin: 0 20px;
        }

        dl {
          font-size: 20px;
          display: flex;
          text-align: center;
          justify-content: space-around;
          margin-top: 60px;
          margin-bottom: 80px;
        }

        dl div {
          flex: 1 1 auto;
          background-size: 0;
        }

        dl div + div {
          border-left: solid 1px #d5dee5;
        }

        dt {
          font-weight: 600;
          line-height: 2.33;
          color: #021d17;
        }

        dd {
          margin: 0;
        }

        @media (max-width: 600px) {
          .search-container {
            margin-bottom: 35px;
            padding-bottom: 20px;
            border-bottom: solid 1px #f6f6f6;
          }
          .defs {
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
            padding: 0 10px;
          }

          dl {
            margin: 0;
            flex-direction: column;
          }

          dl + dl {
            border-top: solid 1px #d5dee5;
          }

          dl div {
            background-size: 34px;
            background-repeat: no-repeat;
            background-position: 20px center;
            padding: 20px 0 20px 74px;
            text-align: left;
            font-size: 16px;
            line-height: 1;
          }

          dl div + div {
            border: 0;
            border-top: solid 1px #d5dee5;
          }
        }
      `}</style>
    </Layout>
  );
};

export default NetworkPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const blockNum = await getNumBlocks();

  return { props: { blockNum, numTx: getTransactions().length } };
};
