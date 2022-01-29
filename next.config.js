const { withPlaiceholder } = require('@plaiceholder/next');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlaiceholder(
  withBundleAnalyzer({
    images: {
      domains: ['distrowatch.com', 'flagcdn.com'],
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/distro',
          permanent: true,
        },
      ];
    },
  })
);
