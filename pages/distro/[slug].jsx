/* eslint-disable react/prop-types */
import Image from 'next/image';
import { useRouter } from 'next/router';
import getDistroList from '../../server/getDistroList';
import getPageDetails from '../../server/getPageDetails';

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const pageData = await getPageDetails(slug);
  if (pageData === 404) return { notFound: true };
  return {
    props: {
      pageData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getDistroList();
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

  return (
    <div className="grid lg:grid-cols-2">
      <div className="min-h-screen canister m-4 lg:m-0">
        <h1>{pageData.header?.title}</h1>
        <div className="flex items-center flex-col my-4 justify-evenly lg:flex-row">
          <div className="p-6 m-4 rounded shadow bg-primary">
            <Image
              width={96}
              height={96}
              src={`https://distrowatch.com/${pageData.header?.logo}`}
              alt="logo"
            />
          </div>
          <ul className="max-w-[50%] m-2 font-semibold text-center lg:text-left">
            {pageData.header &&
              Object.entries(pageData.header.attributes).map((key, i) => (
                <li key={i}>
                  {key[0]}{' '}
                  <span
                    className={`font-normal ${
                      key[1][0] === 'Active' && 'text-green-500'
                    }`}
                  >
                    {key[1].join(', ')}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <p className="text-secondary">{pageData.header?.description}</p>
      </div>
    </div>
  );
};

export default DistroDetails;
