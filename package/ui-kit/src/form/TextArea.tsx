/** @jsx jsx */
import {ObjectInterpolation, jsx} from '@emotion/core';
import {Property} from 'csstype';
import React from 'react';
import {COLOR} from '../identity';
import {Theme} from '../layout';
import {TextProps} from '../typography';
import {filterProps} from '../util';

export interface TextAreaProps<T = HTMLTextAreaElement> extends TextProps<T> {
  markInvalid?: boolean;
  placeholderTextTransform?: Property.TextTransform;
}

export const textAreaStyle: <T>(theme: Theme, props: TextAreaProps<T>) => ObjectInterpolation<undefined> = (
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
    lineHeight: '24px',
    margin: '0 0 16px',
    opacity: disabled ? 0.56 : 1,
    outline: 'none',
    padding: '16px 16px',
    resize: 'none',
    width: '100%',
  };
};

export const TEXTAREA_CLASSNAME = 'textarea';
const filterTextAreaProps = (props: TextAreaProps) => filterProps(props, ['markInvalid', 'placeholderTextTransform']);

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps<HTMLTextAreaElement>>((props, ref) => (
  <textarea
    className={TEXTAREA_CLASSNAME}
    css={theme => textAreaStyle(theme, props)}
    ref={ref}
    {...filterTextAreaProps(props)}
  />
));
