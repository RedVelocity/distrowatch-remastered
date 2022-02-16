import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ColorScheme, SetColorScheme } from '../pages/_app';

const Header = ({
  colorScheme,
  setColorScheme,
}: {
  colorScheme: ColorScheme;
  setColorScheme: SetColorScheme;
}): React.ReactElement => {
  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
    document.querySelector('html').classList.toggle('dark');
  };
  return (
    <header className="dark-primary holder flex items-center justify-between">
      <Image
        className="rounded-xl shadow dark:grayscale"
        src="/logo.png"
        height={48}
        width={48}
        priority
      />
      <button
        type="button"
        className="dark-accent relative flex gap-1 rounded-full p-2 text-xl outline-none ring-blue-300 active:focus:ring-2"
        onClick={toggleColorScheme}
      >
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faMoon} />
        <FontAwesomeIcon
          className={`absolute ${
            colorScheme === 'dark' ? 'translate-x-0' : 'translate-x-6'
          } transition-transform duration-500 ease-in-out`}
          icon={faCircle}
        />
      </button>
    </header>
  );
};
export default Header;
