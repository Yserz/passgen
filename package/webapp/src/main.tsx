/* tslint:disable:ordered-imports */
import 'url-search-params-polyfill';
import '@babel/polyfill';
import configureStore from 'configureStore';
import {actionRoot} from 'module/action/';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import Root from 'Root';

const store = configureStore({actions: actionRoot, config: {}});

const main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('main')
  );
};

runApp();

function runApp() {
  render(Root);
  if (module.hot) {
    module.hot.accept('Root', () => {
      const NextApp = require('Root').default;
      render(NextApp);
    });
  }
}
