const { test, expect } = require('@playwright/test');
const { BasicCalculatorPage } = require('../pagesForHomework/basicCalculatorPage');


let operations = {
    ADD: '0',
    SUBSTRACT: '1',
    MULTIPLY: '2',
    DIVIDE: '3',
    CONCATINATE: '4'
}

test.describe('', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        calculatorPage = new BasicCalculatorPage(page);
    });

    test.beforeEach(async () => {
        await calculatorPage.goto();
        await calculatorPage.selectBuild('0'); // sitoje vietoje selectint build'a (name)
    });

    test.only('Test to check if BasicCalculator page is loading', async () => {
        const firstTitleText = await page.textContent('.intro-heading.text-uppercase');
        const secondTitleText = await page.textContent('.intro-lead-in');
        const testSheepLogo = await page.isVisible('.navbar-brand.js-scroll-trigger')
        expect(firstTitleText).toMatch('Basic Calculator');
        expect(secondTitleText).toMatch('Selenium Object');
        expect(testSheepLogo).toBe(true);
    });

    test('Test to check if Add operation is working', async () => {
        const firstNumber = 4.2;
        const secondNumber = 5.1;
        await calculatorPage.calculateFunction(firstNumber, secondNumber, operations.ADD);
        const resultOfAdding = await calculatorPage.getAnswer();
        expect(resultOfAdding).toEqual(firstNumber + secondNumber);
    });

    test.only('Test to check if Subtract operation is working', async () => { 
        const firstNumber = 8.8;
        const secondNumber = 4;
        await calculatorPage.calculateFunction(firstNumber, secondNumber, operations.SUBSTRACT);
        const resultOfAdding = await calculatorPage.getAnswer();
        expect(resultOfAdding).toEqual(firstNumber - secondNumber);
    });

    test('Test to check if Multiply operation is working', async () => {
        const firstNumber = 2.5;
        const secondNumber = 4;
        await calculatorPage.calculateFunction(firstNumber, secondNumber, operations.MULTIPLY);
        const resultOfAdding = await calculatorPage.getAnswer();
        expect(resultOfAdding).toEqual(firstNumber * secondNumber);
    });

    test('Test to check if Divide operation is working', async () => { 
        const firstNumber = 12;
        const secondNumber = 2.5;
        await calculatorPage.calculateFunction(firstNumber, secondNumber, operations.DIVIDE);
        const resultOfAdding = await calculatorPage.getAnswer();
        expect(resultOfAdding).toEqual(firstNumber / secondNumber);
    });


    test.only('Test to check if Concatenate operation is working', async () => { 
        const firstTextNumber = '12';
        const secondTextNumber = '13';
        await calculatorPage.calculateFunction(firstTextNumber, secondTextNumber, operations.CONCATINATE);
        const resultOfAdding = await calculatorPage.getAnswer();
        expect(resultOfAdding).toEqual(parseInt(firstTextNumber + secondTextNumber));
    });

    test.only('Test to check Integers only checkbox funcionality (when checked) with add operation', async () => { 
        const firstNumber = 4.5;
        const secondNumber = 2.2;
        await calculatorPage.calculateFunction(firstNumber, secondNumber, operations.ADD);
        await page.check('#integerSelect');
        const resultOfAdding = await page.inputValue('.col-sm-7 > [readonly]');
        expect(resultOfAdding).toEqual(parseInt(firstNumber + secondNumber).toString());
    });

    test('Test to check Clear button funcionality', async () => {
        await calculatorPage.calculateFunction(4, 2, operations.ADD);
        await page.click('#clearButton');
        let resultField = parseInt(await page.inputValue('.col-sm-7 > [readonly]'));
        expect(resultField).toBeNaN();
    });

    test.only('Test to check Integers only checkbox visibility on concatenate operation', async () => { 
        await calculatorPage.selectOperationType(operations.CONCATINATE);
        const isVisible = await page.$('[disabled][hidden]');
        expect(isVisible).toBeTruthy();
    });

    test('Test to check if integers only checkbox is not disabled', async () => {
        const isDisabled = await page.$('.element.checkbox[disabled]');
        expect(isDisabled).toBeNull();
    });

    test.only('Test to check if error is visible when dividing by zero', async () => { 
        await calculatorPage.calculateFunction(4, 0, operations.DIVIDE);
        const isErrorVisible = await page.isVisible('#errorMsgField');
        expect(isErrorVisible).toBe(true);
    });
});