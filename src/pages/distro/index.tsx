import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
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

const Distro: NextPage<{ rankings: Ranking[] }> = ({ rankings }) => (
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
            name=""
            id=""
            placeholder="search..."
          />
        </div>
      </div>
    </div>
    <div>
      <div className="inline-block min-w-full overflow-x-auto ">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="dark-light px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Rank
              </th>
              <th className="dark-light py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Distribution
              </th>
              <th className="dark-light py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Hits Per Day (HPD)
              </th>
              {/* <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  QRT
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Status
                </th> */}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-zinc-500">
            {rankings.map((ranking) => (
              <tr key={ranking.distribution}>
                <td className="dark-white text-sm">
                  {/* <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-full w-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt="logo"
                          />
                        </div> */}
                  <div className="ml-3">
                    <p className="whitespace-no-wrap ">{ranking.no}</p>
                  </div>
                  {/* </div> */}
                </td>
                <td className="dark-white text-sm">
                  <Link
                    href={`/distro/${ranking.distrowatch_distribution_detail_url.replace(
                      'https://distrowatch.com/',
                      ''
                    )}`}
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="whitespace-no-wrap">{ranking.distribution}</a>
                  </Link>
                </td>
                <td className="dark-white text-sm">
                  <p className="whitespace-no-wrap ">{ranking.hpd.count}</p>
                </td>
                {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap ">43</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                    />
                    <span className="relative">Activo</span>
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Distro;
