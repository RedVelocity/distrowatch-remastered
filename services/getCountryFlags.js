import axios from 'axios';

const getCountryFlags = async (countryName) => {
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  return data[0].flags.svg;
};

export default getCountryFlags;
