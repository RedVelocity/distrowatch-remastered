const Card = ({ title, icon, children }) => (
  <div className="card flex flex-col">
    <h5 className="border-b mb-2 pb-2">
      {icon && <i className={`fas ${icon}`} />}
      {` ${title}`}
    </h5>
    {children}
  </div>
);

const Content = ({ children }) => (
  <div className="card-content">{children}</div>
);

const MainContent = ({ text, textColor = 'text-gray-400', large, children }) =>
  large ? (
    <h2 className={`inline-block tracking-normal ${textColor}`}>
      {text}
      {children}
    </h2>
  ) : (
    <h5 className={textColor}>
      {text}
      {children}
    </h5>
  );

const SubContent = ({ text }) => (
  <span className="text-gray-400 text-base font-normal">{text}</span>
);

Card.Content = Content;
Card.MainContent = MainContent;
Card.SubContent = SubContent;

export default Card;
