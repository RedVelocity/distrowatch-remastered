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
  // console.log(`distro`, distro);
  const { logo } = distro;
  // const router = useRouter();
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Head>
        <title>{`Distrowatch | ${distro.header.title}`}</title>
      </Head>
      <div className="grid max-w-screen-xl m-auto lg:grid-cols-2">
        <div className="canister">
          <h1>{distro.header?.title}</h1>
          <div className="flex items-center my-4 justify-evenly md:flex-row">
            <div className="relative w-48 h-48 p-4 m-4 overflow-hidden bg-white border-2 rounded-full">
              <Image {...logo} />
            </div>
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
          <p className="">{distro.header.description}</p>
        </div>
      </div>
    </>
  );
};

export default DistroDetails;
