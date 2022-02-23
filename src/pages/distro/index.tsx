import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import dayjs from 'dayjs';
import getDistroRankings, { Ranking } from '../../services/getDistroRankings';
import getDistroList, { Distribution } from '../../services/getDistroList';
import RankingTable from '../../components/layout/rankings/RankingTable';
import SearchCard from '../../components/SearchCard';

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
}> = ({ rankings, banner, distroList }) => (
  <>
    <Head>
      <title>DistroWatch | Rankings</title>
    </Head>
    <main>
      <div className="w-full">
        <div
          className="holder relative flex h-[25rem] items-center justify-center bg-center"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <div className="absolute inset-0 bg-zinc-900/40" />
          <div className="holder rounded-xl bg-zinc-900/20 shadow-xl shadow-primary/30 backdrop-blur">
            <div className=" text-zinc-50/90">
              <h3 className="font-semibold uppercase tracking-widest">
                DistroWatch Rankings
              </h3>
              <span className=" text-zinc-300/90">
                Rankings for last 6 months
              </span>
            </div>
            <SearchCard list={distroList} />
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

export default Distro;
