// import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { load } from 'cheerio';

const getData = async () => {
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
    return { header: { title, attributes, logo, description }, summary };
  } catch (error) {
    console.log(`error`, error);
    return { data: String(error) };
  }
};

export const getStaticProps = async (_) => ({
  props: {
    pageData: await getData(),
  },
});

const Home = ({ pageData }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-stone-100">
    <div className="container max-w-screen-md">
      <h1>{pageData.header?.title}</h1>
      <div className="flex items-center justify-evenly">
        <div className="m-4">
          <Image
            width={96}
            height={96}
            src={`https://distrowatch.com/${pageData.header?.logo}`}
            alt="logo"
          />
        </div>
        <ul className="max-w-[50%] m-2 font-semibold">
          {pageData.header &&
            Object.entries(pageData.header.attributes).map((key, i) => (
              <li key={i}>
                {key[0]}{' '}
                <span
                  className={`font-normal ${
                    key[1][0] === 'Active' && 'text-green-500'
                  }`}
                >
                  {key[1].join(', ')}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <p className="text-secondary">{pageData.header?.description}</p>
    </div>
  </div>
);

export default Home;
