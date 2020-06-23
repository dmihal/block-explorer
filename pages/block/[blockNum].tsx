import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import Layout from 'components/Layout';
import { getBlock, Block } from 'data/blocks';

interface IndexPageProps {
  block: Block | null;
}

const BlockPage: NextPage<BlockPageProps> = ({ block }) => {
  if (!block) {
    Router.push('/blocks');
    return null;
  }

  return (
    <Layout title="Blocks">
      <h1>Block {block.number}</h1>

      {block.block !== null && (
        <div>
          Parent:
          <Link href="/block/[blockNum]" as={`/block/${block.parentHash}`}><a>{block.parentHash}</a></Link>
        </div>
      )}

      <pre>{JSON.stringify(block, null, '  ')}</pre>
      <h2>Roots</h2>
      <ul>
        {block.roots.map((_root: string) => (
          <li key={_root}>
            <Link href="/root/[rootHash]" as={`/root/${_root}`}><a>{_root}</a></Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default BlockPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { blockNum } = params;
  const block = getBlock(parseInt(blockNum));
  return { props: { block } };
};
