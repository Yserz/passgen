/** @jsx jsx */
import {ObjectInterpolation, jsx} from '@emotion/core';
import Color from 'color';
import {COLOR} from '../identity/colors';
import {defaultTransition} from '../identity/motions';
import {Theme} from '../layout';
import {filterProps} from '../util';
import {TextProps, filterTextProps, textStyle} from './Text';

export interface LinkProps<T = HTMLAnchorElement> extends TextProps<T> {}

export const linkStyle: <T>(theme: Theme, props: LinkProps<T>) => ObjectInterpolation<undefined> = (
  theme,
  {bold = true, color = theme.general.color, fontSize = '11px', textTransform = 'uppercase', ...props},
) => {
  const darker = 0.16;
  const hoverColor = Color(color).mix(Color(COLOR.BLACK), darker).toString();
  return {
    ...textStyle(theme, {bold, color, fontSize, textTransform, ...props}),
    '&:hover': {
      color: hoverColor,
    },
    '&:visited, &:link, &:active': {
      color: color,
    },
    color: color,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: defaultTransition,
  };
};

export const filterLinkProps = (props: LinkProps) => filterProps(filterTextProps(props) as LinkProps, []);

export const Link = (props: LinkProps) => {
  return (
    <a css={theme => linkStyle(theme, props)} rel="noopener noreferrer" {...filterLinkProps(props)}>
      {props.children}
    </a>
  );
};
