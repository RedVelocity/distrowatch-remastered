import { NextApiRequest, NextApiResponse } from 'next';
import getDistroDetails from '../../services/getDistroDetails';

const distro = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const pageData = await getDistroDetails(slug.toString());
    return res.json(pageData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`error`, error);
    return res.status(500).send('error');
  }
};

export default distro;
