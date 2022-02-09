import { NextApiRequest, NextApiResponse } from 'next';
import getDistroDetails from '../../services/getDistroDetails';

const getDistro = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { distro } = req.query;
    const pageData = await getDistroDetails(distro.toString());
    return res.json(pageData);
  } catch (error) {
    console.log(`error`, error);
    return res.status(500).send('error');
  }
};

export default getDistro;
