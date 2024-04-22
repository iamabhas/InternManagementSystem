export const todayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const exactDate = date + "-" + month + "-" + year;
  return exactDate;
};
