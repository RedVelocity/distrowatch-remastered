import React, { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';

type PagerProps = {
  pageCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
const Pager = ({
  pageCount,
  currentPage,
  setCurrentPage,
}: PagerProps): React.ReactElement => (
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
              Number.parseInt(e.currentTarget.attributes['data-page-num'].value)
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
);

export default Pager;
