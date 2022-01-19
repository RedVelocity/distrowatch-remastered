import axios from 'axios';
import dbConnect from './dbConnect';
import buildDistroDetails from '../lib/buildDistroDetails';
import Distro from '../models/Distro';

const getDistroDetails = async (slug) => {
  const API_ENDPOINT = `https://distrowatch.com/table.php?distribution=${slug}`;
  try {
    await dbConnect();
    const distro = await Distro.findOne({ slug }).lean();
    // Scrape distrowatch.com if not cached in DB
    if (!distro) {
      const { data } = await axios.get(API_ENDPOINT, {
        headers: {
          'User-Agent': 'Chrome/96.0.4664.93',
        },
      });
      // Call helper function to scrape data
      // Save scraped data to DB and return it
      const newDistro = await Distro.create(buildDistroDetails(data, slug));
      return newDistro.toObject();
    }
    // Return cached data from DB
    return distro;
  } catch (error) {
    console.log(`error`, error);
    return 404;
  }
};

export default getDistroDetails;
