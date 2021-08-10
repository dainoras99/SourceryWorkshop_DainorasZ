exports.BasicCalculatorPage = class BasicCalculatorPage {

    constructor(page) {

        this.page = page;
    }

    async goto() {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }

    async selectOperationType(operationName) {
        const operations = await this.page.evaluate(() =>
            Array.from(document.querySelectorAll('#selectOperationDropdown > option'),
                operation => operation.textContent));

        for (let i = 0; i < operations.length; i++)
            if (operations[i] === operationName)
                await this.page.selectOption('select[name="selectOperation"]', i.toString());
    }

    async calculateNumbers(firstNumber, secondNumber) {
        await this.page.fill('#number1Field', firstNumber.toString());
        await this.page.fill('#number2Field', secondNumber.toString());
        await this.page.click('#calculateButton');
    }

    async calculateFunction(firstNumber, secondNumber, operationName) {
        await calculatorPage.selectOperationType(operationName);
        await calculatorPage.calculateNumbers(firstNumber, secondNumber);
    }

    async getAnswer() {
        return parseFloat(await this.page.inputValue('.col-sm-7 > [readonly]'));
    }

    async selectBuild(buildName) {
        const buildNames = await this.page.evaluate(() =>
            Array.from(document.querySelectorAll('#selectBuild > option'),
                build => build.textContent));

        for (let i = 0; i < buildNames.length; i++)
            if (buildNames[i] === buildName)
                await this.page.selectOption('select[name="selectBuild"]', i.toString());
    }
}