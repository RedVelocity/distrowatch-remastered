import React, { useState } from 'react';
import Link from 'next/link';
// import gsap from 'gsap';
import { Ranking } from '../../../services/getDistroRankings';

const PAGE_SIZE = 10;
const RankingTable = ({
  filteredRankings,
}: {
  filteredRankings: Ranking[];
}): React.ReactElement => {
  const pageCount = Math.ceil(filteredRankings.length / PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(0);
  // const tableRef = useRef(null);
  // const q = gsap.utils.selector(tableRef);

  // useEffect(() => {
  //   gsap.to(q('tr[data-table]'), { opacity: 0, x: -100, display: 'none' });
  // }, [filteredRankings]);

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
        <tbody className="divide-y dark:divide-zinc-500">
          {filteredRankings
            // Filter based on current page and page size
            .slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
            .map((ranking) => (
              <tr key={ranking.distribution} data-table>
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
              </tr>
            ))}
        </tbody>
      </table>
      <div className="dark-primary mt-1 flex items-center justify-center gap-4 py-2 px-4 text-blue-600 dark:text-blue-300 md:gap-8">
        {[...Array(pageCount)].map((_, i) => (
          <button
            className={`${
              currentPage === i && 'ring-2 ring-accent'
            } rounded px-1 transition-colors ease-in-out hover:bg-accent/60 dark:hover:bg-zinc-600 md:px-4 md:py-2`}
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