import { useLayoutEffect, useState } from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import type { AppProps } from 'next/app';

import '../styles/main.css';
import Header from '../components/Header';

// library.add(faExternalLink);

const App = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false);
  useLayoutEffect(() => {
    if ('theme' in localStorage) {
      setDarkMode(localStorage.theme === 'dark');
    }
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="dark-bg-main min-h-screen overflow-hidden">
        <div className="page-container min-h-full">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default App;
