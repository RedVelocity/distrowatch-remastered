import React, { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDebouncedValue } from '@mantine/hooks';
import getDistroRankings, { Ranking } from '../../services/getDistroRankings';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const rankings = await getDistroRankings();
    const { data } = await axios.get('https://api.unsplash.com/photos/random', {
      headers: {
        authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
      },
    });
    return {
      props: {
        rankings,
        banner: data.urls.regular,
      },
      // revalidate: 604800, // Rebuild every 7days
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Distro: NextPage<{ rankings: Ranking[]; banner: string }> = ({
  rankings,
  banner,
}) => {
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
        <div className="w-full">
          <div
            className="holder flex h-[25rem] items-center justify-center overflow-hidden bg-center pb-6"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="holder rounded-xl backdrop-blur">
              <div className="text-white/90">
                <h2 className="font-semibold tracking-widest">
                  DistroWatch Rankings
                </h2>
                <small className="text-xs">Rankings for last 6 months</small>
              </div>
              <div className="mt-4">
                <div className="dark-light flex items-center gap-2 rounded-md p-2 outline-none focus-within:ring">
                  <FontAwesomeIcon icon={faSearch} />
                  <input
                    className="dark-light ml-1 w-full outline-none"
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
          </div>
          <div className="holder">
            <table className="relative min-w-full">
              <thead className="sticky top-2">
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
                        <a>{ranking.distribution}</a>
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
      </main>
    </>
  );
};

export default Distro;
