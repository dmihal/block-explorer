import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import AssetAmount from 'components/AssetAmount';
import AssetChip from 'components/AssetChip';
import Layout from 'components/Layout';
import SubHeader from 'components/SubHeader';
import { getAddress, Address } from 'data/addresses';
import { getAssets, Asset } from 'data/assets';

interface AddressPageProps {
  address: Address | null;
  assets: Asset[];
}

const AddressPage: NextPage<AddressPageProps> = ({ address, assets }) => {
  if (!address) {
    Router.push('/accounts');
    return null;
  }

  return (
    <Layout title="Address">
      <div className="balances">
        <h3>Balances</h3>
        <ul>
          {Object.entries(address.balances).map(([asset, balance]: [string, string]) => (
            <div key={asset} className="balance">
              <div><AssetChip address={asset} assets={assets} /></div>
              <div><AssetAmount amount={balance} asset={asset} assets={assets} noChip /></div>
            </div>
          ))}
        </ul>
      </div>

      <SubHeader type="Address">{address.address}</SubHeader>

      <h3>Transactions</h3>
      <ul>
        {address.transactions.map(tx => (
          <li key={tx}>
            <Link href="/transaction/[txHash]" as={`/transaction/${tx}`}><a>{tx}</a></Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .balances {
          width: 671px;
          height: 243px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          padding: 24px 32px;
          background: white;
          float: right;
        }

        h3 {
          font-size: 25px;
          font-weight: 600;
          color: #26282a;
        }

        .balance {
          display: flex;
          font-size: 25px;
        }
        .balance > div {
          flex: 1 0 0;
        }
      `}</style>
    </Layout>
  );
};

export default AddressPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const address = getAddress(params!.address as string);
  const assets = getAssets();

  return { props: { address, assets } };
};
