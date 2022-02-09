const getTextColor = (type: 'rank' | 'rating', val: number): string => {
  let textColor;
  if (type === 'rank') {
    if (val <= 10) textColor = 'text-success';
    else if (val <= 30) textColor = 'text-accent';
    else if (val <= 70) textColor = 'text-warning';
    else textColor = 'text-danger';
  } else if (type === 'rating') {
    if (val >= 9) textColor = 'text-success';
    else if (val >= 7.5) textColor = 'text-accent';
    else if (val >= 6) textColor = 'text-warning';
    else textColor = 'text-danger';
  }
  return textColor;
};

export default getTextColor;
