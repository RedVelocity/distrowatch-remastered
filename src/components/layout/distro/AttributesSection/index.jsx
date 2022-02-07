import Image from 'next/image';
import Card from '../../../Card';
import getTextColor from './getTextColor';

const AttributesSection = ({ marginRequired, rating, attributes }) => {
  const ratingTextColor = getTextColor('rating', rating);
  const popularityTextColor = getTextColor('popularity', attributes.popularity);
  const isDormant = attributes.status.includes('defined');
  return (
    <section className={`holder bg-accent ${marginRequired && 'mt-16'}`}>
      <div className="responsive-grid gap-4">
        <Card title="User Rating" icon="fa-chart-bar">
          {rating > 0 ? (
            <Card.MainContent
              text={rating.toFixed(2)}
              textColor={ratingTextColor}
              large
            >
              <Card.SubContent text=" / 10" />
            </Card.MainContent>
          ) : (
            <Card.SubContent text="No Ratings Yet" bold />
          )}
        </Card>
        <Card title="Popularity" icon="fa-chart-line">
          {attributes.popularity.length > 0 ? (
            <Card.MainContent
              text={attributes.popularity[0]}
              textColor={popularityTextColor}
              large
            >
              <Card.SubContent text={` (${attributes.popularity[1]})`} />
            </Card.MainContent>
          ) : (
            <Card.SubContent text="Not Ranked" bold />
          )}
        </Card>
        <Card title="Origin" icon="fa-globe-africa">
          {attributes.flags.map((flag, index) => (
            <div
              className="relative aspect-[5/3] w-14 overflow-hidden rounded"
              key={index}
            >
              <Image
                src={flag.flag}
                alt={flag.country}
                title={flag.country}
                layout="fill"
                priority
              />
            </div>
          ))}
        </Card>
        <Card title="Status" icon="fa-check-circle">
          <i
            className={`fas fa-toggle-on text-2xl ${
              isDormant ? 'rotate-180 text-danger' : 'text-success'
            }`}
          />
          <Card.MainContent
            text={attributes.status.split(' ')[0]}
            textColor={isDormant ? 'text-danger' : 'text-success'}
          />
        </Card>
        <Card title="Based On" icon="fa-project-diagram">
          <Card.SubContent
            text={attributes.basedOn}
            textColor="text-gray-600"
            bold
          />
        </Card>
      </div>
    </section>
  );
};

export default AttributesSection;
