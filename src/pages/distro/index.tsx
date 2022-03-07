import React, { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import axios from 'axios';
import dayjs from 'dayjs';
import getDistroRankings, { Ranking } from '../../services/getDistroRankings';
import getDistroList, { Distribution } from '../../services/getDistroList';
import RankingTable from '../../components/layout/rankings/RankingTable';
import SearchCard from '../../components/SearchCard';
import Loader from '../../components/Loader';

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

type PageProps = {
  rankings: Ranking[];
  // banner: string;
  distroList: Distribution[];
};

const Distro: NextPage<PageProps> = ({ rankings, distroList }) => {
  const [loading, setLoading] = useState(false);
  const handleSelect = (e) => {
    setLoading(true);
    router.push(`/distro/${e.slug}`);
  };
  return (
    <>
      <Head>
        <title>DistroWatch | Rankings</title>
      </Head>
      <main>
        <Loader isLoading={loading} setIsLoading={() => null} />
        <div className="w-full">
          <div className="holder bg-gradient relative flex h-[25rem] items-center justify-center bg-center">
            <div className="absolute inset-0 bg-zinc-900/10" />
            <div className="holder rounded-xl bg-zinc-100/20 backdrop-blur">
              <div className="text-primary">
                <h3 className="font-semibold uppercase tracking-widest">
                  DistroWatch Rankings
                </h3>
                <span className="text-zinc-100">
                  Rankings for last 6 months
                </span>
              </div>
              <SearchCard onSelect={handleSelect} list={distroList} />
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
