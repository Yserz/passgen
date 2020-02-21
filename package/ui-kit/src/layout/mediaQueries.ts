import {WIDTH} from './sizes';

export enum QueryKeys {
  DESKTOP = 'desktop',
  DESKTOP_XL = 'desktopXL',
  MOBILE = 'mobile',
  MOBILE_UP = 'mobileUp',
  TABLET = 'tablet',
  TABLET_DOWN = 'tabletDown',
  TABLET_UP = 'tabletUp',
}

export type QueryMap = {[index in QueryKeys]: string};

export const QUERY: QueryMap = {
  [QueryKeys.DESKTOP]: `min-width: ${WIDTH.DESKTOP_MIN}px`,
  [QueryKeys.DESKTOP_XL]: `min-width: ${WIDTH.DESKTOP_XL_MIN}px`,
  [QueryKeys.MOBILE]: `max-width: ${WIDTH.MOBILE}px`,
  [QueryKeys.MOBILE_UP]: `min-width: ${WIDTH.MOBILE}px`,
  [QueryKeys.TABLET]: `min-width: ${WIDTH.TABLET_MIN}px) and (max-width: ${WIDTH.TABLET_MAX}px`,
  [QueryKeys.TABLET_DOWN]: `max-width: ${WIDTH.TABLET_MAX}px`,
  [QueryKeys.TABLET_UP]: `min-width: ${WIDTH.TABLET_MIN}px`,
};

const media = Object.entries(QUERY).reduce<QueryMap>(
  (accumulator, [key, value]) => ({...accumulator, [key]: `@media (${value})`}),
  {} as QueryMap
);

export default media;
