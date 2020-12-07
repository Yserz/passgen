/** @jsx jsx */
import {jsx, Theme, ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import {COLOR} from '../identity/colors';
import {filterProps} from '../util';

export enum THEME_ID {
  LIGHT = 'THEME_LIGHT',
  DARK = 'THEME_DARK',
}

// Apply custom theme to Emotion so TypeScript can pick it up in the css prop
declare module '@emotion/react' {
  export interface Theme {
    Input: {
      placeholderColor: string;
      backgroundColor: string;
    };
    general: {
      backgroundColor: string;
      color: string;
    };
  }
}

export const themes: {[themeId in THEME_ID]: Theme} = {
  [THEME_ID.LIGHT]: {
    Input: {
      backgroundColor: COLOR.WHITE,
      placeholderColor: COLOR.GRAY_DARKEN_24,
    },
    general: {
      backgroundColor: COLOR.GRAY_LIGHTEN_80,
      color: COLOR.TEXT,
    },
  },
  [THEME_ID.DARK]: {
    Input: {
      backgroundColor: COLOR.BLACK_LIGHTEN_24,
      placeholderColor: COLOR.GRAY_LIGHTEN_88,
    },
    general: {
      backgroundColor: COLOR.BLACK,
      color: COLOR.WHITE,
    },
  },
};

export interface ThemeProps<T = HTMLDivElement> extends React.HTMLProps<T> {
  themeId: THEME_ID;
}

const filterThemeProps = (props: ThemeProps) => filterProps(props, ['themeId']);

export const ThemeProvider = (props: ThemeProps) => <div {...filterThemeProps(props)} />;
