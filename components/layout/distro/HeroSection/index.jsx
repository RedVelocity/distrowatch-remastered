import Image from 'next/image';

const HeroSection = ({ title, logo, banner, bannerPresent, slug }) => (
  <>
    <section className=" holder flex h-[18rem] items-center justify-center bg-primary">
      <div className="grid items-center justify-center justify-items-center gap-2 text-center md:flex">
        <a
          href={`https://distrowatch.com/table.php?distribution=${slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative mx-4 h-40 w-40 overflow-hidden rounded-full border-2 bg-white">
            <Image src={logo} layout="fill" objectFit="scale-down" priority />
          </div>
        </a>
        <h1 className="hidden uppercase md:inline">{title}</h1>
      </div>
    </section>
    {bannerPresent && (
      <div className="holder relative -my-6 mx-8 aspect-video h-full overflow-hidden rounded-md bg-gray-400 shadow-xl md:mx-auto md:h-[18rem]">
        <Image src={banner} layout="fill" priority />
      </div>
    )}
  </>
);

export default HeroSection;
