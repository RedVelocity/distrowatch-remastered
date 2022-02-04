import Image from 'next/image';

const HeroSection = ({ title, logo, banner, bannerPresent, slug }) => (
  <>
    <section className=" bg-primary h-[18rem] flex items-center justify-center">
      <div className="grid items-center justify-center gap-2 text-center justify-items-center holder md:flex">
        <a
          href={`https://distrowatch.com/table.php?distribution=${slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-40 h-40 mx-4 overflow-hidden bg-white border-2 rounded-full">
            <Image src={logo} layout="fill" objectFit="scale-down" priority />
          </div>
        </a>
        <h1 className="hidden uppercase md:inline">{title}</h1>
      </div>
    </section>
    {bannerPresent && (
      <div className="relative h-full md:h-[18rem] aspect-video holder -my-6 mx-8 md:mx-auto overflow-hidden rounded-md shadow-xl bg-gray-400">
        <Image src={banner} layout="fill" priority />
      </div>
    )}
  </>
);

export default HeroSection;
