import reducers from 'module/reducer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

export const configureStore = (thunkArguments = {}) => {
  const store = createStore(reducers, {}, createMiddleware(thunkArguments));
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('module/reducer/index.ts', () => {
        store.replaceReducer(require('module/reducer/index.ts').default);
      });
    }
  }
  return store;
};

const createMiddleware = (thunkArguments: any) => {
  const middlewares = [];
  middlewares.push(thunk.withExtraArgument(thunkArguments));
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(
      createLogger({
        collapsed: true,
        diff: true,
        duration: true,
        level: {
          action: 'info',
          nextState: 'info',
          prevState: false,
        },
      }),
    );
  }
  let middleware = applyMiddleware(...middlewares);
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }
  return middleware;
};

export default configureStore;
