import {test, expect, Page} from '@playwright/test';

class MainPage {
  public header = this.page.locator('[data-uie-name="element-header"]');
  public passwordLengthSlider = this.page.locator('[data-uie-name="element-password-length-slider"]');
  public passwordLengthInput = this.page.locator('[data-uie-name="element-password-length-input"]');
  public passwordBox = this.page.locator('[data-uie-name="password-box"]');

  constructor(private readonly page: Page) {
    this.registerConsoleHandler();
  }

  public load = async () => {
    await this.page.goto(`http://localhost:9090/`);
  };

  // https://github.com/microsoft/playwright/issues/4231
  public setSlider = async (val: number) => {
    await this.page.$eval(
      '[data-uie-name="element-password-length-slider"]',
      (e, value) => {
        (e as any).value = value;
        e.dispatchEvent(new Event('input', {bubbles: true}));
        e.dispatchEvent(new Event('change', {bubbles: true}));
      },
      val,
    );
  };

  private readonly registerConsoleHandler = () => {
    this.page.on('console', data => {
      switch (data.type()) {
        case 'error': {
          console.error(data);
          break;
        }
        case 'warning': {
          console.warn(data);
          break;
        }
        default: {
          console.log(data);
        }
      }
    });
  };
}

test.describe.parallel('MainPage', () => {
  test('defaults to 8 char password', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.load();

    expect(await mainPage.passwordLengthInput.inputValue()).toEqual('8');
    expect(await mainPage.passwordLengthSlider.inputValue()).toEqual('8');
    expect((await mainPage.passwordBox.innerText()).length).toEqual(8);
  });

  test('changes password length on input change', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.load();

    expect(await mainPage.passwordLengthInput.inputValue()).toEqual('8');
    expect(await mainPage.passwordLengthSlider.inputValue()).toEqual('8');
    expect((await mainPage.passwordBox.innerText()).length).toEqual(8);

    await mainPage.passwordLengthInput.fill('10');

    expect(await mainPage.passwordLengthInput.inputValue()).toEqual('10');
    expect(await mainPage.passwordLengthSlider.inputValue()).toEqual('10');
    expect((await mainPage.passwordBox.innerText()).length).toEqual(10);
  });

  test('changes password length on slider change', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.load();

    expect(await mainPage.passwordLengthInput.inputValue()).toEqual('8');
    expect(await mainPage.passwordLengthSlider.inputValue()).toEqual('8');
    expect((await mainPage.passwordBox.innerText()).length).toEqual(8);

    await mainPage.setSlider(10);

    expect(await mainPage.passwordLengthInput.inputValue()).toEqual('10');
    expect(await mainPage.passwordLengthSlider.inputValue()).toEqual('10');
    expect((await mainPage.passwordBox.innerText()).length).toEqual(10);
  });

  test('copies password to clipboard on click', async () => {
    test.fixme();
  });
});
