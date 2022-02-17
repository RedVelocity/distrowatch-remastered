import axios from 'axios';
// Hits per day
type HPD = {
  count: number;
  status: string;
  alt: string;
  image: string;
};
// Ranking
export type Ranking = {
  no: number;
  distribution: string;
  distrowatch_distribution_detail_url: string;
  distribution_detail_url: string;
  hpd: HPD;
  hits_yesterday_count: number;
};
// Diwa Response
export type Response = {
  message: string;
  hpd: string;
  data_span: string;
  rankings: Ranking[];
};

const getDistroRankings = async (): Promise<Ranking[]> => {
  const API_ENDPOINT = 'https://diwa.herokuapp.com/api/ranking';

  try {
    const { data }: { data: Response } = await axios.get(API_ENDPOINT);
    const { rankings } = data;
    // console.log('rankings', rankings);
    return rankings;
  } catch (error) {
    return error;
  }
};

export default getDistroRankings;
