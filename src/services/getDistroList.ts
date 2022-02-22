import axios from 'axios';

export type Distribution = {
  slug: string;
  name: string;
  distrowatch_distribution_detail_url: string;
  distribution_detail_url: string;
};

type Response = {
  message: string;
  distributions: Distribution[];
};

const getDistroList = async (): Promise<Distribution[]> => {
  const API_ENDPOINT = 'https://diwa.herokuapp.com/api/distribution';
  try {
    const { data }: { data: Response } = await axios.get(API_ENDPOINT);
    const { distributions } = data;
    return distributions;
  } catch (error) {
    return error;
  }
};

export default getDistroList;
