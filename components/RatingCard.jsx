const RatingCard = ({ rating }) => (
  <div className="card">
    <h5>Rating</h5>
    <h2 className={`inline ${rating > 8 ? 'text-accent' : 'text-red-400'}`}>
      {rating}
    </h2>
    <span className="text-gray-400"> / 10</span>
  </div>
);

export default RatingCard;
