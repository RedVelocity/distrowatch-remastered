import axios from 'axios';

const getCountryFlag = async (countryName: string): Promise<string> => {
  if (countryName === 'Global') return 'https://flagcdn.com/eu.svg';
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  return data[0].flags.svg;
};

export default getCountryFlag;
