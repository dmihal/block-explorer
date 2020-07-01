import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { Attributes, Attribute } from 'components/Attributes';
import Layout from 'components/Layout';
import SubHeader from 'components/SubHeader';
import { getTransaction, Transaction } from 'data/transactions';

interface TransactionPageProps {
  block: Transaction | null;
}

const TransactionPage: NextPage<TransactionPageProps> = ({ transaction }) => {
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
              <div key={i}>{input.asset} {input.value}</div>
            ))}
          </Attribute>
        </Attributes>

        <Attributes>
          <Attribute attribute={`Output (${transaction.outputs.length})`}>
            {transaction.outputs.map((output: any, i: number) => (
              <div key={i}>
                <div>{output.asset} {output.value}</div>
                <div>To: {output.account}</div>
              </div>
            ))}
          </Attribute>
        </Attributes>
      </div>

      <Attributes>
        <Attribute attribute="Fee token">{transaction.feeToken}</Attribute>
        <Attribute attribute="Fee">{transaction.fee}</Attribute>
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
  const { txHash } = params;
  const transaction = getTransaction(txHash);

  if (!transaction) {
    res.writeHead(301, { Location: '/transactions' });
    res.end();
    return { props: { transaction: null } };
  }

  return { props: { transaction } };
};
