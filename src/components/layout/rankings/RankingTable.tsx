import React from 'react';
import Link from 'next/link';
import { Ranking } from '../../../services/getDistroRankings';

const RankingTable = ({
  filteredRankings,
}: {
  filteredRankings: Ranking[];
}): React.ReactElement => (
  <div className="holder dark-white">
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
);

export default RankingTable;
