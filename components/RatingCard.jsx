const RatingCard = ({ rating }) => {
  let textColor;
  if (rating >= 8) textColor = 'text-accent';
  else if (rating >= 6) textColor = 'text-yellow-400';
  else textColor = 'text-red-400';
  return (
    <div className="card">
      <h5 className="border-b mb-2">User Rating</h5>
      {rating > 0 ? (
        <>
          <h2 className={`inline-block ${textColor}`}>{rating}</h2>
          <span className="text-gray-400"> / 10</span>
        </>
      ) : (
        <span className="text-gray-400">Not Rated</span>
      )}
    </div>
  );
};

export default RatingCard;
