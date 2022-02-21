import React, { useState } from 'react';
import Link from 'next/link';
import { Ranking } from '../../../services/getDistroRankings';

const PAGE_SIZE = 10;
const RankingTable = ({
  filteredRankings,
}: {
  filteredRankings: Ranking[];
}): React.ReactElement => {
  const pageCount: number = Math.ceil(filteredRankings.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(0);
  // console.log('filteredRankings', filteredRankings, pageCount);
  return (
    <div className="holder dark-white">
      <table className="relative min-w-full">
        <thead className="sticky top-2">
          <tr className="dark-primary text-left text-xs font-semibold uppercase tracking-wider">
            <th className="p-4">Rank</th>
            <th className="p-4">Distribution</th>
            <th className="p-4">Hits Per Day (HPD)</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-zinc-500">
          {filteredRankings
            // Filter based on current page and page size
            .slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
            .map((ranking) => (
              <tr key={ranking.distribution}>
                <td className="px-4 text-sm">
                  <p className="whitespace-no-wrap ">{ranking.no}</p>
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
      <div className="dark-primary mt-1 flex items-center justify-center gap-8 py-2 text-blue-600 dark:text-blue-300">
        {[...Array(pageCount)].map((_, i) => (
          <button
            // className="px-8 py-2"
            type="button"
            key={`${i}-pageNum`}
            data-page-num={i}
            onClick={(e) =>
              setCurrentPage(
                Number.parseInt(
                  e.currentTarget.attributes['data-page-num'].value
                )
              )
            }
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RankingTable;
