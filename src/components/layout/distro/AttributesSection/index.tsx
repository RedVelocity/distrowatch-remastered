import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faChartLine,
  faGlobeAfrica,
  faCheckCircle,
  faProjectDiagram,
  faSquareXmark,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { motion, Variants } from 'framer-motion';
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
    getTextColor('rank', Number.parseInt(attributes.rank[0]));
  const isDormant = attributes.status !== 'Active';

  const containerVariants: Variants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0,
      },
    },
    hidden: {
      opacity: 0,
    },
  };
  const cardVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: { opacity: 0, y: 100 },
  };

  return (
    <section
      className={`holder dark-accent ${marginRequired && 'mt-16'}`}
      // ref={containerRef}
    >
      <motion.div
        className="responsive-grid gap-4"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <Card title="User Rating" icon={faChartBar} variants={cardVariants}>
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
        <Card title="Popularity" icon={faChartLine} variants={cardVariants}>
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
        <Card title="Origin" icon={faGlobeAfrica} variants={cardVariants}>
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
        <Card title="Status" icon={faCheckCircle} variants={cardVariants}>
          <FontAwesomeIcon
            icon={isDormant ? faSquareXmark : faSquareCheck}
            className={`text-2xl ${isDormant ? 'text-danger' : 'text-success'}`}
          />
          <Card.MainContent
            text={attributes.status}
            textColor={isDormant ? 'text-danger' : 'text-success'}
          />
        </Card>
        <Card title="Based On" icon={faProjectDiagram} variants={cardVariants}>
          <Card.MainContent
            text={attributes.basedOn.join(', ')}
            textColor="text-zinc-500 dark:text-zinc-300"
          />
        </Card>
      </motion.div>
    </section>
  );
};

export default AttributesSection;
