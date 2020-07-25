import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import AssetAmount from 'components/AssetAmount';
import AssetChip from 'components/AssetChip';
import { Attributes, Attribute } from 'components/Attributes';
import Layout from 'components/Layout';
import FuelLink from 'components/FuelLink';
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
              <div key={i}>
                <AssetAmount key={i} amount={input.value} asset={input.asset} assets={assets} />
                <div className="twocol-address">
                  From: <FuelLink type="address">{input.account}</FuelLink>
                </div>
              </div>
            ))}
          </Attribute>
        </Attributes>

        <Attributes>
          <Attribute attribute={`Output (${transaction.outputs.length})`}>
            {transaction.outputs.map((output: any, i: number) => (
              <div key={i}>
                <AssetAmount amount={output.value} asset={output.asset} assets={assets} />
                <div className="twocol-address">
                  To: <FuelLink type="address">{output.account}</FuelLink>
                </div>
              </div>
            ))}
          </Attribute>
        </Attributes>
      </div>

      <Attributes>
        <Attribute attribute="Fee Token">
          <AssetChip address={transaction.feeToken} assets={assets} />
        </Attribute>
        <Attribute attribute="Fee">
          <AssetAmount amount={transaction.fee} asset={transaction.feeToken} assets={assets} noChip />
        </Attribute>
        <Attribute attribute="Data size">{transaction.size}</Attribute>
        <Attribute attribute={`Witness (${transaction.inputs.length})`}>
          {transaction.inputs.map((input: any) => (
            <div key={input.account}><FuelLink type="address">{input.account}</FuelLink></div>
          ))}
        </Attribute>
      </Attributes>

      <style jsx>{`
        .columns {
          display: flex;
        }
        .columns > :global(*) {
          flex: 1 0 0;
          width: 50%;
        }

        .twocol-address {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 600px) {
          .columns {
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  );
};

export default TransactionPage;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const transaction = await getTransaction(params!.txHash as string);
  const assets = await getAssets();

  if (!transaction) {
    res.writeHead(301, { Location: '/transactions' });
    res.end();
    return { props: { transaction: null, assets } };
  }

  return { props: { transaction, assets } };
};
