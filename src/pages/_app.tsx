import { useEffect, useState } from 'react';
import { useLocalStorageValue } from '@mantine/hooks';
import { config } from '@fortawesome/fontawesome-svg-core';

import type { AppProps } from 'next/app';
import Header from '../components/Header';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/main.css';
import { LoadingContextProvider } from '../lib/context/loadingContext';
import Loader from '../components/Loader';

export type ColorScheme = 'dark' | 'light';
export type SetColorScheme = (
  val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)
) => void;
// Deisable FA autoAddCss
config.autoAddCss = false;
const App = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
  });
  const [mounted, setMounted] = useState(false);
  // Check for dark theme on initial Mount
  useEffect(() => {
    if (colorScheme === 'dark') {
      document.querySelector('html').classList.add('dark');
      setColorScheme('dark');
    }
    setMounted(true);
  }, []);
  // Return if UI not mounted
  if (!mounted) return null;
  return (
    <LoadingContextProvider>
      <div className="page-container">
        <Loader />
        <Header colorScheme={colorScheme} setColorScheme={setColorScheme} />
        <Component {...pageProps} />
      </div>
    </LoadingContextProvider>
  );
};

export default App;
