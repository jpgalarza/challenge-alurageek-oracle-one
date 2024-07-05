export const numberFormat = (number) => {
  const formattedNumber = new Intl.NumberFormat("de-DE").format(number);
  const intAndDecimal = formattedNumber.split(',');
  const decimal = intAndDecimal[1]?.slice(0, 2).padEnd(2, '0') || '00';
  return `${intAndDecimal[0]},${decimal}`;
}