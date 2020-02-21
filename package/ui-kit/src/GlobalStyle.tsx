const emotionNormalize = require('emotion-normalize');
import {Global, css} from '@emotion/core';
import React from 'react';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${emotionNormalize}

        body {
          margin: 0;
        }

        p {
          margin-top: 0;
        }
      `}
    />
  );
};

export {GlobalStyle};
