/** @jsx jsx */
import {Global, ObjectInterpolation, css, jsx} from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import {withTheme} from 'emotion-theming';
import {Theme} from './layout';
import {textLinkStyle} from './typography/TextLink';

const globalStyles: (theme: Theme) => ObjectInterpolation<undefined> = theme => ({
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

export const GlobalStyle = withTheme(({theme}) => {
  return <Global styles={globalStyle(theme)} />;
});
