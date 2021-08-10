const { test, expect } = require('@playwright/test');

test('BasicCalculator is loading', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    const firstTitleText = await page.textContent('.intro-heading.text-uppercase');
    const secondTitleText = await page.textContent('.intro-lead-in');
    const testSheepLogo = await page.isVisible('.navbar-brand.js-scroll-trigger')
    const instructionsTitle = await page.textContent('.col-lg-12.text-left > h1');
    expect(firstTitleText).toMatch('Basic Calculator');
    expect(secondTitleText).toMatch('Selenium Object');
    expect(testSheepLogo).toBe(true);
    expect(instructionsTitle).toMatch('Instructions');
});

test('Add operation is working?', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
   // const operation = await page.textContent("#selectOperationDropdown>option[value='0']")
    await page.selectOption('select[name="selectOperation"]', '0');
    await page.fill('#number1Field', '6.5');
    await page.fill('#number2Field', '7');
    await page.click('#calculateButton');
    let resultOfAdding = parseFloat(await page.inputValue('.col-sm-7 > [readonly]'));
    expect(resultOfAdding).toEqual(13.5);
    //await page.waitForNavigation();
});

test('Subtract operation is working?', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
   // const operation = await page.textContent("#selectOperationDropdown>option[value='0']")
    await page.selectOption('select[name="selectOperation"]', '1');
    await page.fill('#number1Field', '16');
    await page.fill('#number2Field', '2');
    await page.click('#calculateButton');
    let resultOfAdding = parseFloat(await page.inputValue('.col-sm-7 > [readonly]'));
    expect(resultOfAdding).toEqual(14);
});

test('Multiply operation is working?', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
   // const operation = await page.textContent("#selectOperationDropdown>option[value='0']")
    await page.selectOption('select[name="selectOperation"]', '2');
    await page.fill('#number1Field', '4');
    await page.fill('#number2Field', '2');
    await page.click('#calculateButton');
    let resultOfAdding = parseFloat(await page.inputValue('.col-sm-7 > [readonly]'));
    expect(resultOfAdding).toEqual(8);
});

test('Divide operation is working?', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('select[name="selectOperation"]', '3');
    await page.fill('#number1Field', '10');
    await page.fill('#number2Field', '2');
    await page.click('#calculateButton');
    let resultOfAdding = parseFloat(await page.inputValue('.col-sm-7 > [readonly]'));
    expect(resultOfAdding).toEqual(5);
});


test('Concatenate operation is working?', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('select[name="selectOperation"]', '4');
    await page.fill('#number1Field', '3');
    await page.fill('#number2Field', '2');
    await page.click('#calculateButton');
    let resultOfAdding = parseFloat(await page.inputValue('.col-sm-7 > [readonly]'));
    expect(resultOfAdding).toEqual(32);
});

test('Integers only funcionality', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('select[name="selectOperation"]', '0');
    await page.fill('#number1Field', '4.5');
    await page.fill('#number2Field', '2.2');
    await page.click('#calculateButton');
    await page.check('#integerSelect');
    let resultOfAdding = parseInt(await page.inputValue('.col-sm-7 > [readonly]'));
    expect(resultOfAdding).toEqual(6);
});

test('Clear button funcionality', async ( {page} ) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('select[name="selectOperation"]', '0');
    await page.fill('#number1Field', '4');
    await page.fill('#number2Field', '2');
    await page.click('#calculateButton');
    await page.click('#clearButton');
    let resultField = parseInt(await page.inputValue('.col-sm-7 > [readonly]'));
    expect(resultField).toBeNaN();
});