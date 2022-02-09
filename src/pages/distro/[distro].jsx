import Head from 'next/head';
// import { getPlaiceholder } from 'plaiceholder';
// import { useRouter } from 'next/router';
import getDistroPaths from '../../services/getDistroPaths.ts';
import getDistroDetails from '../../services/getDistroDetails.ts';
import {
  AttributesSection,
  DetailsSection,
  HeroSection,
} from '../../components/layout/distro/index.tsx';
import CombinedCard from '../../components/CombinedCard';
import Footer from '../../components/Footer';

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
  const { header, rating, slug, updatedAt, details } = distro;
  const { title, logo, banner, description, attributes } = header;
  const bannerPresent = banner !== 'false';
  // const router = useRouter();
  // if (router.isFallback) {}

  return (
    <>
      <Head>
        <title>{`DistroWatch | ${title}`}</title>
      </Head>
      <main>
        <HeroSection
          title={title}
          logo={logo}
          banner={banner}
          bannerPresent={bannerPresent}
          slug={slug}
        />
        <AttributesSection
          marginRequired={bannerPresent}
          rating={rating}
          attributes={attributes}
        />
        <section className="texture holder flex items-center justify-center bg-secondary">
          <p className="text-gray-200/90">{description}</p>
        </section>
        <section className="holder flex items-center justify-center bg-primary">
          <CombinedCard
            cardItems={[
              { title: 'Architecture', text: attributes.architecture },
              { title: 'Desktop', text: attributes.desktop },
              { title: 'Category', text: attributes.category },
            ]}
          />
        </section>
        <DetailsSection details={details} />
      </main>
      <Footer slug={slug} date={updatedAt} />
    </>
  );
};

export default DistroDetails;
