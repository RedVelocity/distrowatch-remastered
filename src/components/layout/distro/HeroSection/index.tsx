import React, { useLayoutEffect, useRef } from 'react';
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
  // Refs for animation
  const logoRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  // Mount animations
  useLayoutEffect(() => {
    gsap.from(logoRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    });
    gsap.from(
      bannerRef.current,
      // { scale: 0, y: 500, opacity: 0 },
      {
        scale: 0.5,
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  }, []);

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
              className="relative h-40 w-40 rounded-full bg-white p-2 shadow dark:bg-zinc-300"
              ref={logoRef}
              onMouseEnter={() =>
                gsap.to(logoRef.current, {
                  scale: 1.1,
                  ease: 'power2.inOut',
                  duration: 0.5,
                })
              }
              onMouseLeave={() =>
                gsap.to(logoRef.current, {
                  scale: 1,
                  ease: 'power2.inOut',
                  duration: 0.5,
                })
              }
            >
              <Image src={logo} layout="fill" objectFit="scale-down" priority />
            </div>
          </a>
          <h1 className="hidden uppercase md:inline">{title}</h1>
        </div>
      </section>
      {bannerPresent && (
        <div
          className="holder relative z-10 -my-6 mx-8 aspect-video h-full overflow-hidden rounded-md bg-zinc-400 shadow-xl md:mx-auto md:h-[18rem]"
          ref={bannerRef}
        >
          <Image src={banner} layout="fill" priority />
        </div>
      )}
    </>
  );
};

export default HeroSection;
