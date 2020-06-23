import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import Layout from 'components/Layout';
import { getRoot, Root } from 'data/roots';

interface IndexPageProps {
  _root: Root | null;
}

const RootPage: NextPage<RootPageProps> = ({ _root }) => {
  if (!_root) {
    Router.push('/roots');
    return null;
  }

  return (
    <Layout title="Roots">
      <h1>Root {_root.number}</h1>

      {_root.block !== null && (
        <div>
          Block:
          <Link href="/block/[blockNum]" as={`/block/${_root.block}`}><a>{_root.block}</a></Link>
        </div>
      )}

      <pre>{JSON.stringify(_root, null, '  ')}</pre>
      <h2>Transactions</h2>
      <ul>
        {_root.transactions.map(tx => (
          <li key={tx}>
            <Link href="/transaction/[txHash]" as={`/transaction/${tx}`}><a>{tx}</a></Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default RootPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { rootHash } = params;
  const _root = getRoot(rootHash);
  return { props: { _root } };
};
