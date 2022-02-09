import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import dbConnect from './dbConnect';
import scrapeDistroDetails from '../lib/scrapeDistroDetails';
import Distro from '../models/Distro';
import { DistroDocument } from './../models/Distro.d';

const getDistroDetails = async (slug: string): Promise<DistroDocument> => {
  const API_ENDPOINT = `https://distrowatch.com/table.php?distribution=${slug}`;
  const USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36';
  await dbConnect();
  const distro: DistroDocument = await Distro.findOne({ slug });
  // Scrape distrowatch.com if not cached in DB for last 6 days
  const isStale: boolean = distro
    ? dayjs(distro.updatedAt).diff(Date.now(), 'd') < -6
    : true;
  if (isStale) {
    const res: AxiosResponse = await axios.get(API_ENDPOINT, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });
    // Call helper function to scrape data
    const distroData = await scrapeDistroDetails(res.data, slug);
    // Save scraped data to DB and return it
    const newDistro: DistroDocument = await Distro.findOneAndUpdate(
      { slug },
      distroData,
      {
        upsert: true,
        new: true,
      }
    );
    return newDistro;
  }
  // Return cached data from DB
  return distro;
};

export default getDistroDetails;
