import { $ } from '@wdio/globals';

class CheckoutPage {
    get pageTitle() { return $('[data-test="title"]'); }
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }

    get cancelBtn() { return $('#cancel'); }
    get finishButton() { return $('#finish'); }
    get itemPrice() { return $('.inventory_item_price'); }
    get totalPrice() { return $('.summary_subtotal_label'); }
    get completeMessage() { return $('.complete-header'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get backHomeBtn() { return $('.back-to-products'); }

    async openPage() {
        await browser.url('https://www.saucedemo.com/checkout-step-one.html')
    }

    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName)
        await this.lastNameInput.setValue(lastName)
        await this.postalCodeInput.setValue(postalCode)
        await this.continueButton.click()
    }

    async finishCheckout() {
        await this.finishButton.click()
    }

    async cancelCheckout() {
        await this.cancelBtn.click()
    }

    async getCompleteMessage() {
        return await this.completeMessage.getText()
    }

    async backToProducts() {
        await this.backHomeBtn.click()
    }

    async getErrorMessage() {
        return await this.errorMessage.getText()
    }

    async getItemPrice() {
        const priceText = await this.itemPrice.getText()
        return parseFloat(priceText.replace('$', ''))
    }

    async getTotalPrice() {
        const totalText = await this.totalPrice.getText()
        return parseFloat(totalText.replace('Item total: $', ''))
    }
}

export default new CheckoutPage();
