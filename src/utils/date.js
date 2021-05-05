export const ddmmmyyyy = (date) => {
  return new Date(date).toLocaleString("en-UG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
export const hhmmss = (sec) => {
  sec = sec * 1000;
  const sec_num = parseInt(sec, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};
