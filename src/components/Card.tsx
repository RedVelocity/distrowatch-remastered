/* eslint-disable react/display-name */
import React from 'react';

type CardProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};
const Card = ({ title, icon, children }: CardProps): React.ReactElement => (
  <div className="card flex flex-col">
    <h5 className="mb-2 border-b pb-2">
      {icon && <i className={`fas ${icon}`} />}
      {` ${title}`}
    </h5>
    <div className="card-content">{children}</div> {/* Card.Content */}
  </div>
);

type MainContentProps = {
  text: string;
  textColor?: string;
  large?: boolean;
  children?;
};
Card.MainContent = ({
  text,
  textColor = 'text-gray-400',
  large,
  children,
}: MainContentProps): React.ReactElement => {
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
Card.SubContent = ({
  text,
  textColor = 'text-gray-400',
  bold,
}: SubContentProps): React.ReactElement => (
  <span
    className={`${textColor} text-base font-normal tracking-normal ${
      bold && 'font-medium'
    }`}
  >
    {text}
  </span>
);

export default Card;
