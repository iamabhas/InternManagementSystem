const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};
