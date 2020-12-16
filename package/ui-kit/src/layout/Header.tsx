/** @jsx jsx */
import {jsx, CSSObject} from '@emotion/react';
import React from 'react';

export interface HeaderProps<T = HTMLHeadingElement> extends React.HTMLProps<T> {}

const headerStyle: <T>(props: HeaderProps<T>) => CSSObject = props => ({
  alignItems: 'center',
  display: 'flex',
  height: '64px',
  justifyContent: 'space-between',
  width: '100%',
});

const Header = (props: HeaderProps) => <header css={headerStyle(props)} {...props} />;

export {Header, headerStyle};
