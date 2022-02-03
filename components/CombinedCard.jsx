const CombinedCard = ({ cardItems, className }) => (
  <ul
    className={`${className} card shadow divide-y-2 md:divide-y-0 md:divide-x-2 divide-accent flex flex-col md:flex-row`}
  >
    {cardItems.map((item) => (
      <li className="py-4 md:px-4 md:py-0">
        <h5 className="mb-2">{item.title}</h5>
        <span className="text-gray-400">{item.text}</span>
      </li>
    ))}
  </ul>
);

export default CombinedCard;
