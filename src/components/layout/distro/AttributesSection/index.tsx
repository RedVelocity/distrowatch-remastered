import React from 'react';
import Image from 'next/image';
import { Attributes } from '../../../../models/Distro.d';
import Card from '../../../Card';
import getTextColor from './getTextColor';

type Props = {
  marginRequired: boolean;
  rating: number;
  attributes: Attributes;
};

const AttributesSection = ({
  marginRequired,
  rating,
  attributes,
}: Props): React.ReactElement => {
  const ratingTextColor = getTextColor('rating', rating);
  const rankTextColor =
    attributes.rank.length > 0 &&
    getTextColor('rank', Number.parseInt(attributes.rank[0], 10));
  const isDormant = attributes.status !== 'Active';
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
          {attributes.rank.length > 0 ? (
            <Card.MainContent
              text={attributes.rank[0]}
              textColor={rankTextColor}
              large
            >
              <Card.SubContent text={` (${attributes.rank[1]})`} />
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
            text={attributes.status}
            textColor={isDormant ? 'text-danger' : 'text-success'}
          />
        </Card>
        <Card title="Based On" icon="fa-project-diagram">
          <Card.SubContent
            text={attributes.basedOn.join(', ')}
            textColor="text-gray-500"
            bold
          />
        </Card>
      </div>
    </section>
  );
};

export default AttributesSection;
