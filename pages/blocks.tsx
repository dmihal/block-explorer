import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import { getBlocks, Block } from 'data/blocks';

interface BlocksPageProps {
  blocks: Block[];
}

const BlocksPage: NextPage<IndexPageProps> = ({ blocks }) => {
  return (
    <Layout title="Blocks">
      <h1>Blocks</h1>
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

export default BlocksPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const blocks = getBlocks();
  return { props: { blocks } };
};
