import {ObjectInterpolation} from '@emotion/core';
import {TextTransformProperty} from 'csstype';
import React from 'react';
import {COLOR} from '../identity';
import {filterProps} from '../util';

export interface TextProps<T = HTMLSpanElement> extends React.HTMLProps<T> {
  block?: boolean;
  bold?: boolean;
  center?: boolean;
  color?: string;
  fontSize?: string;
  light?: boolean;
  muted?: boolean;
  noWrap?: boolean;
  textTransform?: TextTransformProperty;
  truncate?: boolean;
}

const filterTextProps = (props: {}) => {
  return filterProps(props, [
    'block',
    'bold',
    'center',
    'color',
    'fontSize',
    'light',
    'muted',
    'noWrap',
    'textTransform',
    'truncate',
  ]);
};

export const textStyle: <T>(props: TextProps<T>) => ObjectInterpolation<undefined> = ({
  block = false,
  bold = false,
  center = false,
  color = COLOR.TEXT,
  fontSize = '16px',
  light = false,
  muted = false,
  noWrap = false,
  textTransform = 'none',
  truncate = false,
}) => ({
  color: color,
  display: block ? 'block' : 'inline',
  fontSize: fontSize,
  fontWeight: bold ? 600 : light ? 200 : 300,
  opacity: muted ? 0.56 : 1,
  overflow: truncate ? 'hidden' : undefined,
  textAlign: center ? 'center' : 'left',
  textOverflow: truncate ? 'ellipsis' : undefined,
  textTransform: textTransform,
  whiteSpace: noWrap ? 'nowrap' : undefined,
});

const Text = (props: TextProps) => <span css={textStyle(props)} {...filterTextProps(props)} />;

export {Text, filterTextProps};
