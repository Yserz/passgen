/** @jsx jsx */
import {jsx, CSSObject} from '@emotion/react';
import React from 'react';
import {filterProps} from '../util';
import media, {QueryKeys} from './mediaQueries';
import {GUTTER, WIDTH} from './sizes';

export interface ContainerProps<T = HTMLDivElement> extends React.HTMLProps<T> {
  centerText?: boolean;
  level?: keyof Level;
  verticalCenter?: boolean;
}

export interface Level {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;
}

const LEVEL_MAX_WIDTH: Level = {
  lg: WIDTH.DESKTOP_MAX,
  md: WIDTH.TABLET_MAX,
  sm: WIDTH.TABLET_MIN,
  xs: WIDTH.MOBILE,
  xxs: WIDTH.TINY,
};

const containerStyle: <T>(props: ContainerProps<T>) => CSSObject = ({
  centerText = false,
  level = undefined,
  verticalCenter = false,
}) => ({
  margin: verticalCenter ? 'auto' : '0 auto',
  maxWidth: level ? `${LEVEL_MAX_WIDTH[level]}px` : undefined,
  position: 'relative',
  textAlign: centerText ? 'center' : 'left',
  width: '100%',
  [media[QueryKeys.DESKTOP]]: level
    ? undefined
    : {
        padding: 0,
        width: `${WIDTH.DESKTOP_MIN - GUTTER * 2}px`,
      },
});

const filterContainerProps = (props: Object) => filterProps(props, ['centerText', 'level', 'verticalCenter']);

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => (
  <div ref={ref} css={containerStyle(props)} {...filterContainerProps(props)} />
)) as React.FC<ContainerProps>;

export interface LevelContainerProps extends Omit<ContainerProps, 'level'> {}

const ContainerLG = React.forwardRef<HTMLDivElement, LevelContainerProps>((props, ref) => (
  <Container ref={ref} level={'lg'} {...props} />
));
const ContainerMD = React.forwardRef<HTMLDivElement, LevelContainerProps>((props, ref) => (
  <Container ref={ref} level={'md'} {...props} />
));
const ContainerSM = React.forwardRef<HTMLDivElement, LevelContainerProps>((props, ref) => (
  <Container ref={ref} level={'sm'} {...props} />
));
const ContainerXS = React.forwardRef<HTMLDivElement, LevelContainerProps>((props, ref) => (
  <Container ref={ref} level={'xs'} {...props} />
));
const ContainerXXS = React.forwardRef<HTMLDivElement, LevelContainerProps>((props, ref) => (
  <Container ref={ref} level={'xxs'} {...props} />
));

export {Container, ContainerLG, ContainerMD, ContainerSM, ContainerXS, ContainerXXS};
