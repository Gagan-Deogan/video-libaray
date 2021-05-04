export const ddmmmyyyy = (date) => {
  return new Date(date).toLocaleString("en-UG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
