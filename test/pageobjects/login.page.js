import { $, browser } from '@wdio/globals'

class loginPage {
    // element locator

    get usernameInput() { return $('#user-name') }
    get passwordInput() { return $('#password') }
    get submitButton() { return $('#login-button') }
    get errorMessage() { return $('h3[data-test="error"]') }

    // page actions
    async loginProcess (username,password){
        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)
        await this.submitButton.click()
    }

    async openPage() {
        await browser.url('https://www.saucedemo.com/')
    }
}

export default new loginPage()