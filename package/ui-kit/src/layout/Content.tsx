import {CSSObject} from '@emotion/core';
import React from 'react';
import {GUTTER} from './sizes';

export interface ContentProps<T = HTMLDivElement> extends React.HTMLProps<T> {}

const contentStyle: <T>(props: ContentProps<T>) => CSSObject = props => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: `0 ${GUTTER}px`,
  width: '100%',
});

const Content = (props: ContentProps) => <div css={contentStyle(props)} {...props} />;

export {Content, contentStyle};
