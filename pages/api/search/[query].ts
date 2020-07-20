import { NextApiRequest, NextApiResponse } from 'next';
import { isUInt } from 'utils/str';
import api from 'data/api';

const addressRegex = /0x[0-9a-f]{40}/i;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.query.query as string;
    let page = null;
    let path = null;

    if (isUInt(query)) {
      if (await api.getBlockByHeight(parseInt(query))) {
        page = '/block/[blockNum]';
        path = `/block/${query}`;
      }
    } else {
      if (await api.getTransactionByHash(query)) {
        page = '/transaction/[txHash]';
        path = `/transaction/${query}`;
      } else if (await api.getRootByHash(query)) {
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
