import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

const Header = ({
  setDarkMode,
  darkMode,
}: {
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
}): React.ReactElement => (
  <header className="dark-primary flex items-center justify-between px-8 pt-4">
    <Image
      className="rounded-xl shadow dark:grayscale"
      src="/logo.png"
      height={48}
      width={48}
    />
    <button type="button" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? (
        <i className="fas fa-moon text-4xl" />
      ) : (
        <i className="fas fa-sun text-4xl text-yellow-500" />
      )}
    </button>
  </header>
);

export default Header;
