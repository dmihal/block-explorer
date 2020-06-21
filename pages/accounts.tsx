import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import { getAddresses, Address } from 'data/addresses';

interface AccountsPageProps {
  addresses: Address[];
}

const AccountsPage: NextPage<AccountsPageProps> = ({ addresses }) => {
  return (
    <Layout title="Accounts">
      <h1>Accounts</h1>
      <ul>
        {addresses.map((address: Address) => (
          <li key={address.address}>
            <Link href="/address/[address]" as={`/address/${address.address}`}>
              <a>{address.address}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default AccountsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const addresses = getAddresses();
  return { props: { addresses } };
};
