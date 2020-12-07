/** @jsx jsx */
import {Global, CSSObject, css, jsx, Theme, useTheme} from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import {textLinkStyle} from './typography/TextLink';
import {themes} from './layout';

const globalStyles: (theme: Theme) => CSSObject = theme => ({
  '*': {
    boxSizing: 'border-box',
  },
  a: {
    ...textLinkStyle(theme, {}),
  },
  'b, strong': {
    fontWeight: 600,
  },
  body: {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    background: theme.general.backgroundColor,
    color: theme.general.color,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif',
    fontWeight: 300,
    lineHeight: 1.5,
    minHeight: '100vh',
    transition: 'background 0.15s',
  },
  html: {
    background: theme.general.backgroundColor,
    transition: 'background 0.15s',
  },
  p: {
    marginTop: 0,
  },
});

const globalStyle = (theme: Theme) => css`
  ${emotionNormalize}
  ${globalStyles(theme)}
`;

export const GlobalStyle = () => {
  const theme = useTheme();
  return <Global styles={globalStyle(theme)} />;
};
