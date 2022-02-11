import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header = ({
  setDarkMode,
  darkMode,
}: {
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
}): React.ReactElement => (
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
      onClick={() => {
        setDarkMode(!darkMode);
        localStorage.theme = !darkMode ? 'dark' : 'light';
      }}
    >
      <FontAwesomeIcon
        icon={darkMode ? faMoon : faSun}
        className="text-4xl text-accent dark:text-current"
      />
    </button>
  </header>
);

export default Header;
