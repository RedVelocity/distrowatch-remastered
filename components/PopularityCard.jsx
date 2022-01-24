const PopularityCard = ({ popularity }) => (
  <div className="card">
    <h5 className="border-b mb-2">Popularity</h5>
    {popularity.length > 0 ? (
      <>
        <h2 className="inline-block">{popularity[0]}</h2>
        <span className="text-gray-400">{` (${popularity[1]})`}</span>
      </>
    ) : (
      <span className="text-gray-400">Not Ranked</span>
    )}
  </div>
);

export default PopularityCard;
