// takes minute as value and adds it to current date-time
export const getExpiryDateInMin = (min: number): Date => {
  return new Date(new Date().getTime() + min * 60 * 1000);
};
