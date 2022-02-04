const getTextColor = (type, val) => {
  let textColor;
  if (type === "popularity") {
    if (val.length > 0) {
      if (val[0] <= 10) textColor = "text-success";
      else if (val[0] <= 30) textColor = "text-accent";
      else if (val[0] <= 70) textColor = "text-warning";
      else textColor = "text-danger";
    }
  } else if (type === "rating") {
    if (val >= 9) textColor = "text-success";
    else if (val >= 7.5) textColor = "text-accent";
    else if (val >= 6) textColor = "text-warning";
    else textColor = "text-danger";
  }
  return textColor;
};

export default getTextColor;
