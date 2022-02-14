import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

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
}: Props): React.ReactElement => {
  const logoRef = useRef(null);
  useEffect(() => {
    gsap.from(logoRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  }, [logo]);

  return (
    <>
      <section className="holder dark-primary flex h-[14rem] items-center justify-center md:h-[18rem]">
        <div className="-mt-20 grid items-center justify-center justify-items-center gap-4 text-center md:flex">
          <a
            href={`https://distrowatch.com/table.php?distribution=${slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="relative h-40 w-40 rounded-full border-2 bg-zinc-100 p-2 dark:border-none dark:bg-zinc-300"
              ref={logoRef}
            >
              <Image src={logo} layout="fill" objectFit="scale-down" priority />
            </div>
          </a>
          <h1 className="hidden uppercase md:inline">{title}</h1>
        </div>
      </section>
      {bannerPresent && (
        <div className="holder relative -my-6 mx-8 aspect-video h-full overflow-hidden rounded-md bg-zinc-400 shadow-xl md:mx-auto md:h-[18rem]">
          <Image src={banner} layout="fill" priority />
        </div>
      )}
    </>
  );
};

export default HeroSection;
