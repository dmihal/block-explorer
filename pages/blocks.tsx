import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import SubHeader from 'components/SubHeader';
import { getBlocks, Block } from 'data/blocks';

interface BlocksPageProps {
  blocks: Block[];
}

const BlocksPage: NextPage<BlocksPageProps> = ({ blocks }) => {
  return (
    <Layout title="Blocks" active="network">
      <SubHeader type="Blocks" />
      <ul>
        {blocks.map((block: Block) => (
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

export const getServerSideProps: GetServerSideProps = async () => {
  const blocks = await getBlocks();
  return { props: { blocks } };
};
