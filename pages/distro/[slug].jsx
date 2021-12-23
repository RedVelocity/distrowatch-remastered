/* eslint-disable react/prop-types */
import Image from 'next/image';
import { useRouter } from 'next/router';
import getDistroList from '../../server/getDistroList';
import getPageDetails from '../../server/getPageDetails';

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  return {
    props: {
      pageData: await getPageDetails(slug),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getDistroList();
  return {
    paths,
    fallback: true,
  };
};

const DistroDetails = ({ pageData }) => {
  const router = useRouter();
  getDistroList();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container max-w-screen-md">
      <h1>{pageData.header?.title}</h1>
      <div className="flex items-center justify-evenly">
        <div className="m-4">
          <Image
            width={96}
            height={96}
            src={`https://distrowatch.com/${pageData.header?.logo}`}
            alt="logo"
          />
        </div>
        <ul className="max-w-[50%] m-2 font-semibold">
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
  );
};

export default DistroDetails;
