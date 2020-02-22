export const noop = () => {};

export const inlineSVG = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const filterProps: (props: {}, propsToFilter: string[]) => {} = (props, propsToFilter) => {
  return Object.entries(props).reduce<{}>(
    (accumulator, [key, value]) => (!propsToFilter.includes(key) ? {...accumulator, [key]: value} : accumulator),
    {},
  );
};
