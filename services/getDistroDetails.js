import axios from 'axios';
import dayjs from 'dayjs';
import dbConnect from './dbConnect';
import scrapeDistroDetails from '../lib/scrapeDistroDetails';
import Distro from '../models/Distro';

const getDistroDetails = async (slug) => {
  const API_ENDPOINT = `https://distrowatch.com/table.php?distribution=${slug}`;
  const USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36';
  try {
    await dbConnect();
    const distro = await Distro.findOne({ slug }).lean();
    // Scrape distrowatch.com if not cached in DB for last 7days
    const shouldScrape = distro
      ? dayjs(distro.updatedAt).diff(Date.now(), 'd') > 7
      : true;
    if (shouldScrape) {
      const { data } = await axios.get(API_ENDPOINT, {
        headers: {
          'User-Agent': USER_AGENT,
        },
      });
      // Call helper function to scrape data
      const distroData = scrapeDistroDetails(data, slug);
      // Save scraped data to DB and return it
      const newDistro = await Distro.findOneAndUpdate({ slug }, distroData, {
        upsert: true,
        new: true,
      });
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
