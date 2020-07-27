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
import { getTransaction, Transaction } from 'data/transactions';

interface TableTX {
  index: string;
  hash: string;
  timestamp: number;
}

interface RootPageProps {
  _root: Root | null;
  transactions: TableTX[];
  assets: Asset[];
}

const RootPage: NextPage<RootPageProps> = ({ _root, assets, transactions }) => {
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
        <Attribute attribute="Size">{_root.size} Bytes</Attribute>
        <Attribute attribute="Fee Token">
          <AssetChip address={_root.feeToken} assets={assets} />
        </Attribute>
        <Attribute attribute="Fee">
          <AssetAmount amount={_root.fee} asset={_root.feeToken} assets={assets} noChip />
        </Attribute>
        <Attribute attribute="Transactions">
          {_root.transactions.map((tx: string) => (
            <div key={tx} className="tx">
              <FuelLink type="transaction">{tx}</FuelLink>
            </div>
          ))}

          <Table
            columns={[
              { name: 'index', title: 'Index', type: 'text', minWidth: 40, grow: 0 },
              { name: 'hash', title: 'Transaction', type: 'link', linkType: 'transaction', minWidth: 50 },
              { name: 'timestamp', title: 'Created (UTC)', type: 'date', format: 'yyyy-MM-dd HH:mm' },
            ]}
            data={transactions}
            assets={assets}
          >
            <div className="empty">This address has not competed a transaction</div>
          </Table>
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

const txToTableTX = (tx: Transaction, index: number): TableTX => {
  return {
    index,
    hash: tx.hash,
    timestamp: Date.now(), // TODO: real date
  };
}

const _getTransaction = async (hash: string, index: number) => {
  const tx = await getTransaction(hash);
  if (!tx) {
    throw new Error(`Couldn't find tx ${hash}`);
  }
  return txToTableTX(tx, index);
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const _root = await getRoot(params!.rootHash as string);

  if (!_root) {
    res.writeHead(301, { Location: '/roots' });
    res.end();
    return { props: { _root: null, assets: [], transactions: [] } };
  }

  const assets = await getAssets([_root.feeToken]);

  const transactions = await Promise.all(_root.transactions.map(_getTransaction));

  return { props: { _root, assets, transactions } };
};
