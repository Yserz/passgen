import {ObjectInterpolation} from '@emotion/core';
import React from 'react';
import {GlobalStyle} from './GlobalStyle';
import {COLOR} from './identity';
import {filterProps} from './util';

export interface StyledAppContainerProps<T = HTMLDivElement> extends React.HTMLProps<T> {
  backgroundColor?: string;
}

const StyledAppContainerStyle: <T>(props: StyledAppContainerProps<T>) => ObjectInterpolation<undefined> = ({
  backgroundColor = COLOR.GRAY_LIGHTEN_88,
}) => ({
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
  backgroundColor: backgroundColor,
  color: COLOR.TEXT,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif',
  fontWeight: 300,
  lineHeight: 1.5,
  minHeight: '100vh',

  '*': {
    boxSizing: 'border-box',
  },
});

const filterStyledAppContainerProps = (props: Object) => filterProps(props, ['backgroundColor']);

const StyledAppContainer = (props: StyledAppContainerProps) => (
  <div css={StyledAppContainerStyle(props)} {...filterStyledAppContainerProps(props)} />
);

const StyledApp = ({children, ...props}: StyledAppContainerProps) => (
  <StyledAppContainer {...props}>
    <GlobalStyle />
    {children}
  </StyledAppContainer>
);

export {StyledApp};
