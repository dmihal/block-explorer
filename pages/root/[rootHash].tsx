import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import AssetChip from 'components/AssetChip';
import AssetAmount from 'components/AssetAmount';
import { Attributes, Attribute } from 'components/Attributes';
import FuelLink from 'components/FuelLink';
import Layout from 'components/Layout';
import SubHeader from 'components/SubHeader';
import Table from 'components/Table';
import { getAssets, Asset } from 'data/assets';
import { getRoot, Root } from 'data/roots';
import { setupEnv } from 'data/environment';

interface TableTX {
  index: number;
  hash: string;
  timestamp: number;
}

interface RootPageProps {
  _root: Root | null;
  transactions: TableTX[];
  assets: Asset[];
}

const RootPage: NextPage<RootPageProps> = ({ _root, assets }) => {
  if (!_root) {
    Router.push('/roots');
    return null;
  }

  const breadCrumbs = [
    { name: 'Network', page: '/network' },
    { type: 'block' as 'block', value: _root.block },
    'Root',
  ];

  return (
    <Layout title="Root" breadCrumbs={breadCrumbs} active="network">
      <SubHeader type="Root">{_root.hash}</SubHeader>

      <Attributes>
        <Attribute attribute="Producer">
          <FuelLink type="address">{_root.producer}</FuelLink>
        </Attribute>
        <Attribute attribute="Merkle tree root">{_root.merkleTreeRoot}</Attribute>
        <Attribute attribute="Commitment hash">{_root.commitmentHash}</Attribute>
        <Attribute attribute="Size">{_root.size} Bytes</Attribute>
        <Attribute attribute="Fee Token">
          <AssetChip address={_root.feeToken} assets={assets} />
        </Attribute>
        <Attribute attribute="Fee">
          <AssetAmount amount={_root.fee} asset={_root.feeToken} assets={assets} noChip />
        </Attribute>
        <Attribute attribute="Transactions">
          <div className="table-container">
            <Table
              columns={[
                { name: 'index', title: 'Index', type: 'text', minWidth: 40, grow: 0 },
                { name: 'hash', title: 'Transaction', type: 'link', linkType: 'transaction', minWidth: 50 },
              ]}
              data={_root.transactions.map((hash: string, index: number) => ({ hash, index }))}
              assets={assets}
            >
              <div className="empty">No transactions in this root</div>
            </Table>
          </div>
        </Attribute>
      </Attributes>

      <style jsx>{`
        .table-container {
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          margin: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default RootPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  setupEnv(req);

  const _root = await getRoot(params!.rootHash as string);

  if (!_root) {
    res.writeHead(301, { Location: '/roots' });
    res.end();
    return { props: { _root: null, assets: [] } };
  }

  const assets = await getAssets([_root.feeToken]);

  return { props: { _root, assets } };
};
