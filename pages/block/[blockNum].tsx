import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import { Attributes, Attribute } from 'components/Attributes';
import EtherscanLink from 'components/EtherscanLink';
import Layout from 'components/Layout';
import FuelLink from 'components/FuelLink';
import SubHeader from 'components/SubHeader';
import { getBlock, Block } from 'data/blocks';

interface BlockPageProps {
  block: Block | null;
}

const BlockPage: NextPage<BlockPageProps> = ({ block }) => {
  if (!block) {
    Router.push('/blocks');
    return null;
  }

  const breadCrumbs = [
    { name: 'Network', page: '/' },
    'Block',
  ];

  return (
    <Layout title="Blocks" breadCrumbs={breadCrumbs}>
      <SubHeader type="Block" inline>#{block.height}</SubHeader>

      <Attributes>
        <Attribute attribute="Producer">
          <FuelLink type="address">{block.producer}</FuelLink>
        </Attribute>

        {block.parentHash && (
          <Attribute attribute="Previous block hash">
            <FuelLink type="block" label={block.parentHash}>{block.height - 1}</FuelLink>
          </Attribute>
        )}

        <Attribute attribute="Block height">{block.height}</Attribute>
        <Attribute attribute="Ethereum block number">
          <EtherscanLink block={block.ethereumBlockNumber}>{block.ethereumBlockNumber}</EtherscanLink>
        </Attribute>
        <Attribute attribute="Number of tokens">{block.numTokens}</Attribute>
        <Attribute attribute="Number of addresses">{block.numAddresses}</Attribute>
        <Attribute attribute={`Roots (${block.roots.length})`}>
          {block.roots.map((_root: string) => (
            <div key={_root} className="root">
              <FuelLink type="root">{_root}</FuelLink>
            </div>
          ))}
        </Attribute>
      </Attributes>

      <style jsx>{`
        .root {
          overflow: hidden;
          margin-bottom: 50px;
        }
        .root :global(a) {
          overflow: hidden;
          display: block;
          text-overflow: ellipsis;
        }

        @media (max-width: 600px) {
          .root {
            margin-bottom: 0;
          }
        }
      `}</style>
    </Layout>
  );
};

export default BlockPage;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const block = await getBlock(parseInt(params!.blockNum as string));

  if (!block) {
    res.writeHead(302, { Location: '/blocks' });
    res.end();
    return { props: { block: null } };
  }

  return { props: { block } };
};
