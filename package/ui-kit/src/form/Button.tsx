import {ObjectInterpolation} from '@emotion/core';
import React from 'react';
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

const buttonStyle: <T>(props: ButtonProps<T>) => ObjectInterpolation<undefined> = ({
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
}) => ({
  ...textStyle({
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

const buttonLinkStyle: (props: ButtonProps<HTMLAnchorElement>) => ObjectInterpolation<undefined> = props => ({
  ...buttonStyle(props),
  display: 'inline-block !important',
});

const Button = (props: ButtonProps) => <button css={buttonStyle(props)} {...filterButtonProps(props)} />;
const ButtonLink = (props: ButtonProps<HTMLAnchorElement>) => (
  <a css={buttonLinkStyle(props)} {...filterButtonLinkProps(props)} />
);

export {Button, ButtonLink, buttonStyle, filterButtonProps};
