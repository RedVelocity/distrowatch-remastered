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
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
        },
      });
      // Call helper function to scrape data
      const newDistro = new Distro(buildDistroDetails(data, slug));
      // Save scraped data to DB and return it
      await newDistro.save();
      console.log(`newDistro.toObject()`, newDistro.toObject());
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
