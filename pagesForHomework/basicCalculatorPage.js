exports.BasicCalculatorPage = class BasicCalculatorPage {

    constructor(page) {

        this.page = page;
    }

    

    async goto() {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }

    async selectOperationType(operationName) {
        await this.page.selectOption('#selectOperationDropdown', `${operationName}`);
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
        await this.page.selectOption('#selectBuild', `${buildName}`);
    }
}