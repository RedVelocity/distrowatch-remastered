import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import Head from 'next/head';
// import axios from 'axios';
// import getDistroRankings from '../../../services/getDistroRankings';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    return {
      props: {
        query,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Search: NextPage<{ query: NextParsedUrlQuery }> = ({ query }) => (
  // console.log('query', query);
  <>
    <Head>
      <title>DistroWatch | Search</title>
    </Head>
    <main className="holder">
      {Object.keys(query).map((q) => `${q}:${query[q]}, `)}
    </main>
    <footer className="holder">Last Updated at</footer>
  </>
);
export default Search;
