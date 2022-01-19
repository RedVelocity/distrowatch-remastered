import getDistroDetails from '../../services/getDistroDetails';

const getDistro = async (req, res) => {
  try {
    const { slug } = req.query;
    const pageData = await getDistroDetails(slug);
    return res.json(pageData);
  } catch (error) {
    console.log(`error`, error);
    return res.status(500).send('error');
  }
};

export default getDistro;
