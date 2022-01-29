import Card from '../Card';
import getRatingProps from './getRatingProps';
import getPopularityProps from './getPopularityProps';

const AttributesSection = ({ marginRequired, rating, attributes }) => {
  const ratingProps = getRatingProps(rating);
  const popularityProps = getPopularityProps(attributes.popularity);
  return (
    <section className={`bg-accent ${marginRequired && 'mt-16'}`}>
      <div className="holder responsive-grid gap-4">
        <Card {...ratingProps} />
        <Card {...popularityProps} />
        <Card
          title="Country"
          icon="fa-globe-africa"
          variant="flags"
          flags={attributes.flags}
        />
        <Card
          title="Status"
          variant="singleHeading"
          main={attributes.status.split(' ')[0]}
          textColor={
            attributes.status.includes('defined')
              ? 'text-danger'
              : 'text-success'
          }
          icon="fa-check-circle"
        />
      </div>
    </section>
  );
};

export default AttributesSection;
