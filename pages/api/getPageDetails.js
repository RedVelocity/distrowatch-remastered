import axios from 'axios';
import { load } from 'cheerio';

export default async (req, res) => {
  // const { url } = req.query;
  const API_ENDPOINT = `https://distrowatch.com/popos`;

  try {
    const { data } = await axios.get(API_ENDPOINT, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
      },
    });
    const $ = load(data);
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
              .map(function () {
                return $(this).text().trim();
              })
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
    res
      .status(200)
      .json({ header: { title, attributes, logo, description }, summary });
  } catch (error) {
    console.log(`error`, error);
    res.status(422).json({ data: String(error) });
  }
};
