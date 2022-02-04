import Head from 'next/head';
import dayjs from 'dayjs';
// import { getPlaiceholder } from 'plaiceholder';
// import { useRouter } from 'next/router';
import getDistroPaths from '../../services/getDistroPaths';
import getDistroDetails from '../../services/getDistroDetails';
import AttributesSection from '../../components/layout/distro/AttributesSection';
import HeroSection from '../../components/layout/distro/HeroSection';
import DetailsSection from '../../components/layout/distro/DetailsSection';
import CombinedCard from '../../components/CombinedCard';

export const getStaticProps = async (context) => {
  const { distro } = context.params;
  const pageData = await getDistroDetails(distro);
  // console.log(`pageData`, pageData);
  if (pageData === 404) return { notFound: true };
  // const { base64, img } = await getPlaiceholder(pageData.header.logo);
  // const logo = {
  //   src: img.src,
  //   placeholder: 'blur',
  //   blurDataURL: base64,
  //   layout: 'fill',
  //   objectFit: 'scale-down',
  // };
  return {
    props: {
      pageData: JSON.stringify(pageData),
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
  // console.log('distro', distro);
  const { header, rating, slug } = distro;
  const bannerPresent = header.banner !== 'false';
  // const router = useRouter();
  // if (router.isFallback) {
  //   return (
  //     <div className="flex items-center justify-center w-screen min-h-screen space-x-2">
  //       <div
  //         className="inline-block w-12 h-12 bg-current rounded-full opacity-0 spinner-grow"
  //         role="status"
  //       >
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Head>
        <title>{`DistroWatch | ${header.title}`}</title>
      </Head>
      <div className="page-container">
        <HeroSection
          title={header.title}
          logo={header.logo}
          banner={header.banner}
          bannerPresent={bannerPresent}
          slug={slug}
        />
        <AttributesSection
          marginRequired={bannerPresent}
          rating={rating}
          attributes={header.attributes}
        />
        <section className="flex items-center justify-center bg-secondary texture">
          <p className="text-gray-200/90 holder">{header.description}</p>
        </section>
        <section className="flex items-center justify-center bg-primary">
          <div className="w-full holder md:w-auto">
            <CombinedCard
              cardItems={[
                { title: 'Architecture', text: header.attributes.architecture },
                { title: 'Desktop', text: header.attributes.desktop },
                { title: 'Category', text: header.attributes.category },
              ]}
            />
          </div>
        </section>
        <DetailsSection details={distro.details} />
        <section className="flex flex-col justify-between gap-2 text-gray-500 md:flex-row holder">
          <span>
            Data Fetched from{' '}
            <a
              href={`https://distrowatch.com/table.php?distribution=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              DistroWatch
            </a>
          </span>
          <span>
            Last Updated at{' '}
            {dayjs(distro.updatedAt).format('HH:mm, MMM D YYYY')}
          </span>
        </section>
      </div>
    </>
  );
};

export default DistroDetails;
