import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import AssetAmount from 'components/AssetAmount';
import { Attributes, Attribute } from 'components/Attributes';
import FuelLink from 'components/FuelLink';
import Layout from 'components/Layout';
import SubHeader from 'components/SubHeader';
import { getAssets, Asset } from 'data/assets';
import { getRoot, Root } from 'data/roots';

interface RootPageProps {
  _root: Root | null;
  assets: Asset[];
}

const RootPage: NextPage<RootPageProps> = ({ _root, assets }) => {
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
        <Attribute attribute="Producer">
          <FuelLink type="address">{_root.producer}</FuelLink>
        </Attribute>
        <Attribute attribute="Merkle tree root">{_root.merkleTreeRoot}</Attribute>
        <Attribute attribute="Commitment hash">{_root.commitmentHash}</Attribute>
        <Attribute attribute="Size">{_root.size}</Attribute>
        <Attribute attribute="Fee">
          <AssetAmount amount={_root.fee} asset={_root.feeToken} assets={assets} />
        </Attribute>
        <Attribute attribute="Transactions">
          {_root.transactions.map((tx: string) => (
            <div key={tx} className="tx">
              <FuelLink type="transaction">{tx}</FuelLink>
            </div>
          ))}
        </Attribute>
      </Attributes>

      <style jsx>{`
        .tx {
          overflow: hidden;
          margin-bottom: 50px;
        }
        .tx :global(a) {
          overflow: hidden;
          display: block;
          text-overflow: ellipsis;
        }

        @media (max-width: 600px) {
          .tx {
            margin-bottom: 0;
          }
        }
      `}</style>
    </Layout>
  );
};

export default RootPage;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const _root = getRoot(params!.rootHash as string);
  const assets = getAssets();

  if (!_root) {
    res.writeHead(301, { Location: '/roots' });
    res.end();
    return { props: { _root: null, assets } };
  }

  return { props: { _root, assets } };
};
