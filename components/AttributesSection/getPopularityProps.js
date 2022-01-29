const getPopularityProps = (popularity) => {
  let textColor;
  if (popularity.length > 0) {
    if (popularity[0] <= 10) textColor = 'text-success';
    else if (popularity[0] <= 30) textColor = 'text-accent';
    else if (popularity[0] <= 70) textColor = 'text-warning';
    else textColor = 'text-danger';
  }

  return {
    title: 'Popularity',
    main: popularity[0],
    sub: ` (${popularity[1]})`,
    textColor,
    variant: popularity.length > 0 ? 'subHeading' : 'error',
    icon: 'fa-chart-line',
  };
};

export default getPopularityProps;
