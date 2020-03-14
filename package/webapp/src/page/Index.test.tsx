import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, RecursivePartial} from '@passgen/commons';
import {ReactWrapper} from 'enzyme';
import {History} from 'history';
import {Api, RootState, initialRootState} from 'module/reducer';
import React from 'react';
import {AnyAction} from 'redux';
import {MockStoreEnhanced} from 'redux-mock-store';
import {ThunkDispatch} from 'redux-thunk';
import {mockStoreFactory} from 'util/mockStoreFactory';
import {mountComponent} from 'util/TestUtil';
import Index from './Index';

class IndexPage {
  private readonly driver: ReactWrapper;

  constructor(
    store: MockStoreEnhanced<RecursivePartial<RootState>, ThunkDispatch<RootState, Api, AnyAction>>,
    history?: History<any>,
  ) {
    this.driver = mountComponent(<Index />, store, history);
  }

  getHeader = () => this.driver.find('header[data-uie-name="element-header"]');
  getPasswordLengthSlider = () => this.driver.find('input[data-uie-name="element-password-length-slider"]');
  getPasswordLengthInput = () => this.driver.find('input[data-uie-name="element-password-length-input"]');
  getPasswordBox = () => this.driver.find('div[data-uie-name="password-box"]');

  enterPasswordLength = (passwordLength: number) =>
    this.getPasswordLengthInput().simulate('change', {target: {value: passwordLength}});
  setPasswordLengthSlider = (passwordLength: number) =>
    this.getPasswordLengthSlider().simulate('input', {target: {value: passwordLength}});
}

describe('when visiting the index page', () => {
  it('shows the header', () => {
    const indexPage = new IndexPage(
      mockStoreFactory()({
        ...initialRootState,
      }),
    );

    expect(indexPage.getHeader().exists()).toBe(true);
  });

  it('shows minimum password length by default', () => {
    const indexPage = new IndexPage(
      mockStoreFactory()({
        ...initialRootState,
      }),
    );

    expect(indexPage.getPasswordLengthInput().props().value).toBe(MIN_PASSWORD_LENGTH);
    expect(indexPage.getPasswordLengthSlider().props().value).toBe(MIN_PASSWORD_LENGTH);
    expect(indexPage.getPasswordBox().text().length).toBe(MIN_PASSWORD_LENGTH);
  });

  it('can change password length via input', () => {
    const indexPage = new IndexPage(
      mockStoreFactory()({
        ...initialRootState,
      }),
    );

    const passwordTestLength = 128;

    indexPage.enterPasswordLength(passwordTestLength);

    expect(indexPage.getPasswordLengthInput().props().value).toBe(passwordTestLength);
    expect(indexPage.getPasswordLengthSlider().props().value).toBe(passwordTestLength);
    expect(indexPage.getPasswordBox().text().length).toBe(passwordTestLength);
  });

  it('can not exceed max password length via input', () => {
    const indexPage = new IndexPage(
      mockStoreFactory()({
        ...initialRootState,
      }),
    );

    const passwordTestLength = MAX_PASSWORD_LENGTH + 128;

    indexPage.enterPasswordLength(passwordTestLength);

    expect(indexPage.getPasswordLengthInput().props().value).toBe(MAX_PASSWORD_LENGTH);
    expect(indexPage.getPasswordLengthSlider().props().value).toBe(MAX_PASSWORD_LENGTH);
    expect(indexPage.getPasswordBox().text().length).toBe(MAX_PASSWORD_LENGTH);
  });

  it('can change password length via slider', () => {
    const indexPage = new IndexPage(
      mockStoreFactory()({
        ...initialRootState,
      }),
    );

    const passwordTestLength = 128;

    indexPage.setPasswordLengthSlider(passwordTestLength);

    expect(indexPage.getPasswordLengthInput().props().value).toBe(passwordTestLength);
    expect(indexPage.getPasswordLengthSlider().props().value).toBe(passwordTestLength);
    expect(indexPage.getPasswordBox().text().length).toBe(passwordTestLength);
  });

  it('can not exceed max password length via slider', () => {
    const indexPage = new IndexPage(
      mockStoreFactory()({
        ...initialRootState,
      }),
    );

    const passwordTestLength = MAX_PASSWORD_LENGTH + 128;

    indexPage.setPasswordLengthSlider(passwordTestLength);

    expect(indexPage.getPasswordLengthInput().props().value).toBe(MAX_PASSWORD_LENGTH);
    expect(indexPage.getPasswordLengthSlider().props().value).toBe(MAX_PASSWORD_LENGTH);
    expect(indexPage.getPasswordBox().text().length).toBe(MAX_PASSWORD_LENGTH);
  });
});
