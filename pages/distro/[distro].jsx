import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
// import { useRouter } from 'next/router';
import getDistroPaths from '../../services/getDistroPaths';
import getDistroDetails from '../../services/getDistroDetails';
import AttributesSection from '../../components/AttributesSection';
import HeroSection from '../../components/HeroSection';

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
  const { logo, header, rating } = distro;
  const bannerPresent = header.banner !== 'false';
  // const router = useRouter();
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Head>
        <title>{`Distrowatch | ${header.title}`}</title>
      </Head>
      <div className="page-container">
        <HeroSection
          title={header.title}
          logo={logo}
          banner={header.banner}
          bannerPresent={bannerPresent}
        />
        <AttributesSection
          marginRequired={bannerPresent}
          rating={rating}
          attributes={header.attributes}
        />
        <section className="flex items-center justify-center bg-secondary texture">
          <p className="text-gray-200/90 holder">{header.description}</p>
        </section>
      </div>
    </>
  );
};

export default DistroDetails;
