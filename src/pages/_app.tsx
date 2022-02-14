import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/main.css';
import Header from '../components/Header';

const App = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if ('theme' in localStorage) {
      setDarkMode(localStorage.theme === 'dark');
    }
  }, []);

  useEffect(() => {
    darkMode
      ? document.querySelector('html').classList.add('dark')
      : document.querySelector('html').classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="page-container min-h-full">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
