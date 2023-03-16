export const capitalizeFirstLetterOfEachWorlds = (value: string): string => {
  const newValue = value.toLowerCase();

  return newValue.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase(),
  );
};
