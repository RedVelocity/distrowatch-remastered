import dayjs from 'dayjs';

const Footer = ({ slug, date }) => (
  <footer className="holder flex flex-col justify-between gap-2 text-gray-500 md:flex-row">
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
