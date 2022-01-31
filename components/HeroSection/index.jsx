import Image from 'next/image';

const HeroSection = ({ title, logo, banner, bannerPresent }) => (
  <>
    <section className=" bg-primary h-[18rem] flex items-center justify-center">
      <div className="grid items-center justify-center gap-2 text-center justify-items-center holder md:flex">
        <div className="relative w-40 h-40 mx-4 overflow-hidden bg-white border-2 rounded-full">
          <Image {...logo} />
        </div>
        <h1 className="uppercase invisible md:visible">{title}</h1>
        {/* <div className="flex items-center my-4 justify-evenly md:flex-row">
            <ul className="p-2 m-2 font-semibold text-center md:text-left md:w-1/2">
              {
                // attribute[0]=column heading, attribute[1]=[column values]
                distro.header.attributes.map((attribute, i) => (
                  <li key={i} className="capitalize">
                    {`${attribute[0]}: `}
                    <span
                      className={`${
                        attribute[0].trim() === 'Status'
                          ? attribute[1].trim().includes('defined')
                            ? 'pill-danger'
                            : 'pill-success'
                          : 'font-normal'
                      }`}
                    >
                      {attribute[1]}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
          <p className="">{distro.header.description}</p> */}
      </div>
    </section>
    {bannerPresent && (
      <section className="relative h-full md:h-[18rem] aspect-video holder -my-6 mx-8 md:mx-auto overflow-hidden rounded-md shadow-xl bg-gray-400">
        <Image src={banner} layout="fill" priority />
      </section>
    )}
  </>
);

export default HeroSection;
