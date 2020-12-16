import {CSSObject} from '@emotion/core';
import React from 'react';
import media, {QueryKeys} from './mediaQueries';
import {GUTTER} from './sizes';

export interface ColumnsProps<T = HTMLDivElement> extends React.HTMLProps<T> {}

const columnsStyle: <T>(props: ColumnsProps<T>) => CSSObject = props => ({
  display: 'flex',
  marginLeft: `-${GUTTER}px`,
  [media[QueryKeys.MOBILE]]: {flexDirection: 'column'},
});

const Columns = (props: ColumnsProps) => <div css={columnsStyle(props)} {...props} />;

export interface ColumnProps<T = HTMLDivElement> extends React.HTMLProps<T> {}

const columnStyle: <T>(props: ColumnProps<T>) => CSSObject = props => ({
  display: 'block',
  flexBasis: '0',
  flexGrow: 1,
  flexShrink: 1,
  marginLeft: `${GUTTER}px`,
});

const Column = (props: ColumnProps) => <div css={columnStyle(props)} {...props} />;

export {Column, Columns};
