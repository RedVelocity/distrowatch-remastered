import getDistroDetails from '../../services/getDistroDetails';

const getDistro = async (req, res) => {
  try {
    const { distro } = req.query;
    const pageData = await getDistroDetails(distro);
    return res.json(pageData);
  } catch (error) {
    console.log(`error`, error);
    return res.status(500).send('error');
  }
};

export default getDistro;
