import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import { getRoots, Root } from 'data/roots';

interface RootsPageProps {
  roots: Root[];
}

const RootsPage: NextPage<RootsPageProps> = ({ roots }) => {
  return (
    <Layout title="roots">
      <h1>Roots</h1>
      <ul>
        {roots.map((_root: Root) => (
          <li key={_root.hash}>
            <Link href="/root/[rootHash]" as={`/root/${_root.hash}`}>
              <a>{_root.hash}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default RootsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const roots = await getRoots();
  return { props: { roots } };
};
