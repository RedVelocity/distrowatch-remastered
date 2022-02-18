/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faCircle, faFan } from '@fortawesome/free-solid-svg-icons';
import { ColorScheme, SetColorScheme } from '../pages/_app';

const Header = ({
  colorScheme,
  setColorScheme,
}: {
  colorScheme: ColorScheme;
  setColorScheme: SetColorScheme;
}): React.ReactElement => {
  // Toggle handler
  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
    document.querySelector('html').classList.toggle('dark');
  };
  return (
    <header className="dark-primary holder flex items-center justify-between">
      <Link href="/">
        <a className="overflow-hidden rounded-xl shadow outline-none focus:ring dark:grayscale">
          <div className="relative h-14 w-14">
            <Image
              // className="rounded-xl shadow dark:grayscale"
              src="/logo.png"
              layout="fill"
              priority
            />
          </div>
        </a>
      </Link>
      <button
        type="button"
        className="invert-text relative flex gap-1 rounded-full p-2 text-xl outline-none focus:ring dark:bg-zinc-600"
        onClick={toggleColorScheme}
      >
        <FontAwesomeIcon icon={faFan} />
        <FontAwesomeIcon icon={faMoon} />
        <FontAwesomeIcon
          className={`absolute ${
            colorScheme === 'dark' ? 'translate-x-0' : 'translate-x-6'
          } text-accent transition-transform duration-500 ease-in-out`}
          icon={faCircle}
        />
      </button>
    </header>
  );
};
export default Header;
