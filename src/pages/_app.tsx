import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/main.css';
import Header from '../components/Header';

const App = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Set theme on initial Mount
  useEffect(() => {
    if (
      ('theme' in localStorage && localStorage.theme === 'dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.querySelector('html').classList.add('dark');
      setDarkMode(true);
    } 
    setMounted(true);
  }, []);
  // Return if UI not mounted
  if (!mounted) return null;
  return (
    <div className="page-container min-h-full">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
