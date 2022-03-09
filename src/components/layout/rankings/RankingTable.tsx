import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ranking } from '../../../services/getDistroRankings';
import Pager from '../../Pager';

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
            <th className="p-4">
              <h5>Rank</h5>
            </th>
            <th className="p-4">
              <h5>Distribution</h5>
            </th>
            <th className="p-4">
              <h5>Hits Per Day (HPD)</h5>
            </th>
          </tr>
        </thead>
        <motion.tbody className="">
          {filteredRankings
            // Filter based on current page and page size
            .slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
            .map((ranking) => (
              <motion.tr
                key={`rtr-${ranking.no}`}
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
      <Pager
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default RankingTable;