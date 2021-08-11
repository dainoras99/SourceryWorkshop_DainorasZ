exports.DuckDuckLandingPage = class DuckDuckLandingPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://start.duckduckgo.com/');
    }

    async initiateSearch(firstNumber, secondNumber) {
        await this.page.fill('#search_form_input_homepage', searchCriteria);
        await this.page.click('#search_button_homepage');
        await this.page.waitForNavigation();
    }

}