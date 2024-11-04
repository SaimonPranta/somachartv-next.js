const getSeoTimeFormat = (dateString = new Date()) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate
};

export { getSeoTimeFormat };
