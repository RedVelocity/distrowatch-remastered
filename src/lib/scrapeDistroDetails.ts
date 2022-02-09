import { Cheerio, CheerioAPI, Node, load } from 'cheerio';
import {
  DistroModel,
  Header,
  Attributes,
  Popularity,
  Flag,
  Details,
} from '../models/Distro.d';
import getCountryFlag from '../services/getCountryFlag';
import toCamelCase from './toCamelCase';

// Helper function
const getExtras = (headerText: string): [string, Popularity, number] => {
  const popularity: Popularity = {};
  if (headerText.includes('Popularity (hits per day):')) {
    const description = headerText
      .split('Popularity (hits per day):')[0]
      .trim();
    const [popularityText, rating] = headerText
      .split('Popularity (hits per day):')[1]
      .split('rating:');
    popularityText.split(', ').forEach((item) => {
      const [period, values] = item.split(':');
      return (popularity[toCamelCase(period)] = values
        .trim()
        .replace('Average visitor', '')
        // eslint-disable-next-line no-useless-escape
        .replace(/[\(\)]/g, '')
        .split(' '));
    });
    return [
      description,
      popularity,
      Number.isNaN(parseFloat(rating)) ? 0 : parseFloat(rating),
    ];
  }
  // If there's no popularity text
  const [description, rating] = headerText.includes('Average visitor')
    ? headerText.split('Average visitor rating:')
    : headerText.split('Visitor rating:');
  return [
    description.trim(),
    popularity,
    Number.isNaN(parseFloat(rating)) ? 0 : parseFloat(rating),
  ];
};
// Helper function
const ignore = ($: CheerioAPI, el: string, sel: string): Cheerio<Node> =>
  $(el)
    .clone()
    .find(sel || '>*')
    .remove()
    .end();

// Main function
const scrapeDistroDetails = async (
  data: string,
  slug: string
): Promise<DistroModel> => {
  const $ = load(data);
  let distro = <DistroModel>{};
  // Throw error if distro does not exist
  if (
    $('body').text().includes('The distribution you requested does not exist')
  )
    throw new Error('404');
  // Header
  const headerText = '.TablesTitle';
  const title = $(headerText).children('h1').text();
  const logo = `https://distrowatch.com/${$(headerText)
    .children('img')
    .attr('src')}`;
  const bannerText = $(headerText).find('a > img').attr('src');
  const banner = `${
    bannerText !== undefined ? `https://distrowatch.com/${bannerText}` : 'false'
  }`;
  // Description, popularity & rating
  const descriptionHeaderText = $(ignore($, headerText, 'ul, div, h1, img'))
    .text()
    .trim();
  const [description, popularity, rating] = getExtras(descriptionHeaderText);
  // Header Attributes
  const attributes = <Attributes>{};
  $(headerText)
    .find('ul > li')
    .each((_, el) => {
      const [key, val] = $(el).text().trim().split(':');
      if (key === 'Popularity')
        attributes.rank =
          Object.keys(popularity).length > 0 ? popularity['6Months'] : [];
      else attributes[`${toCamelCase(key)}`] = val.trim();
    });
  // Add flags to attributes
  const flags: Flag[] = await Promise.all(
    attributes.origin.split(', ').map(async (country) => ({
      country,
      flag: await getCountryFlag(country),
    }))
  );
  attributes.flags = flags;
  // Details
  const details: Details = [];
  $('.Info:first')
    .find('tr')
    // Skip first two rows
    .next()
    .next()
    .each((_, el) => {
      $(el).children('th').text() !== '' &&
        details.push([
          $(el).children('th').text(),
          $(el)
            .find('td > a')
            .map((__, e) => ({
              text: $(e).text().trim(),
              link: `https://distrowatch.com/${$(e).attr('href')}`,
            }))
            .get(),
        ]);
      return true;
    });
  const header: Header = { title, logo, description, attributes, banner };
  distro = { header, details, popularity, rating, slug };
  return distro;
};

export default scrapeDistroDetails;
