import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <section className="holder dark-primary flex h-[14rem] items-center justify-center md:h-[18rem]">
      <div className="-mt-20 grid items-center justify-center justify-items-center gap-4 text-center md:flex">
        <a
          href={`https://distrowatch.com/table.php?distribution=${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full outline-none focus:ring"
        >
          <motion.div
            className="relative h-40 w-40 rounded-full bg-white p-2 shadow dark:bg-zinc-300"
            whileHover={{
              scale: 1.1,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={logo} layout="fill" objectFit="scale-down" priority />
          </motion.div>
        </a>
        <h1 className="hidden uppercase md:inline">{title}</h1>
      </div>
    </section>
    {bannerPresent && (
      <motion.div
        className="holder relative z-10 -my-6 mx-8 aspect-video h-full overflow-hidden rounded-md bg-zinc-400 shadow-xl md:mx-auto md:h-[18rem]"
        initial={{
          scale: 0.5,
          y: 100,
          opacity: 0,
        }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          ease: 'easeInOut',
          duration: 0.8,
        }}
      >
        <Image src={banner} layout="fill" priority />
      </motion.div>
    )}
  </>
);

export default HeroSection;
