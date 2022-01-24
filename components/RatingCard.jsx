const RatingCard = ({ rating }) => (
  <div className="card">
    <h5>Rating</h5>
    <span
      className={`text-4xl font-medium ${
        rating > 8 ? 'text-accent' : 'text-red-400'
      }`}
    >
      {rating}
    </span>
    <span className="text-gray-400"> / 10</span>
  </div>
);

export default RatingCard;
