import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  cardItems: { title: string; text: string }[];
  className?: string;
};
const CombinedCard = ({
  cardItems,
  className = '',
}: Props): React.ReactElement => (
  <motion.div
    className="w-full md:w-auto"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <ul
      className={`${className} card flex flex-col divide-y-2 divide-accent md:flex-row md:divide-y-0 md:divide-x-2`}
    >
      {cardItems.map((item) => (
        <li className="p-4" key={item.title}>
          <h5 className="mb-2">{item.title}</h5>
          <span className="text-zinc-400">{item.text}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default CombinedCard;
