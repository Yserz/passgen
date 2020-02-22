import {ObjectInterpolation} from '@emotion/core';
import React from 'react';
import {Theme} from '../layout';
import {filterProps} from '../util';
import {InputProps, filterInputProps, inputStyle} from './Input';

export interface SliderProps<T = HTMLInputElement> extends InputProps<T> {}

const filterSliderProps = (props: Object) => {
  return filterProps(filterInputProps(props), []);
};

const sliderStyle: <T>(theme: Theme, props: SliderProps<T>) => ObjectInterpolation<undefined> = (theme, props) => ({
  ...inputStyle(theme, props),
  width: '100%',
});

const Slider = (props: SliderProps) => (
  <input type="range" css={theme => sliderStyle(theme, props)} {...filterSliderProps(props)} />
);

export {Slider, sliderStyle, filterSliderProps};
