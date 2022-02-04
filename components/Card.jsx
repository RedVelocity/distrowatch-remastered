const Card = ({ title, icon, children }) => (
  <div className="card flex flex-col">
    <h5 className="mb-2 border-b pb-2">
      {icon && <i className={`fas ${icon}`} />}
      {` ${title}`}
    </h5>
    <div className="card-content">{children}</div> {/* Card.Content */}
  </div>
);

Card.MainContent = ({ text, textColor = "text-gray-400", large, children }) => {
  const CustomTag = large ? "h2" : "h5";
  return (
    <CustomTag className={`inline-block ${textColor}`}>
      {text}
      {/* SubContent */}
      {children}
    </CustomTag>
  );
};

Card.SubContent = ({ text, textColor = "text-gray-400", bold }) => (
  <span
    className={`${textColor} text-base font-normal tracking-normal ${
      bold && "font-medium"
    }`}
  >
    {text}
  </span>
);

export default Card;
