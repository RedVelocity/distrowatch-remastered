import getDistroRankings from './getDistroRankings';

type Path = { params: { distro: string } };

const getDistroPaths = async (): Promise<Path[]> => {
  try {
    const rankings = await getDistroRankings();
    // Store all the paths from DW api data
    // const allPaths = [];
    // data.forEach((d) =>
    //   d.distributionsRanking?.forEach((distro) => allPaths.push(distro.url))
    // );
    // const paths = [...new Set(allPaths)].map((d) => ({
    //   params: { distro: d.replace('https://distrowatch.com/', '') },
    // }));
    const paths: Path[] = rankings.map((distro) => ({
      params: {
        distro: distro.distrowatch_distribution_detail_url.replace(
          'https://distrowatch.com/',
          ''
        ),
      },
    }));
    return paths;
  } catch (error) {
    return error;
  }
};

export default getDistroPaths;
