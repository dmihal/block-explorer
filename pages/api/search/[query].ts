import { NextApiRequest, NextApiResponse } from 'next';
import { isUInt } from 'utils/str';
import getAPI from 'data/api';
import { setupEnv } from 'data/environment';

const addressRegex = /0x[0-9a-f]{40}/i;

const noOp = () => void null;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    setupEnv(req);

    const query = req.query.query as string;
    let page = null;
    let path = null;

    if (isUInt(query)) {
      if (await getAPI().getBlockByHeight(parseInt(query)).catch(noOp)) {
        page = '/block/[blockNum]';
        path = `/block/${query}`;
      }
    } else if (query.indexOf('0x') === 0) {
      const isTx = getAPI().getTransactionByHash(query).catch(noOp);
      const isRoot = getAPI().getRootByHash(query).catch(noOp);

      if (await isTx) {
        page = '/transaction/[txHash]';
        path = `/transaction/${query}`;
      } else if (await isRoot) {
        page = '/root/[rootHash]';
        path = `/root/${query}`;
      } else if (addressRegex.test(query)) {
        page = '/address/[address]';
        path = `/address/${query}`;
      }
    }

    res.status(200).json({ path, page });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message || err })
  }
}

export default handler;
