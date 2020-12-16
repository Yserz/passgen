/** @jsx jsx */
import {jsx, CSSObject, Theme} from '@emotion/react';
import {COLOR, defaultTransition} from '../identity';
import {TextProps, filterTextProps, textStyle} from '../typography';
import {filterProps} from '../util';

export interface ButtonProps<T = HTMLButtonElement> extends TextProps<T> {
  backgroundColor?: string;
}

const filterButtonProps = (props: Object) => {
  return filterProps(filterTextProps(props), ['backgroundColor', 'noCapital']);
};

const filterButtonLinkProps = (props: Object) => {
  return filterProps(filterTextProps(props), ['backgroundColor', 'disabled', 'noCapital']);
};

const buttonStyle: <T>(theme: Theme, props: ButtonProps<T>) => CSSObject = (
  theme,
  {
    backgroundColor = COLOR.BLUE,
    block = false,
    disabled = false,
    bold = true,
    center = true,
    color = COLOR.WHITE,
    fontSize = '16px',
    noWrap = true,
    textTransform = 'uppercase',
    truncate = true,
    ...props
  },
) => ({
  ...textStyle(theme, {
    block,
    bold,
    center,
    color,
    disabled,
    fontSize,
    noWrap,
    textTransform,
    truncate,
    ...props,
  }),
  '&:hover, &:focus': {
    backgroundColor: disabled ? COLOR.DISABLED : COLOR.shade(backgroundColor, 0.06),
    textDecoration: 'none',
  },
  backgroundColor: disabled ? COLOR.DISABLED : backgroundColor,
  border: 0,
  borderRadius: '8px',
  cursor: disabled ? 'default' : 'pointer',
  display: 'inline-block',
  height: '48px',
  lineHeight: '48px',
  marginBottom: '16px',
  maxWidth: '100%',
  minWidth: '150px',
  outline: 'none',
  padding: '0 32px',
  textDecoration: 'none',
  touchAction: 'manipulation',
  transition: defaultTransition,
  width: block ? '100%' : 'auto',
});

const buttonLinkStyle: (theme: Theme, props: ButtonProps<HTMLAnchorElement>) => CSSObject = (theme, props) => ({
  ...buttonStyle(theme, props),
  display: 'inline-block !important',
});

const Button = (props: ButtonProps) => (
  <button css={theme => buttonStyle(theme, props)} {...filterButtonProps(props)} />
);
const ButtonLink = (props: ButtonProps<HTMLAnchorElement>) => (
  <a css={theme => buttonLinkStyle(theme, props)} {...filterButtonLinkProps(props)} />
);

export {Button, ButtonLink, buttonStyle, filterButtonProps};
