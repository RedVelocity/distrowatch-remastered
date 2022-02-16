import { useEffect, useState } from 'react';
import { useLocalStorageValue } from '@mantine/hooks';
import type { AppProps } from 'next/app';

import '../styles/main.css';
import Header from '../components/Header';

export type ColorScheme = 'dark' | 'light';
export type SetColorScheme = (
  val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)
) => void;

const App = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
  });
  // const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Check for dark theme on initial Mount
  useEffect(() => {
    if (
      colorScheme === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.querySelector('html').classList.add('dark');
      setColorScheme('dark');
    }
    setMounted(true);
  }, []);
  // Return if UI not mounted
  if (!mounted) return null;
  return (
    <div className="page-container min-h-full">
      <Header colorScheme={colorScheme} setColorScheme={setColorScheme} />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
