import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import { Attributes, Attribute } from 'components/Attributes';
import EtherscanLink from 'components/EtherscanLink';
import Layout from 'components/Layout';
import FuelLink from 'components/FuelLink';
import SubHeader from 'components/SubHeader';
import { getBlock, Block } from 'data/blocks';
import { getRoot } from 'data/roots';

interface BlockPageProps {
  block: Block | null;
  rootSizes: { [hash: string]: number };
}

const BlockPage: NextPage<BlockPageProps> = ({ block, rootSizes }) => {
  if (!block) {
    Router.push('/blocks');
    return null;
  }

  const breadCrumbs = [
    { name: 'Network', page: '/' },
    'Block',
  ];

  return (
    <Layout title="Block" breadCrumbs={breadCrumbs} active="network">
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
              {rootSizes[_root] && (
                <div className="rootSize">{rootSizes[_root]} Transaction{rootSizes[_root] > 1 && 's'}</div>
              )}
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

        .rootSize {
          border-radius: 3px;
          border: solid 0.5px #69737d;
          padding: 3px 14px;
          font-size: 13px;
          font-weight: 500;
          font-style: italic;
          color: #69737d;
          display: inline-block;
          margin: 2px;
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

  const rootSizes: { [hash: string]: number } = {};

  if (!block) {
    res.writeHead(302, { Location: '/blocks' });
    res.end();
    return { props: { block: null, rootSizes } };
  }

  await Promise.all(block.roots.map(async (rootHash: string) => {
    const _root = await getRoot(rootHash);
    rootSizes[rootHash] = _root!.transactions.length;
  }));

  return { props: { block, rootSizes } };
};
