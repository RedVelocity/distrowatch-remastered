import Head from "next/head";
// import { getPlaiceholder } from 'plaiceholder';
// import { useRouter } from 'next/router';
import getDistroPaths from "../../services/getDistroPaths";
import getDistroDetails from "../../services/getDistroDetails";
import {
  AttributesSection,
  DetailsSection,
  HeroSection,
} from "../../components/layout/distro";
import CombinedCard from "../../components/CombinedCard";
import Footer from "../../components/Footer";

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
    fallback: "blocking",
  };
};

const DistroDetails = ({ pageData }) => {
  const distro = JSON.parse(pageData);
  // console.log('distro', distro);
  const { header, rating, slug, updatedAt } = distro;
  const bannerPresent = header.banner !== "false";
  // const router = useRouter();
  // if (router.isFallback) {}

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
          <p className="holder text-gray-200/90">{header.description}</p>
        </section>
        <section className="flex items-center justify-center bg-primary">
          <div className="w-full holder md:w-auto">
            <CombinedCard
              cardItems={[
                { title: "Architecture", text: header.attributes.architecture },
                { title: "Desktop", text: header.attributes.desktop },
                { title: "Category", text: header.attributes.category },
              ]}
            />
          </div>
        </section>
        <DetailsSection details={distro.details} />
        <Footer slug={slug} date={updatedAt} />
      </div>
    </>
  );
};

export default DistroDetails;
