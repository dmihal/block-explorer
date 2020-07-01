import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import { Attributes, Attribute } from 'components/Attributes';
import FuelLink from 'components/FuelLink';
import Layout from 'components/Layout';
import SubHeader from 'components/SubHeader';
import { getRoot, Root } from 'data/roots';

interface RootPageProps {
  _root: Root | null;
}

const RootPage: NextPage<RootPageProps> = ({ _root }) => {
  if (!_root) {
    Router.push('/roots');
    return null;
  }

  const breadCrumbs = [
    { name: 'Network', page: '/' },
    { type: 'block' as 'block', value: _root.block },
    'Root',
  ];

  return (
    <Layout title="Roots" breadCrumbs={breadCrumbs}>
      <SubHeader type="Root">{_root.hash}</SubHeader>

      <Attributes>
        <Attribute attribute="Producer">{_root.producer}</Attribute>
        <Attribute attribute="Merkle tree root">{_root.merkleTreeRoot}</Attribute>
        <Attribute attribute="Commitment hash">{_root.commitmentHash}</Attribute>
        <Attribute attribute="Size">{_root.size}</Attribute>
        <Attribute attribute="Fee token">{_root.feeToken}</Attribute>
        <Attribute attribute="Fee">{_root.fee}</Attribute>
        <Attribute attribute="Transactions">
          {_root.transactions.map((tx: string) => (
            <div key={tx} className="tx">
              <FuelLink type="transaction">{tx}</FuelLink>
            </div>
          ))}
        </Attribute>
      </Attributes>
    </Layout>
  );
};

export default RootPage;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const _root = getRoot(params!.rootHash as string);

  if (!_root) {
    res.writeHead(301, { Location: '/roots' });
    res.end();
    return { props: { _root: null } };
  }

  return { props: { _root } };
};
