import type { AppProps } from 'next/app';

import '../styles/main.css';

const App = ({ Component, pageProps }: AppProps) => (
  <div className="page-container">
    <Component {...pageProps} />
  </div>
);

export default App;
