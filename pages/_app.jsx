// import Layout from '../components/Layout';
import '../styles/main.css';

const MyApp = ({ Component, pageProps }) => (
  // <Layout>
  <div className="page-container">
    <Component {...pageProps} />
  </div>
  // </Layout>
);

export default MyApp;
