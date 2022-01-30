import Image from 'next/image';

const Card = ({
  title,
  main,
  sub,
  textColor,
  variant = 'singleHeading',
  flags = [],
  icon,
}) => {
  let CardContent;
  // eslint-disable-next-line default-case
  switch (variant) {
    case 'singleHeading':
      CardContent = <h4 className={`card-content ${textColor}`}>{main}</h4>;
      break;
    case 'subHeading':
      CardContent = (
        <div className="card-content gap-2">
          <h2 className={`inline-block tracking-normal ${textColor}`}>
            {main}
            <span className="text-gray-400 text-base font-normal">{sub}</span>
          </h2>
        </div>
      );
      break;
    case 'error':
      CardContent = (
        <h4 className="text-gray-400 card-content">Not Available</h4>
      );
      break;
    case 'flags':
      CardContent = (
        <div className="flex gap-1 grow items-center justify-center md:justify-start">
          {flags.map((flag, index) => (
            <div
              className="w-14 aspect-[5/3] relative overflow-hidden rounded"
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
        </div>
      );
      break;
  }
  return (
    <div className="card flex flex-col">
      <h5 className="border-b mb-2 pb-2">
        {icon && <i className={`fas ${icon}`} />}
        {` ${title}`}
      </h5>
      {CardContent}
    </div>
  );
};

export default Card;
