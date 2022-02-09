import axios from 'axios';
import distro from '../pages/distro';

type Path = { params: { distro: string } };

const getDistroPaths = async (): Promise<Path[]> => {
  const API_ENDPOINT =
    'https://raw.githubusercontent.com/jamezrin/distrowatch-data/master/rankings.json';

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // Store all the paths from DW api data
    // const allPaths = [];
    // data.forEach((d) =>
    //   d.distributionsRanking?.forEach((distro) => allPaths.push(distro.url))
    // );
    // const paths = [...new Set(allPaths)].map((d) => ({
    //   params: { distro: d.replace('https://distrowatch.com/', '') },
    // }));
    const paths: Path[] = data[21]?.distributionsRanking?.map((distro) => ({
      params: { distro: distro.url.replace('https://distrowatch.com/', '') },
    }));
    return paths;
  } catch (error) {
    return error;
  }
};

export default getDistroPaths;
