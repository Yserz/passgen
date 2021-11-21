/* tslint:disable:ordered-imports */
import 'url-search-params-polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import configureStore from 'configureStore';
import {actionRoot} from 'module/action/';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import Root from 'Root';
import {Workbox} from 'workbox-window';

const store = configureStore({actions: actionRoot, config: {}});

const main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    const updateChannel = new BroadcastChannel('precache-channel');
    updateChannel.addEventListener('message', event => {
      if (confirm(`New content is available!. Click OK to refresh`)) {
        window.location.reload();
      }
    });

    const workbox = new Workbox('/service-worker.js');

    try {
      const registration = await workbox.register();
      console.log('Successfully registered service worker', registration);
    } catch (error) {
      console.error('Failed to register service worker', error && (error as Error).message);
    }
  }
};

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('main'),
  );
};

runApp();
registerServiceWorker().catch(console.error);

function runApp() {
  render(Root);
  if (module.hot) {
    module.hot.accept('Root', () => {
      const NextApp = require('Root').default;
      render(NextApp);
    });
  }
}
