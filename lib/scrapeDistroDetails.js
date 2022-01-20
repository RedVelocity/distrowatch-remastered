import { load } from 'cheerio';

const getExtras = (headerText) => {
  if (headerText.includes('Popularity (hits per day):')) {
    const description = headerText
      .split('Popularity (hits per day):')[0]
      .trim();
    const [popularityText, rating] = headerText
      .split('Popularity (hits per day):')[1]
      .split('rating:');
    const popularity = {};
    popularityText
      .split(', ')
      .forEach(
        (item) =>
          (popularity[`${item.split(':')[0].trim()}`] = item
            .split(':')[1]
            .trim()
            .replace('Average visitor', ''))
      );
    return [
      description,
      popularity,
      Number.isNaN(parseFloat(rating)) ? 0 : parseFloat(rating),
    ];
  }
  const [description, rating] = headerText.includes('Average visitor')
    ? headerText.split('Average visitor rating:')
    : headerText.split('Visitor rating:');
  return [
    description.trim(),
    {},
    Number.isNaN(parseFloat(rating)) ? 0 : parseFloat(rating),
  ];
};
// Helper function
const ignore = ($, el, sel) =>
  $(el)
    .clone()
    .find(sel || '>*')
    .remove()
    .end();

const scrapeDistroDetails = (data, slug) => {
  const $ = load(data);
  // Throw error if distro does not exist
  if (
    $('body').text().includes('The distribution you requested does not exist')
  )
    throw new Error(404);
  // Header
  const header = '.TablesTitle';
  const title = $(header).children('h1').text();
  const logo = `https://distrowatch.com/${$(header)
    .children('img')
    .attr('src')}`;
  const bannerText = $(header).find('a > img').attr('src');
  const banner = `${
    bannerText !== undefined && `https://distrowatch.com/${bannerText}`
  }`;
  // Description, popularity & rating
  const descriptionHeaderText = $(ignore($, header, 'ul, div, h1, img'))
    .text()
    .trim();
  const [description, popularity, rating] = getExtras(descriptionHeaderText);
  // Header Attributes
  const attributes = [];
  $(header)
    .find('ul > li')
    .each((_, el) => attributes.push($(el).text().trim().split(':')));
  // Details
  const details = {};
  $('.Info:first')
    .find('tr')
    // Skip first two rows
    .next()
    .next()
    .each(
      (_, el) =>
        (details[`${$(el).children('th').text()}`] = $(el)
          .find('td > a')
          .map((__, e) => ({
            [`${$(e).text().trim()}`]: $(e).attr('href'),
          }))
          .get())
    );
  return {
    header: { title, attributes, logo, description, banner },
    details,
    popularity,
    rating,
    slug,
  };
};

export default scrapeDistroDetails;
