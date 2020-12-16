/** @jsx jsx */
import {CSSObject, jsx} from '@emotion/core';
import {GlobalStyle} from './GlobalStyle';
import {THEME_ID, Theme, ThemeProvider} from './layout/Theme';
import {filterProps} from './util';

export interface StyledAppContainerProps<T = HTMLDivElement> extends React.HTMLProps<T> {
  backgroundColor?: string;
  themeId?: THEME_ID;
}

const styledAppContainerStyle: <T>(theme: Theme, props: StyledAppContainerProps<T>) => CSSObject = (
  theme,
  {backgroundColor = theme.general.backgroundColor},
) => ({
  background: backgroundColor,
  display: 'flex',
  height: '100%',
  minHeight: '100vh',
  transition: 'background 0.15s',
  width: '100vw',
});

const filterStyledAppContainerProps = (props: StyledAppContainerProps) =>
  filterProps(props, ['backgroundColor', 'themeId']);

const StyledAppContainer = (props: StyledAppContainerProps) => (
  <div css={theme => styledAppContainerStyle(theme, props)} {...filterStyledAppContainerProps(props)} />
);

export const StyledApp = ({themeId = THEME_ID.LIGHT, children, ...props}: StyledAppContainerProps) => (
  <ThemeProvider themeId={themeId}>
    <StyledAppContainer {...props}>
      <GlobalStyle />
      {children}
    </StyledAppContainer>
  </ThemeProvider>
);
