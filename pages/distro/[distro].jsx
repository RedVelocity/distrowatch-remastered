import Image from 'next/image';
import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
// import { useRouter } from 'next/router';
import getDistroPaths from '../../services/getDistroPaths';
import getDistroDetails from '../../services/getDistroDetails';

export const getStaticProps = async (context) => {
  const { distro } = context.params;
  const pageData = await getDistroDetails(distro);
  // console.log(`pageData`, pageData.header.title);
  if (pageData === 404) return { notFound: true };
  const { base64, img } = await getPlaiceholder(pageData.header?.logo);
  const logo = {
    src: img.src,
    placeholder: 'blur',
    blurDataURL: base64,
    layout: 'fill',
    objectFit: 'scale-down',
  };
  return {
    props: {
      pageData: JSON.stringify({
        ...pageData,
        logo,
      }),
    },
    revalidate: 604800, // Rebuild every 7days
  };
};

export const getStaticPaths = async () => {
  const paths = await getDistroPaths();
  return {
    paths,
    fallback: 'blocking',
  };
};

const DistroDetails = ({ pageData }) => {
  const distro = JSON.parse(pageData);
  const { logo } = distro;
  const banner = distro.header.banner !== 'false';
  // const router = useRouter();
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Head>
        <title>{`Distrowatch | ${distro.header.title}`}</title>
      </Head>
      <div className="page-container">
        <section className=" bg-primary h-[18rem] flex items-center justify-center">
          <div className="grid items-center justify-center gap-2 text-center justify-items-center holder md:flex">
            <div className="relative w-40 h-40 mx-4 overflow-hidden bg-white border-2 rounded-full">
              <Image {...logo} />
            </div>
            <h1>{distro.header?.title}</h1>
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
        {banner && (
          <section className="relative h-full md:h-[18rem] aspect-video holder -my-6 mx-8 md:mx-auto overflow-hidden rounded-2xl shadow-xl bg-gray-400">
            <Image src={distro.header.banner} layout="fill" priority />
          </section>
        )}
        <section className={`bg-accent ${banner && 'mt-16'}`}>
          <div className="holder">
            <div className="card">
              <h5>Rating</h5>
              <span
                className={`text-4xl ${
                  distro.rating > 8 ? 'text-accent' : 'text-red-400'
                }`}
              >
                {distro.rating}
              </span>
              <span className="text-gray-400"> / 10</span>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center bg-secondary texture">
          <p className="text-gray-200/90 holder">{distro.header.description}</p>
        </section>
      </div>
    </>
  );
};

export default DistroDetails;
