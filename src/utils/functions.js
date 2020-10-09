export const decrement = (number) => {
  if (number <= 1) return;
  return Number(number) - 1;
}

export const increment = (number) => {
  if (increment >= 60) return;
  return Number(number) + 1;
}

export  const format2Digit = (seconds) => ('0' + seconds).slice(-2);