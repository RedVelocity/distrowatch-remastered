/* eslint-disable react/prop-types */
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getDistroPaths from '../../services/getDistroPaths';
import getDistroDetails from '../../services/getDistroDetails';

export const getStaticProps = async (context) => {
  const { distro } = context.params;
  const pageData = await getDistroDetails(distro);

  if (pageData === 404) return { notFound: true };
  return {
    props: {
      pageData,
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
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  // console.log(`pageData`, pageData);

  return (
    <>
      <Head>
        <title>{`Distrowatch | ${pageData.header.title}`}</title>
      </Head>
      <div className="grid max-w-screen-xl p-4 m-auto lg:grid-cols-2">
        <div className="canister">
          <h1>{pageData.header?.title}</h1>
          <div className="flex flex-col items-center my-4 justify-evenly lg:flex-row">
            <div className="p-8 m-4 bg-white border-2 rounded-full">
              <Image
                width={96}
                height={96}
                src={pageData.header.logo}
                alt="logo"
              />
            </div>
            <ul className="p-2 m-2 font-semibold text-center lg:text-left lg:max-w-[50%]">
              {
                // attribute[0]=column heading, attribute[1]=[column values]
                pageData.header.attributes.map((attribute, i) => (
                  <li key={i} className="capitalize">
                    {`${attribute[0]}: `}
                    <span
                      className={`${
                        attribute[1].trim() === 'Active'
                          ? 'text-green-500 font-semibold'
                          : 'font-normal text-stone-500'
                      }`}
                    >
                      {attribute[1]}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
          <p className="text-secondary">{pageData.header?.description}</p>
        </div>
      </div>
    </>
  );
};

export default DistroDetails;
