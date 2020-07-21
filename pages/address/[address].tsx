import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import AssetAmount from 'components/AssetAmount';
import AssetChip from 'components/AssetChip';
import Layout from 'components/Layout';
import Table from 'components/Table';
import SubHeader from 'components/SubHeader';
import { getAddress, Address } from 'data/addresses';
import { getAssets, Asset } from 'data/assets';
import { getTransaction, Transaction } from 'data/transactions';
import emptyTray from 'assets/empty-tray.svg';

interface AddressPageProps {
  address: Address | null;
  assets: Asset[];
  transactions: Transaction[];
}

interface TableTX {
  hash: string;
  type: string;
  from: string;
  to: string;
  amount: { asset: string, value: string };
}

const AddressPage: NextPage<AddressPageProps> = ({ address, assets, transactions }) => {
  if (!address) {
    Router.push('/accounts');
    return null;
  }

  return (
    <Layout title="Address">
      <div className="balances">
        <h3>Balances</h3>
        <ul className="balance-list">
          {Object.entries(address.balances).map(([asset, balance]: [string, string]) => (
            <div key={asset} className="balance">
              <div><AssetChip address={asset} assets={assets} /></div>
              <div><AssetAmount amount={balance} asset={asset} assets={assets} noChip /></div>
            </div>
          ))}
        </ul>

        {Object.entries(address.balances).length === 0 && (
          <div className="empty-balance">Balance is empty</div>
        )}
      </div>

      <SubHeader type="Address" qr copy>{address.address}</SubHeader>

      <h3>Transactions</h3>
      <div>
        Showing <span className="num">{transactions.length}</span> out of {}
        <span className="num">{transactions.length}</span> transactions
      </div>
      <div className="break" />
      <Table
        columns={[
          { name: 'hash', title: 'UTXO Hash', type: 'link', linkType: 'transaction', grow: 0.7, minWidth: 50 },
          { name: 'type', title: 'Type', type: 'text', grow: 0.6, minWidth: 50 },
          // { name: 'timestamp', title: 'Created (UTC)', type: 'date', format: 'MM/DD/YYYY-MM-DD HH:mm' },
          { name: 'from', title: 'From', type: 'link', linkType: 'address', ignore: address.address },
          { name: 'to', title: 'To', type: 'link', linkType: 'address', ignore: address.address },
          { name: 'amount', title: 'Value', type: 'amount', minWidth: 50, grow: 0.6 },
        ]}
        data={transactions}
        assets={assets}
      >
        <div className="empty">This address has not competed a transaction</div>
      </Table>

      <style jsx>{`
        .balances {
          width: 352px;
          height: 163px;
          border-radius: 6px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          padding: 16px 20px;
          background: white;
          float: right;
          display: flex;
          flex-direction: column;
        }

        h3 {
          font-size: 18px;
          font-weight: 600;
          color: #26282a;
        }

        .balance-list {
          margin: 0;
        }
        .balance {
          display: flex;
          font-size: 16px;
        }
        .balance + .balance {
          margin-top: 28px;
        }
        .balance > div {
          flex: 1 0 0;
        }

        .num {
          border-radius: 3px;
          background-color: #f5f5f5;
        }
        .break {
          clear: both;
        }

        .empty-balance {
          color: #26282a;
          text-align: center;
          flex: 1;
          padding-top: 50px;
          background-image: url('${emptyTray}');
          background-repeat: no-repeat;
          background-position: top center;
          background-size: 55px;
        }

        .empty {
          color: #26282a;
        }
      `}</style>
    </Layout>
  );
};

export default AddressPage;

const txToTableTX = (tx: Transaction): TableTX => {
  return {
    hash: tx.hash,
    type: 'Transfer',
    from: tx.inputs[0].account,
    to: tx.outputs[0].account,
    amount: { asset: tx.inputs[0].asset, value: tx.inputs[0].value }
  };
}

const _getTransaction = async (hash: string) => {
  const tx = await getTransaction(hash);
  if (!tx) {
    throw new Error(`Couldn't find tx ${hash}`);
  }
  return tx;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const address = await getAddress(params!.address as string);
  const assets = await getAssets();

  if (!address) {
    res.writeHead(302, { Location: '/accounts' });
    res.end();
    return { props: { address: null, assets, transactions: [] } };
  }

  const transactions = await Promise.all(address.transactions.map(
    (txHash: string) => _getTransaction(txHash).then(txToTableTX)
  ));

  return { props: { address, assets, transactions } };
};
