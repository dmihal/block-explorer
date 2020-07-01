import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import AssetAmount from 'components/AssetAmount';
import { Attributes, Attribute } from 'components/Attributes';
import Layout from 'components/Layout';
import SubHeader from 'components/SubHeader';
import { getAssets, Asset } from 'data/assets';
import { getTransaction, Transaction } from 'data/transactions';

interface TransactionPageProps {
  transaction: Transaction | null;
  assets: Asset[];
}

const TransactionPage: NextPage<TransactionPageProps> = ({ transaction, assets }) => {
  if (!transaction) {
    Router.push('/transactions');
    return null;
  }

  const breadCrumbs = [
    { name: 'Network', page: '/' },
    { type: 'block' as 'block', value: transaction.block },
    { type: 'root' as 'root', value: transaction.root },
    'Transaction',
  ];

  return (
    <Layout title="Transaction" breadCrumbs={breadCrumbs}>
      <SubHeader type="Transaction">{transaction.hash}</SubHeader>

      <div className="columns">
        <Attributes>
          <Attribute attribute={`Input (${transaction.inputs.length})`}>
            {transaction.inputs.map((input: any, i: number) => (
              <AssetAmount key={i} amount={input.value} asset={input.asset} assets={assets} />
            ))}
          </Attribute>
        </Attributes>

        <Attributes>
          <Attribute attribute={`Output (${transaction.outputs.length})`}>
            {transaction.outputs.map((output: any, i: number) => (
              <div key={i}>
                <AssetAmount amount={output.value} asset={output.asset} assets={assets} />
                <div>To: {output.account}</div>
              </div>
            ))}
          </Attribute>
        </Attributes>
      </div>

      <Attributes>
        <Attribute attribute="Fee">
          <AssetAmount amount={transaction.fee} asset={transaction.feeToken} assets={assets} />
        </Attribute>
        <Attribute attribute="Data size">{transaction.size}</Attribute>
        <Attribute attribute={`Witness (${transaction.inputs.length})`}>
          {transaction.inputs.map((input: any) => (<div key={input.account}>{input.account}</div>))}
        </Attribute>
      </Attributes>

      <style jsx>{`
        .columns {
          display: flex;
        }
        .columns > :global(*) {
          flex: 1 0 0;
        }
      `}</style>
    </Layout>
  );
};

export default TransactionPage;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const transaction = getTransaction(params!.txHash as string);
  const assets = getAssets();

  if (!transaction) {
    res.writeHead(301, { Location: '/transactions' });
    res.end();
    return { props: { transaction: null, assets } };
  }

  return { props: { transaction, assets } };
};
