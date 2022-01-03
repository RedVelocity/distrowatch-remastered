import axios from 'axios';
import { load } from 'cheerio';

const getPageDetails = async (distro) => {
  const API_ENDPOINT = `https://distrowatch.com/${distro}`;
  try {
    const { data } = await axios.get(API_ENDPOINT, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
      },
    });
    const $ = load(data);
    // Throw error if distro does not exist
    if (
      $('body').text().includes('The page you requested is no longer available')
    )
      throw new Error(404);
    // Helper function
    const ignore = (el, sel) =>
      $(el)
        .clone()
        .find(sel || '>*')
        .remove()
        .end();
    // Header
    const header = '.TablesTitle';
    const title = $(header).children('h1').text();
    const logo = $(header).children('img').attr('src');
    // Description, popularity & rating
    const descriptionHeaderText = $(ignore(header, 'ul, div, h1, img'))
      .text()
      .trim();
    const [description, popularityHeadertext] = descriptionHeaderText.split(
      'Popularity (hits per day):'
    );
    const [popularity, rating] = popularityHeadertext.split('rating:');
    // Header Attributes
    const attributes = [];
    $(header)
      .find('ul > li')
      .each((_, el) => attributes.push($(el).text().trim().split(':')));
    // Details
    const details = [];
    $('.Info:first')
      .find('tr')
      // Skip first two rows
      .next()
      .next()
      .each((_, el) =>
        details.push({
          [`${$(el).children('th').text()}`]: $(el)
            .find('td > a')
            .map((__, e) => ({
              [`${$(e).text().trim()}`]: $(e).attr('href'),
            }))
            .get(),
        })
      );
    return {
      header: { title, attributes, logo, description: description.trim() },
      details,
      popularity: popularity.trim(),
      rating: rating.trim(),
    };
  } catch (error) {
    // console.log(`error`, error);
    return 404;
  }
};

export default getPageDetails;
