import '../styles/main.css';

const App = ({ Component, pageProps }) => (
  <div className="page-container">
    <Component {...pageProps} />
  </div>
);

export default App;
