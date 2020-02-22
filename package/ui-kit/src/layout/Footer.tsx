import {ObjectInterpolation} from '@emotion/core';
import React from 'react';
import {Theme} from './Theme';

interface FooterProps<T = HTMLElement> extends React.HTMLProps<HTMLElement> {}

const footerStyle: <T>(theme: Theme, props: FooterProps<T>) => ObjectInterpolation<undefined> = (theme, props) => ({
  alignItems: 'center',
  display: 'flex',
  height: '40px',
  justifyContent: 'space-between',
});

const Footer = (props: FooterProps) => <footer css={theme => footerStyle(theme, props)} {...props} />;

export {Footer};
