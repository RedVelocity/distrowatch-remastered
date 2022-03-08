/* eslint-disable react/display-name */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { motion, Variants } from 'framer-motion';

type MainContentProps = {
  text: string;
  textColor?: string;
  large?: boolean;
  children?: React.ReactNode;
};
type MainBodyContent = (props: MainContentProps) => React.ReactElement;
const MainContent: MainBodyContent = ({
  text,
  textColor = 'text-zinc-400',
  large,
  children,
}) => {
  const CustomTag = large ? 'h2' : 'h5';
  return (
    <CustomTag className={`inline-block ${textColor}`}>
      {text}
      {/* SubContent */}
      {children}
    </CustomTag>
  );
};

type SubContentProps = { text: string; textColor?: string; bold?: boolean };
type SubBodyContent = (props: SubContentProps) => React.ReactElement;
const SubContent: SubBodyContent = ({
  text,
  textColor = 'text-zinc-400',
  bold,
}) => (
  <span
    className={`${textColor} text-base font-normal tracking-normal ${
      bold && 'font-medium'
    }`}
  >
    {text}
  </span>
);

type CardChildren = {
  MainContent?: MainBodyContent;
  SubContent?: SubBodyContent;
};
type CardProps = {
  title: string;
  icon: IconProp;
  children: React.ReactNode;
  variants?: Variants;
};
type CardComponent = (props: CardProps) => React.ReactElement;

const Card: CardComponent & CardChildren = ({
  title,
  icon,
  children,
  variants,
}) => (
  <motion.div className="card flex flex-col" variants={variants}>
    <h5 className="mb-2 border-b-2 pb-2 dark:border-zinc-500">
      {icon && <FontAwesomeIcon icon={icon} />}
      {` ${title}`}
    </h5>
    <div className="card-content p-2">{children}</div> {/* Card.Content */}
  </motion.div>
);

Card.MainContent = MainContent;
Card.SubContent = SubContent;

export default Card;
