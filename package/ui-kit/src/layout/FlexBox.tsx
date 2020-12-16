/** @jsx jsx */
import {jsx, CSSObject} from '@emotion/react';
import {Property} from 'csstype';
import React from 'react';
import {filterProps} from '../util';

export interface FlexBoxProps<T = HTMLDivElement> extends React.HTMLProps<T> {
  align?: string;
  column?: boolean;
  justify?: string;
  flexWrap?: Property.FlexWrap;
}

const flexBoxStyle: <T>(props: FlexBoxProps<T>) => CSSObject = ({
  align = 'flex-start',
  column = false,
  justify = 'flex-start',
  flexWrap = 'nowrap',
}) => ({
  alignItems: align,
  display: 'flex',
  flexDirection: column ? 'column' : 'row',
  flexWrap: flexWrap,
  justifyContent: justify,
});

const filterFlexBoxProps = (props: Object) => {
  return filterProps(props, ['align', 'column', 'justify', 'flexWrap']);
};

const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => (
  <div ref={ref} css={flexBoxStyle(props)} {...filterFlexBoxProps(props)} />
)) as React.FC<FlexBoxProps>;

export {FlexBox, flexBoxStyle};
