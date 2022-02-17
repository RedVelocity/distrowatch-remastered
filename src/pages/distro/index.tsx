import React, { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useDebouncedValue } from '@mantine/hooks';
import getDistroRankings, { Ranking } from '../../services/getDistroRankings';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const rankings = await getDistroRankings();
    return {
      props: {
        rankings,
      },
      // revalidate: 604800, // Rebuild every 7days
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Distro: NextPage<{ rankings: Ranking[] }> = ({ rankings }) => {
  const [filteredRankings, setFilteredRankings] = useState(rankings);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);

  useEffect(
    () =>
      debouncedSearch.length > 0
        ? setFilteredRankings(
            rankings.filter((ranking) =>
              ranking.distribution
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
            )
          )
        : setFilteredRankings(rankings),
    [debouncedSearch]
  );
  return (
    <>
      <Head>
        <title>DistroWatch | Rankings</title>
      </Head>
      <main>
        <div className="dark-white holder w-full">
          <div className="flex flex-col justify-between gap-4 pb-6 md:flex-row">
            <div>
              <h2 className="font-semibold">DistroWatch Rankings</h2>
              <small className="text-xs">Rankings for last 6 months</small>
            </div>
            <div className="flex items-center justify-between">
              <div className="dark-light flex items-center rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="dark-light ml-1 block outline-none "
                  type="text"
                  name="search"
                  id="search"
                  value={searchValue}
                  placeholder="search..."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="inline-block min-w-full overflow-x-auto ">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="dark-light text-left text-xs font-semibold uppercase tracking-wider">
                    <th className="p-4">Rank</th>
                    <th className="p-4">Distribution</th>
                    <th className="p-4">Hits Per Day (HPD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-zinc-500">
                  {filteredRankings.map((ranking) => (
                    <tr key={ranking.distribution}>
                      <td className="px-4 text-sm">
                        {/* <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-full w-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt="logo"
                          />
                        </div> */}
                        <p className="whitespace-no-wrap ">{ranking.no}</p>
                        {/* </div> */}
                      </td>
                      <td className="px-4 text-sm">
                        <Link
                          href={`/distro/${ranking.distrowatch_distribution_detail_url.replace(
                            'https://distrowatch.com/',
                            ''
                          )}`}
                        >
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a className="whitespace-no-wrap">
                            {ranking.distribution}
                          </a>
                        </Link>
                      </td>
                      <td className="px-4 text-sm">
                        <p>{ranking.hpd.count}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Distro;
