import {RecursivePartial} from '@passgen/commons';
import {StyledApp} from '@passgen/ui-kit';
import {mount} from 'enzyme';
import {History, createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {AnyAction} from 'redux';
import {MockStoreEnhanced} from 'redux-mock-store';
import {ThunkDispatch} from 'redux-thunk';
import {Api, RootState} from '../module/reducer';

export const withStore = (
  children: React.ReactNode,
  store: MockStoreEnhanced<RecursivePartial<RootState>, ThunkDispatch<RootState, Api, AnyAction>>
) => <Provider store={store}>{children}</Provider>;

export const withTheme = (component: React.ReactNode) => <StyledApp>{component}</StyledApp>;

export const withRouter = (component: React.ReactNode, history: History) => (
  <Router history={history}>{component}</Router>
);

export const mountComponent = (
  component: React.ReactNode,
  store: MockStoreEnhanced<RecursivePartial<RootState>, ThunkDispatch<RootState, Api, AnyAction>>,
  history: History = createMemoryHistory()
) => mount(withRouter(withTheme(withStore(component, store)), history));
