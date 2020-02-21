import {ObjectInterpolation} from '@emotion/core';
import React from 'react';

export interface HeaderProps<T = HTMLHeadingElement> extends React.HTMLProps<T> {}

const headerStyle: <T>(props: HeaderProps<T>) => ObjectInterpolation<undefined> = props => ({
  alignItems: 'center',
  display: 'flex',
  height: '64px',
  justifyContent: 'space-between',
});

const Header = (props: HeaderProps) => <header css={headerStyle(props)} {...props} />;

export {Header, headerStyle};
