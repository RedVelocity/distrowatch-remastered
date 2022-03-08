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
    <div className="dark-white">
      <table className="min-w-full text-center text-sm">
        <thead>
          <tr className="dark-primary font-semibold capitalize tracking-wider">
            <th className="p-4">Rank</th>
            <th className="p-4">Distribution</th>
            <th className="p-4">Hits Per Day (HPD)</th>
          </tr>
        </thead>
        <motion.tbody className="">
          {filteredRankings
            // Filter based on current page and page size
            .slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
            .map((ranking) => (
              <motion.tr
                key={ranking.no}
                data-table
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="odd:bg-gradient-to-r odd:from-accent/10 odd:to-primary/10"
              >
                <td className="p-4">{ranking.no}</td>
                <td className="p-4">
                  <Link
                    href={`/distro/${ranking.distrowatch_distribution_detail_url.replace(
                      'https://distrowatch.com/',
                      ''
                    )}`}
                  >
                    <a>{ranking.distribution}</a>
                  </Link>
                </td>
                <td className="p-4">{ranking.hpd.count}</td>
              </motion.tr>
            ))}
        </motion.tbody>
      </table>
      <div className="dark-primary flex items-center justify-center py-4 text-blue-600 dark:text-blue-300">
        <div className="divide-x drop-shadow dark:divide-zinc-500" role="group">
          {[...Array(pageCount)].map((_, i) => (
            <button
              className="dark-white relative px-3 py-1 outline-none transition-colors ease-in-out first:rounded-l last:rounded-r hover:bg-accent/40 focus:bg-zinc-200 dark:hover:bg-zinc-500 dark:focus:bg-zinc-500 md:px-4 md:py-2"
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
                  className="z-10 text-accent outline"
                  initial={false}
                  layoutId="pager"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingTable;
