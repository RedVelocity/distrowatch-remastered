import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
