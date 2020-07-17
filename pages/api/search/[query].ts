import { NextApiRequest, NextApiResponse } from 'next';
import { getBlock } from 'data/blocks';
import { getRoot } from 'data/roots';
import { getTransaction } from 'data/transactions';
// import { getAddresses } from 'data/addresses';
import { isUInt } from 'utils/str';

const addressRegex = /0x[0-9a-f]{40}/i;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.query.query as string;
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
      } else if (addressRegex.test(query)) {
        page = '/address/[address]';
        path = `/address/${query}`;
      }
    }

    res.status(200).json({ path, page });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler;
