export type DataAttributeMap = Record<string, string | number | boolean>;

export const buildDataAttributes = (data?: DataAttributeMap) => {
  if (!data) {
    return;
  }

  const keys = Object.keys(data);
  const dataAttributes: DataAttributeMap = {};

  for (const key of keys) {
    dataAttributes[`data-${key}`] = data[key];
  }

  return dataAttributes;
};
