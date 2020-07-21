import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import { getTransactions, Transaction } from 'data/transactions';

interface IndexPageProps {
  transactions: Transaction[];
}

const TransactionsPage: NextPage<IndexPageProps> = ({ transactions }) => {
  return (
    <Layout title="Transactions">
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.hash}>
            <Link href="/transaction/[txHash]" as={`/transaction/${transaction.hash}`}>
              <a>{transaction.hash}</a>
            </Link>
            <div>Block {transaction.block}</div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const transactions = await getTransactions();
  return { props: { transactions } };
};
