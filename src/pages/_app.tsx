import { useState } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/Header';

import '../styles/main.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode && 'dark'}>
      <div className="dark-bg-main overflow-hidden">
        <div className="page-container">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default App;
