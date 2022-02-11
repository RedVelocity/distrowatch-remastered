import React from 'react';
import Image from 'next/image';

type Props = {
  title: string;
  logo: string;
  banner?: string;
  bannerPresent: boolean;
  slug: string;
};

const HeroSection = ({
  title,
  logo,
  banner,
  bannerPresent,
  slug,
}: Props): React.ReactElement => (
  <>
    <section className="holder dark-primary flex h-[18rem] items-center justify-center">
      <div className="-mt-20 grid items-center justify-center justify-items-center gap-2 text-center md:flex">
        <a
          href={`https://distrowatch.com/table.php?distribution=${slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="mx-4 rounded-full border-2 bg-white p-2 dark:border-none dark:bg-gray-300">
            <div className="relative h-40 w-40">
              <Image src={logo} layout="fill" objectFit="scale-down" priority />
            </div>
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
