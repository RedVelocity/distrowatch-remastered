import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getDistroPaths from '../../services/getDistroPaths';
import getDistroDetails from '../../services/getDistroDetails';
import CombinedCard from '../../components/CombinedCard';
import Footer from '../../components/Footer';
import {
  AttributesSection,
  DetailsSection,
  HeroSection,
} from '../../components/layout/distro';
import { DistroModel } from '../../models/Distro.d';

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { distro } = context.params;
    const pageData = await getDistroDetails(distro.toString());
    // console.log(`pageData`, pageData);
    return {
      props: {
        pageData: JSON.stringify(pageData.toObject()),
      },
      revalidate: 60 * 60 * 24 * 7, // Rebuild every 7days
    };
  } catch (error) {
    return { notFound: true };
  }
  // const { base64, img } = await getPlaiceholder(pageData.header.logo);
  // const logo = {
  //   src: img.src,
  //   placeholder: 'blur',
  //   blurDataURL: base64,
  //   layout: 'fill',
  //   objectFit: 'scale-down',
  // };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getDistroPaths();
  return {
    paths,
    fallback: true,
  };
};

const DistroDetails: NextPage<{
  pageData: string;
}> = ({ pageData }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const distro: DistroModel = JSON.parse(pageData);
  // console.log('distro', distro);
  const { header, rating, slug, updatedAt, details } = distro;
  const { title, logo, banner, description, attributes } = header;
  const bannerPresent = banner !== 'false';
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
        <section className="texture holder dark-secondary flex flex-col items-center justify-center gap-4">
          <p className="text-zinc-200/90">{description}</p>
          <CombinedCard
            cardItems={[
              {
                title: 'Architecture',
                text: attributes.architecture.join(', '),
              },
              { title: 'Desktop', text: attributes.desktop.join(', ') },
              { title: 'Category', text: attributes.category.join(', ') },
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
