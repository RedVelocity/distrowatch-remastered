import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
