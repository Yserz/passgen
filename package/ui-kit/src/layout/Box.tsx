/** @jsx jsx */
import {CSSObject, jsx} from '@emotion/core';
import React from 'react';
import {COLOR} from '../identity';

export type BoxProps<T = HTMLDivElement> = React.HTMLProps<T>;

export const boxStyle: <T>(props: BoxProps<T>) => CSSObject = props => ({
  border: `2px solid ${COLOR.GRAY_LIGHTEN_64}`,
  borderRadius: '8px',
  padding: '16px 32px',
});

export const Box = (props: BoxProps) => <div css={boxStyle(props)} {...props} />;
