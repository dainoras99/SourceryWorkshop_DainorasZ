const { test, expect } = require('@playwright/test');
const { DuckDuckLandingPage } = require('../pages/duckStartPage');
const { DuckResultsPage } = require('../pages/duckResultsPage');

test.describe('', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new DuckDuckLandingPage(page);
    resultsPage = new DuckResultsPage(page);
  });
  test.beforeEach(async () => {
    await startPage.goto();
  });


test('duckduckgo is loading', async () => {
  const duckLogo = await page.isVisible('#logo_homepage_link');
  expect(duckLogo).toBe(true);
});

test('Test that search is working', async () => {
  await startPage.initiateSearch('Test');
  const result1TextContent = await page.textContent('#r1-0');
  expect(result1TextContent).toContain('Test');
});

test('Cheat sheet working?', async () => {
 await startPage.initiateSearch('microsoft word cheat sheet')
  const isCheatSheetVisible = await page.isVisible('a[data-zci-link="cheat_sheets"]');
  const cheatSheetsTitle = await page.textContent('h3.c-base__title');
  expect(isCheatSheetVisible).toBe(true);
  expect(cheatSheetsTitle).toContain('Microsoft Word 2010');
});


test('Test that short wiki is working', async () => {
    await startPage.initiateSearch('shorten www.wikipedia.com');
    const shortenLink = await page.inputValue('#shorten-url');
    await page.goto(shortenLink);
    const url = page.url();
    expect(url).toBe('https://www.wikipedia.org/');
})

test('check that inTitle functionality works', async () => {
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'intitle:panda');
  await page.click('#search_button_homepage');
  await page.waitForNavigation();
  const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
  console.log(results);
    results.forEach(result => {
      expect(result).toContain("Panda");
    });
});

const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async () => {
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const generatedPassword = await resultsPage.getGeneratedPassword();
      expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });

  const invalidPasswordLengths = ['7', '65'];
  invalidPasswordLengths.forEach(passwordLength => {
    test(`Fails to Generate ${passwordLength} chracters long password`, async () => {
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const isPasswordElementVisible = await page.isVisible(".c-base__sub");
      expect(isPasswordElementVisible).toEqual(false)
    });
  });
});