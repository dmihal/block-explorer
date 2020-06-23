import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getBlocks, Block } from 'data/blocks';

interface IndexPageProps {
  blocks: Block[];
}

const IndexPage: NextPage<IndexPageProps> = ({ blocks }) => {
  return (
    <Layout title="Block Explorer">
      <h1>Block Explorer</h1>
      <h2>
        <Link href="/blocks"><a>Blocks</a></Link>
      </h2>
      <ul>
        {blocks.map((block) => (
          <li key={block.hash}>
            <Link href="/block/[blockNum]" as={`/block/${block.height}`}>
              <a>Block {block.height}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const blocks = getBlocks();
  return { props: { blocks } };
};
