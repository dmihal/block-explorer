import { NextApiRequest, NextApiResponse } from 'next';
import { getBlock } from 'data/blocks';
import { getRoot } from 'data/roots';
import { getTransaction } from 'data/transactions';
import { getAddresses } from 'data/addresses';
import { isUInt } from 'utils/str';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req.query;
    let page = null;
    let path = null;

    if (isUInt(query)) {
      if (getBlock(parseInt(query))) {
        page = '/block/[blockNum]';
        path = `/block/${query}`;
      }
    } else {
      if (getTransaction(query)) {
        page = '/transaction/[txHash]';
        path = `/transaction/${query}`;
      } else if (getRoot(query)) {
        page = '/root/[rootHash]';
        path = `/root/${query}`;
      }
    }

    res.status(200).json({ path, page });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler;
