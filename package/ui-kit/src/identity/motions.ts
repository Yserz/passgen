import {keyframes} from '@emotion/core';

export const DURATION = {
  DEFAULT: 550,
  EXTRA_LONG: 2400,
  PROACTIVE_FAST: 150,
  PROACTIVE_SLOW: 350,
  SYSTEM: 700,
};

export const EASE = {
  EXPONENTIAL: 'cubic-bezier(0.19, 1, 0.22, 1)',
  QUART: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
};

export const ANIMATION = {
  bottomUpMovement: keyframes`
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  `,
  fadeIn: keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `,
  rotate: keyframes`
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  `,
  topDownMovement: keyframes`
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  `,
  topDownMovementLight: keyframes`
    0% {
      transform: translateY(-20%);
    }
    100% {
      transform: translateY(0);
    }
  `,
};

export const defaultTransition = 'all 0.24s';
