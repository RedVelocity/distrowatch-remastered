import Image from 'next/image';

const Header = () => (
  <header className="bg-primary p-4">
    <div className="max-w-screen-xl flex items-center pl-4">
      <Image className="rounded-xl" src="/logo.png" height={72} width={72} />
    </div>
  </header>
);

export default Header;
