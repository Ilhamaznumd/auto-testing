import { $ } from '@wdio/globals';

class CartPage {
    get pageTitle() { return $('[data-test="title"]') }
    get cartItems() { return $$('.cart_item'); }
    get cartItemNames() { return $$('.inventory_item_name'); }
    get checkoutButton() { return $('#checkout'); }
    get removeSauceLabsBackpackBtn() { return $('[data-test="remove-sauce-labs-backpack"]'); }
    get continueShoppingBtn() { return $('[data-test="continue-shopping"]'); }
    get cartItems() { return $$('.cart_item'); }
    get removeButtons() { return $$('[data-test^="remove-"]'); }

    async openPage() {
        await browser.url('https://www.saucedemo.com/cart.html')
    }

    async isCartNotEmpty() {
        const items = await this.cartItems;
        return items.length > 0;
    }

    // Method to remove all items from the cart
    async clearCart() {
        const removeButtons = await this.removeButtons;
        for (const removeBtn of removeButtons) {
            await removeBtn.click();
        }
    }

    async removeSauceLabsBackpack() {
        await this.removeSauceLabsBackpackBtn.click();
    }

    async getCartItemName() {
        return await this.cartItemNames.getText();
    }

    async isProductInCart(productName) {
        const items = await this.cartItemNames.map(async item => await item.getText());
        return items.includes(productName);
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingBtn.click();
    }

    async isCheckoutBtnClickable() {
        return await this.checkoutBtn.isClickable();
    }
}

export default new CartPage();
