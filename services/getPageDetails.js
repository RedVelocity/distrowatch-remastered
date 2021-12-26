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
    let attributes = {};
    const title = $(header).children('h1').text();
    const logo = $(header).children('img').attr('src');
    const description = $(ignore(header, 'ul, b, a, div, h1, img'))
      .text()
      .trim();
    $(header)
      .find('ul > li')
      .each(
        (_, el) =>
          (attributes = {
            ...attributes,
            [`${$(el).children('b').text()}`]: $(el)
              .children('a, font')
              // .not('b')
              .map((__, e) => $(e).text().trim())
              .get(),
          })
      );
    // Summary
    const summary = [];
    $('.Info:first')
      .find('tr')
      .each((_, el) =>
        summary.push({
          [`${$(el).children('th').text()}`]: $(el)
            .children('td')
            .text()
            .trim(),
        })
      );
    return { header: { title, attributes, logo, description }, summary };
  } catch (error) {
    // console.log(`error`, error);
    return 404;
  }
};

export default getPageDetails;
