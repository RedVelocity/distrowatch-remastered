import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ranking } from '../../../services/getDistroRankings';

type PageProps = {
  filteredRankings: Ranking[];
};
const PAGE_SIZE = 10;
const RankingTable = ({ filteredRankings }: PageProps): React.ReactElement => {
  const pageCount = Math.ceil(filteredRankings.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="holder dark-white">
      <table className="min-w-full">
        <thead>
          <tr className="dark-primary text-left text-xs font-semibold uppercase tracking-wider">
            <th className="p-4">Rank</th>
            <th className="p-4">Distribution</th>
            <th className="p-4">Hits Per Day (HPD)</th>
          </tr>
        </thead>
        <motion.tbody className="divide-y overflow-hidden dark:divide-zinc-500">
          {filteredRankings
            // Filter based on current page and page size
            .slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
            .map((ranking) => (
              <motion.tr
                key={ranking.no}
                data-table
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
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
                    <a>{ranking.distribution}</a>
                  </Link>
                </td>
                <td className="px-4 text-sm">
                  <p>{ranking.hpd.count}</p>
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
      </table>
      <div className="dark-primary mt-1 flex items-center justify-center gap-4 py-2 px-4 text-blue-600 dark:text-blue-300 md:gap-8">
        {[...Array(pageCount)].map((_, i) => (
          <button
            className="dark-white relative rounded px-2 shadow-sm transition-colors ease-in-out hover:bg-accent/60 dark:hover:bg-zinc-500 md:px-4 md:py-2"
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
            {currentPage === i && (
              <motion.div
                className="text-accent outline"
                initial={false}
                layoutId="pager"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RankingTable;
