/** @jsx jsx */
import {CSSObject, jsx} from '@emotion/core';
import {Property} from 'csstype';
import React from 'react';
import {COLOR} from '../identity';
import {Theme} from '../layout';
import {TextProps} from '../typography';
import {filterProps} from '../util';

export interface InputProps<T = HTMLInputElement> extends TextProps<T> {
  markInvalid?: boolean;
  placeholderTextTransform?: Property.TextTransform;
}

export const inputStyle: <T>(theme: Theme, props: InputProps<T>) => CSSObject = (
  theme,
  {markInvalid = false, placeholderTextTransform = 'uppercase', disabled = false},
) => {
  const placeholderStyle = {
    color: theme.Input.placeholderColor,
    fontSize: '11px',
    textTransform: placeholderTextTransform,
  };

  return {
    '&::-moz-placeholder': {
      ...placeholderStyle,
      opacity: 1,
    },
    '&::-ms-input-placeholder': {
      ...placeholderStyle,
    },
    '&::-webkit-input-placeholder': {
      ...placeholderStyle,
    },
    '&:invalid': !markInvalid
      ? {
          boxShadow: 'none',
        }
      : {},
    background: theme.Input.backgroundColor,
    border: 'none',
    borderRadius: '4px',
    boxShadow: markInvalid ? `0 0 0 1px ${COLOR.RED}` : 'none',
    caretColor: COLOR.BLUE,
    color: theme.general.color,
    fontWeight: 300,
    height: '56px',
    lineHeight: '24px',
    margin: '0 0 16px',
    opacity: disabled ? 0.56 : 1,
    outline: 'none',
    padding: '0 16px',
    width: '100%',
  };
};

export const INPUT_CLASSNAME = 'input';
export const filterInputProps = (props: InputProps) => filterProps(props, ['markInvalid', 'placeholderTextTransform']);

export const Input = React.forwardRef<HTMLInputElement, InputProps<HTMLInputElement>>(({type, ...props}, ref) => (
  <input
    className={INPUT_CLASSNAME}
    css={theme => inputStyle(theme, props)}
    ref={ref}
    type={type}
    {...filterInputProps(props)}
  />
));
