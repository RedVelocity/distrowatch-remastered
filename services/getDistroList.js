import axios from 'axios';

const getDistroList = async () => {
  const API_ENDPOINT =
    'https://raw.githubusercontent.com/jamezrin/distrowatch-data/master/rankings.json';

  try {
    const { data } = await axios.get(API_ENDPOINT);
    const paths = data[19]?.distributionsRanking?.map((distro) => ({
      params: { distro: distro.url.replace('https://distrowatch.com/', '') },
    }));
    return paths;
  } catch (error) {
    return error;
  }
};

export default getDistroList;
