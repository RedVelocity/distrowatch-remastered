const Card = ({ title, icon, children }) => (
  <div className="flex flex-col card">
    <h5 className="pb-2 mb-2 border-b">
      {icon && <i className={`fas ${icon}`} />}
      {` ${title}`}
    </h5>
    {children}
  </div>
);

Card.Content = ({ children }) => <div className="card-content">{children}</div>;

Card.MainContent = ({ text, textColor = 'text-gray-400', large, children }) =>
  large ? (
    <h2 className={`inline-block ${textColor}`}>
      {text}
      {children}
    </h2>
  ) : (
    <h5 className={textColor}>
      {text}
      {children}
    </h5>
  );

Card.SubContent = ({ text, bold }) => (
  <span
    className={`text-gray-400 text-base font-normal tracking-normal ${
      bold && 'font-medium'
    }`}
  >
    {text}
  </span>
);

export default Card;
