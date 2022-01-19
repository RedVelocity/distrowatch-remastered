import axios from 'axios';
import dbConnect from './dbConnect';
import buildDistroDetails from '../lib/buildDistroDetails';
import Distro from '../models/Distro';

const getDistroDetails = async (slug) => {
  const API_ENDPOINT = `https://distrowatch.com/table.php?distribution=${slug}`;
  const USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36';
  try {
    await dbConnect();
    const distro = await Distro.findOne({ slug }).lean();
    // Scrape distrowatch.com if not cached in DB
    if (!distro) {
      const { data } = await axios.get(API_ENDPOINT, {
        headers: {
          'User-Agent': USER_AGENT,
        },
      });
      // Call helper function to scrape data
      // Save scraped data to DB and return it
      const newDistro = await Distro.findOneAndUpdate(
        { slug },
        buildDistroDetails(data, slug),
        { upsert: true, new: true }
      );
      // console.log(`newDistro`, newDistro);
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
