/** @jsx jsx */
import {ObjectInterpolation, jsx} from '@emotion/core';
import {COLOR} from '../identity/colors';
import {Theme} from '../layout/index';
import {LinkProps, filterLinkProps, linkStyle} from './Link';

export type TextLinkProps<T = HTMLAnchorElement> = LinkProps<T>;

export const textLinkStyle: <T>(theme: Theme, props: TextLinkProps<T>) => ObjectInterpolation<undefined> = (
  theme,
  {color = COLOR.BLUE, fontSize = '16px', bold = false, textTransform = 'none', ...props},
) => ({
  ...linkStyle(theme, {bold, color, fontSize, textTransform, ...props}),
});

export const TextLink = (props: TextLinkProps<HTMLAnchorElement>) => (
  <a css={theme => textLinkStyle(theme, props)} {...filterLinkProps(props)} />
);
