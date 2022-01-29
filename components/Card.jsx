const Card = ({ title, main, sub, textColor, variant = 'singleHeading' }) => {
  let CardContent;
  // eslint-disable-next-line default-case
  switch (variant) {
    case 'singleHeading':
      CardContent = (
        <h5 className={`grow flex items-center justify-center ${textColor}`}>
          {main}
        </h5>
      );
      break;
    case 'subHeading':
      CardContent = (
        <div>
          <h2 className={`inline-block tracking-normal ${textColor}`}>
            {main}
          </h2>
          <span className="text-gray-400">{sub}</span>
        </div>
      );
      break;
    case 'error':
      CardContent = (
        <span className="text-gray-400 grow flex items-center justify-center">
          Not Available
        </span>
      );
      break;
  }
  return (
    <div className="card flex flex-col">
      <h5 className="border-b mb-2">{title}</h5>
      {CardContent}
    </div>
  );
};

export default Card;
