import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import Layout from 'components/Layout';
import { getTransaction, Transaction } from 'data/transactions';

interface IndexPageProps {
  block: Transaction | null;
}

const TransactionPage: NextPage<BlockPageProps> = ({ transaction }) => {
  if (!transaction) {
    Router.push('/transactions');
    return null;
  }

  return (
    <Layout title="Transaction">
      <h1>Transaction {transaction.hash}</h1>
      <pre>{JSON.stringify(transaction, null, '  ')}</pre>
      <h2>Inputs</h2>
      <ul>
        {transaction.inputs.map((input, i) => (
          <li key={i}>{JSON.stringify(input)}</li>
        ))}
      </ul>
      <h2>Outputs</h2>
      <ul>
        {transaction.outputs.map((output, i) => (
          <li key={i}>{JSON.stringify(output)}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default TransactionPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { txHash } = params;
  const transaction = getTransaction(txHash);
  return { props: { transaction } };
};
