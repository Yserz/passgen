const {createLogger} = require('redux-logger');
import {RecursivePartial} from '@passgen/commons';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ActionRoot, actionRoot} from '../module/action/';
import {RootState, ThunkDispatch} from '../module/reducer';

export interface MockStoreParameters {
  actions?: RecursivePartial<ActionRoot>;
  localStorage?: Storage;
}

const defaultActions = actionRoot;
const defaultLocalStorage = window.localStorage;

export const mockStoreFactory = (
  parameters: MockStoreParameters = {
    actions: defaultActions,
    localStorage: defaultLocalStorage,
  }
) => {
  const {actions, localStorage} = parameters;
  return configureStore<RecursivePartial<RootState>, ThunkDispatch>([
    thunk.withExtraArgument({
      actions,
      localStorage,
    }),
    createLogger({
      actionTransformer(action: any): string {
        return JSON.stringify(action);
      },
      colors: {
        action: false,
        error: false,
        nextState: false,
        prevState: false,
        title: false,
      },
      level: {
        action: 'info',
        nextState: false,
        prevState: false,
      },
    }),
  ]);
};
