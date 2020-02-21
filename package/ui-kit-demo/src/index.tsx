import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Demo from './Demo';

const main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

function render(Component: any) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('main')
  );
}

function runApp() {
  render(Demo);
  if (module.hot) {
    module.hot.accept('./Demo', () => {
      const NextApp = require('./Demo').default;
      render(NextApp);
    });
  }
}

runApp();
