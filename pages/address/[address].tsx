import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import Layout from 'components/Layout';
import { getAddress, Address } from 'data/addresses';
import { getAssetName, formatValue } from 'data/assets';

interface AddressPageProps {
  address: Address | null;
}

const AddressPage: NextPage<AddressPageProps> = ({ address }) => {
  if (!address) {
    Router.push('/accounts');
    return null;
  }

  return (
    <Layout title={address.address}>
      <h1>Address {address.address}</h1>

      <h2>Balances</h2>
      <ul>
        {Object.entries(address.balances).map(([asset, balance]: [string, string]) => (
          <li key={asset}>{getAssetName(asset)}: {formatValue(balance, asset)}</li>
        ))}
      </ul>

      <h2>Transactions</h2>
      <ul>
        {address.transactions.map(tx => (
          <li key={tx}>
            <Link href="/transaction/[txHash]" as={`/transaction/${tx}`}><a>{tx}</a></Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default AddressPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const address = getAddress(params.address);
  return { props: { address } };
};
