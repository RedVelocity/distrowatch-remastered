import '../styles/main.css';

const MyApp = ({ Component, pageProps }) => (
  <div className="page-container">
    <Component {...pageProps} />
  </div>
);

export default MyApp;
