import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ColorScheme, SetColorScheme } from '../pages/_app';

const Header = ({
  colorScheme,
  setColorScheme,
}: {
  colorScheme: ColorScheme;
  setColorScheme: SetColorScheme;
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
        setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
        document.querySelector('html').classList.toggle('dark');
      }}
    >
      <FontAwesomeIcon
        icon={colorScheme === 'dark' ? faMoon : faSun}
        className="text-4xl"
      />
    </button>
  </header>
);

export default Header;
