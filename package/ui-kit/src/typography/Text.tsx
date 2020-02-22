/** @jsx jsx */
import {ObjectInterpolation, jsx} from '@emotion/core';
import {TextTransformProperty} from 'csstype';
import {Theme} from '../layout/';
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

export const filterTextProps = (props: TextProps) => {
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

export const textStyle: <T>(theme: Theme, props: TextProps<T>) => ObjectInterpolation<undefined> = (
  theme,
  {
    block = false,
    bold = false,
    center = false,
    color = theme.general.color,
    fontSize = '16px',
    light = false,
    muted = false,
    noWrap = false,
    textTransform = 'none',
    truncate = false,
  },
) => ({
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

export const Text = (props: TextProps) => <span css={theme => textStyle(theme, props)} {...filterTextProps(props)} />;

export const Bold = (props: TextProps) => <Text bold {...props} />;
export const Small = (props: TextProps) => <Text fontSize={'12px'} {...props} />;
export const Muted = (props: TextProps) => <Text muted {...props} />;
export const Uppercase = (props: TextProps) => <Text textTransform={'uppercase'} {...props} />;
export const Large = (props: TextProps) => <Text fontSize={'48px'} light {...props} />;
