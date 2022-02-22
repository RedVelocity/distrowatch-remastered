import React, { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside, useDebouncedValue } from '@mantine/hooks';
import getDistroRankings, { Ranking } from '../../services/getDistroRankings';
import getDistroList, { Distribution } from '../../services/getDistroList';
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
    const distroList = await getDistroList();
    return {
      props: {
        rankings,
        banner: data.urls.regular,
        distroList,
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
  distroList: Distribution[];
}> = ({ rankings, banner, distroList }) => {
  // console.log('distroList', distroList);
  const [filteredList, setFilteredList] = useState(distroList);
  // const [filteredRankings, setFilteredRankings] = useState(rankings);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 200);
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  useEffect(
    () =>
      debouncedSearch.length > 0
        ? setFilteredList(
            distroList.filter((dist) =>
              dist.slug
                // .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
            )
          )
        : setFilteredList(distroList),
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
            className="holder flex h-[25rem] items-center justify-center bg-center"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          >
            <div className="holder rounded-xl bg-primary/80 backdrop-blur dark:bg-zinc-800/80">
              <div className="text-secondary/90 dark:text-primary/90">
                <h3 className="font-semibold uppercase tracking-widest">
                  DistroWatch Rankings
                </h3>
                <span className="text-zinc-800/90 dark:text-zinc-300/90">
                  Rankings for last 6 months
                </span>
              </div>
              <div className="mt-4">
                <div className="dark-white relative flex items-center gap-2 rounded-md p-2 shadow outline-none focus-within:ring">
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
                    onFocus={() => setOpened(true)}
                  />
                  {opened && filteredList.length > 0 && (
                    <div
                      className="dark-white absolute top-[100%] left-0 z-20 mt-2 max-h-56 min-w-full overflow-y-auto rounded p-4 shadow"
                      ref={ref}
                    >
                      <ul className="divide-y">
                        {filteredList.map((dist) => (
                          <li
                            key={dist.slug}
                            className="p-2 hover:bg-primary dark:hover:bg-zinc-500"
                          >
                            <a className="block" href={`/distro/${dist.slug}`}>
                              {dist.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <RankingTable filteredRankings={rankings} />
        </div>
      </main>
      <footer className="holder">
        Last Updated at {dayjs(Date.now()).format('HH:mm, MMM D YYYY')}
      </footer>
    </>
  );
};

export default Distro;
