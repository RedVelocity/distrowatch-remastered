const Card = ({ title, icon, children }) => (
  <div className="flex flex-col card">
    <h5 className="pb-2 mb-2 border-b">
      {icon && <i className={`fas ${icon}`} />}
      {` ${title}`}
    </h5>
    <div className="card-content">{children}</div> {/* Card.Content */}
  </div>
);

Card.MainContent = ({ text, textColor = 'text-gray-400', large, children }) => {
  const CustomTag = large ? 'h2' : 'h5';
  return (
    <CustomTag className={`inline-block ${textColor}`}>
      {text}
      {/* SubContent */}
      {children}
    </CustomTag>
  );
};

Card.SubContent = ({ text, textColor = 'text-gray-400', bold }) => (
  <span
    className={`${textColor} text-base font-normal tracking-normal ${
      bold && 'font-medium'
    }`}
  >
    {text}
  </span>
);

export default Card;
