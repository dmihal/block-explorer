import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import { getBlocks, Block } from 'data/blocks';

interface IndexPageProps {
  blocks: Block[];
}

const IndexPage: NextPage<IndexPageProps> = ({ blocks }) => {
  return (
    <Layout title="Blocks">
      <h1>Blocks</h1>
      <ul>
        {blocks.map((block) => (
          <li key={block.hash}>
            <Link href={`/blocks/${block.number}`}>
              <a>Block {block.number}</a>
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
