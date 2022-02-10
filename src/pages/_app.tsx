import type { AppProps } from 'next/app';

import '../styles/main.css';

const App = ({ Component, pageProps }: AppProps) => (
  <div className="dark">
    <div className="overflow-hidden bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </div>
  </div>
);

export default App;
