import {RecursivePartial} from '@passgen/commons';
import {ReactWrapper} from 'enzyme';
import {History} from 'history';
import React from 'react';
import {AnyAction} from 'redux';
import {MockStoreEnhanced} from 'redux-mock-store';
import {ThunkDispatch} from 'redux-thunk';
import {Api, RootState, initialRootState} from '../module/reducer';
import {mockStoreFactory} from '../util/mockStoreFactory';
import {mountComponent} from '../util/TestUtil';
import Index from './Index';

class IndexPage {
  private readonly driver: ReactWrapper;

  constructor(
    store: MockStoreEnhanced<RecursivePartial<RootState>, ThunkDispatch<RootState, Api, AnyAction>>,
    history?: History<any>
  ) {
    this.driver = mountComponent(<Index />, store, history);
  }

  getHeader = () => this.driver.find('header[data-uie-name="element-header"]');
}

describe('when visiting the index page', () => {
  it('shows the header', () => {
    const indexPage = new IndexPage(
      mockStoreFactory()({
        ...initialRootState,
      })
    );

    expect(indexPage.getHeader().exists())
      .withContext('Header is visible')
      .toBe(true);
  });
});
