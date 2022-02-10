import React from 'react';
import dayjs from 'dayjs';

type Props = { slug: string; date: Date };

const Footer = ({ slug, date }: Props): React.ReactElement => (
  <footer className="holder flex flex-col justify-between gap-2 text-gray-500 dark:text-gray-300 md:flex-row">
    <span>
      Data Fetched from{' '}
      <a
        href={`https://distrowatch.com/table.php?distribution=${slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        DistroWatch
      </a>
    </span>
    <span>Last Updated at {dayjs(date).format('HH:mm, MMM D YYYY')}</span>
  </footer>
);

export default Footer;
