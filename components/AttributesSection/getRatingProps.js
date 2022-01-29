const getRatingProps = (rating) => {
  let textColor;
  if (rating >= 9) textColor = 'text-success';
  else if (rating >= 7.5) textColor = 'text-accent';
  else if (rating >= 6) textColor = 'text-warning';
  else textColor = 'text-danger';

  return {
    title: 'User Rating',
    main: rating,
    sub: ' / 10',
    textColor,
    variant: rating > 0 ? 'subHeading' : 'error',
  };
};

export default getRatingProps;
