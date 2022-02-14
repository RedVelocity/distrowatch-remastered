import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faChartLine,
  faGlobeAfrica,
  faCheckCircle,
  faProjectDiagram,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';
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
  const cardRef = useRef(null);
  const q = gsap.utils.selector(cardRef);
  const ratingTextColor = getTextColor('rating', rating);
  const rankTextColor =
    attributes.rank.length > 0 &&
    getTextColor('rank', Number.parseInt(attributes.rank[0], 10));
  const isDormant = attributes.status !== 'Active';

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const animation = gsap.from(q('.card'), {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'center bottom',
        end: 'bottom bottom',
        // markers: true,
      },
    });
    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section
      className={`holder dark-light bg-accent ${marginRequired && 'mt-16'}`}
      ref={cardRef}
    >
      <div className="responsive-grid gap-4">
        <Card title="User Rating" icon={faChartBar}>
          {rating > 0 ? (
            <Card.MainContent
              text={rating.toFixed(2)}
              textColor={ratingTextColor}
              large
            >
              <Card.SubContent text=" / 10" />
            </Card.MainContent>
          ) : (
            <Card.MainContent text="No Ratings Yet" />
          )}
        </Card>
        <Card title="Popularity" icon={faChartLine}>
          {attributes.rank.length > 0 ? (
            <Card.MainContent
              text={attributes.rank[0]}
              textColor={rankTextColor}
              large
            >
              <Card.SubContent text={` (${attributes.rank[1]})`} />
            </Card.MainContent>
          ) : (
            <Card.MainContent text="Not Ranked" />
          )}
        </Card>
        <Card title="Origin" icon={faGlobeAfrica}>
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
        <Card title="Status" icon={faCheckCircle}>
          <FontAwesomeIcon
            icon={faToggleOn}
            className={`text-2xl ${
              isDormant ? 'rotate-180 text-danger' : 'text-success'
            }`}
          />
          <Card.MainContent
            text={attributes.status}
            textColor={isDormant ? 'text-danger' : 'text-success'}
          />
        </Card>
        <Card title="Based On" icon={faProjectDiagram}>
          <Card.MainContent
            text={attributes.basedOn.join(', ')}
            textColor="text-zinc-500 dark:text-zinc-300"
          />
        </Card>
      </div>
    </section>
  );
};

export default AttributesSection;
