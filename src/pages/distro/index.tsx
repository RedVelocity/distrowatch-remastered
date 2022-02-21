import React, { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDebouncedValue } from '@mantine/hooks';
import getDistroRankings, { Ranking } from '../../services/getDistroRankings';
import RankingTable from '../../components/layout/rankings/RankingTable';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const rankings = await getDistroRankings();
    const { data } = await axios.get(
      'https://api.unsplash.com/photos/random?query=landscape,nature,earth&orientation=landscape',
      {
        headers: {
          authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
        },
      }
    );
    return {
      props: {
        rankings,
        banner: data.urls.regular,
        // color: data.color,
      },
      revalidate: 60 * 60, // Rebuild every hour
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Distro: NextPage<{
  rankings: Ranking[];
  banner: string;
}> = ({ rankings, banner }) => {
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
            className="holder flex h-[25rem] items-center justify-center overflow-hidden bg-center brightness-90"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          >
            <div className="holder rounded-xl bg-primary/90 backdrop-blur dark:bg-zinc-800/90">
              <div className="text-secondary/90 dark:text-primary/90">
                <h3 className="font-semibold uppercase tracking-widest">
                  DistroWatch Rankings
                </h3>
                <span className="text-zinc-800/90 dark:text-zinc-300/90">
                  Rankings for last 6 months
                </span>
              </div>
              <div className="mt-4">
                <div className="dark-white flex items-center gap-2 rounded-md p-2 shadow outline-none focus-within:ring">
                  <FontAwesomeIcon icon={faSearch} />
                  <input
                    className="dark-white ml-1 w-full outline-none"
                    type="text"
                    name="search"
                    id="search"
                    value={searchValue}
                    autoComplete="off"
                    placeholder="search..."
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <RankingTable filteredRankings={filteredRankings} />
        </div>
      </main>
      <footer className="holder">
        Last Updated at {dayjs(Date.now()).format('HH:mm, MMM D YYYY')}
      </footer>
    </>
  );
};

export default Distro;
