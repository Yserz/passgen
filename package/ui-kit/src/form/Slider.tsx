import {ObjectInterpolation} from '@emotion/core';
import React from 'react';
import {COLOR} from '../identity';
import {Theme} from '../layout';
import {filterProps} from '../util';

export interface SliderProps<T = HTMLInputElement> {}

const filterSliderProps = (props: Object) => {
  return filterProps(props, []);
};

const defaultSize = 24;
const sliderStyle: <T>(theme: Theme, props: SliderProps<T>) => ObjectInterpolation<undefined> = (theme, props) => ({
  '&::-moz-focus-outer': {
    border: 0,
  },
  '&::-moz-range-thumb': {
    background: COLOR.WHITE,
    border: 0,
    borderRadius: '100%',
    cursor: 'pointer',
    height: `${defaultSize}px`,
    width: `${defaultSize}px`,
  },
  '&::-webkit-slider-thumb': {
    appearance: 'none',
    background: COLOR.WHITE,
    border: 0,
    borderRadius: '100%',
    cursor: 'pointer',
    height: `${defaultSize}px`,
    width: `${defaultSize}px`,
  },
  '&:focus': {
    '&::-moz-range-thumb': {
      border: `2px solid ${COLOR.BLUE_OPAQUE_72}`,
    },
    '&::-webkit-slider-thumb': {
      border: `2px solid ${COLOR.BLUE_OPAQUE_72}`,
    },
  },
  appearance: 'none',
  background: COLOR.GRAY_LIGHTEN_16,
  borderRadius: '16px',
  boxShadow: 'inset 0px 0px 10px -4px rgba(0,0,0,0.39);',
  height: `${defaultSize}px`,
  outline: 'none',
  width: '100%',
});

const Slider = (props: SliderProps) => (
  <input type="range" css={theme => sliderStyle(theme, props)} {...filterSliderProps(props)} />
);

export {Slider, sliderStyle, filterSliderProps};
