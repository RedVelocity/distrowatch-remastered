/* eslint-disable react/prop-types */
import Image from 'next/image';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import getDistroPaths from '../../services/getDistroPaths';
import getDistroDetails from '../../services/getDistroDetails';

export const getStaticProps = async (context) => {
  const { distro } = context.params;
  const pageData = await getDistroDetails(distro);
  // console.log(`pageData`, pageData);

  if (pageData === 404) return { notFound: true };
  return {
    props: {
      pageData: JSON.stringify(pageData),
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
          <div className="flex flex-col items-center my-4 justify-evenly lg:flex-row">
            <div className="p-8 m-4 border-2 rounded-full bg-white">
              <Image
                width={96}
                height={96}
                src={distro.header.logo}
                alt="logo"
              />
            </div>
            <ul className="p-2 m-2 font-semibold text-center lg:text-left lg:max-w-[50%]">
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
                          : ''
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
