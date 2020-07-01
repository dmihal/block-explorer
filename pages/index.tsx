import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import SearchBar from 'components/SearchBar';
import { getBlocks } from 'data/blocks';
import { getTransactions } from 'data/transactions';

interface IndexPageProps {
  blockNum: number;
  numTx: number;
}

const IndexPage: NextPage<IndexPageProps> = ({ blockNum, numTx }) => {
  return (
    <Layout title="Block Explorer">
      <div className="col">
        <SearchBar />

        <dl>
          <div>
            <dt>Block</dt>
            <dd>
              <Link href="/block/[blockNum]" as={`/block/${blockNum}`}>
                <a>#{blockNum}</a>
              </Link>
            </dd>
          </div>

          <div>
            <dt>Transactions</dt>
            <dd>{numTx}</dd>
          </div>

          <div>
            <dt>Trades</dt>
            <dd>0</dd>
          </div>
        </dl>

        <dl>
          <div>
            <dt>Average Speed</dt>
            <dd>0</dd>
          </div>

          <div>
            <dt>Average Cost per Tx</dt>
            <dd>0</dd>
          </div>
        </dl>
      </div>

      <style jsx>{`
        .col {
          max-width: 1088px;
          margin: 0 20px;
        }

        dl {
          display: flex;
          text-align: center;
          justify-content: space-around;
          margin-top: 120px;
          margin-bottom: 160px;
        }

        dl div {
          flex: 1 1 auto;
        }

        dl div + div {
          border-left: solid 1px #d5dee5;
        }

        dt {
          font-size: 30px;
          font-weight: 600;
          line-height: 2.33;
          color: #021d17;
        }

        dd {
          margin: 0;
          font-size: 30px;
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
