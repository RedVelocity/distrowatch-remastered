import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { motion, Variants } from 'framer-motion';

// Container type
type CardContainer = (props: {
  title: string;
  icon: IconProp;
  children: React.ReactNode;
  variants?: Variants;
}) => React.ReactElement;
// Main content type
type MainBodyContent = (props: {
  text: string;
  textColor?: string;
  large?: boolean;
  children?: React.ReactNode;
}) => React.ReactElement;
// Sub content type
type SubBodyContent = (props: {
  text: string;
  textColor?: string;
  bold?: boolean;
}) => React.ReactElement;
// Cart children type
type CardChildren = {
  MainContent: MainBodyContent;
  SubContent?: SubBodyContent;
};
type CardComponent = CardContainer & CardChildren;

const Card: CardComponent = ({ title, icon, children, variants }) => {
  const CustomDiv = variants ? motion.div : 'div';
  return (
    <CustomDiv className="card flex flex-col" variants={variants}>
      <h5 className="mb-2 border-b-2 pb-2 dark:border-zinc-500">
        {icon && <FontAwesomeIcon icon={icon} />}
        {` ${title}`}
      </h5>
      <div className="card-content p-2">{children}</div> {/* Card.Content */}
    </CustomDiv>
  );
};

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

Card.MainContent = MainContent;
Card.SubContent = SubContent;

export default Card;
