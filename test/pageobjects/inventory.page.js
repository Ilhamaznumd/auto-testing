import { $, browser } from '@wdio/globals'

class InventoryPage {
    // element locator

    get pageTitle() { return $('[data-test="title"]') }

    get productSortSelect () { return $('[data-test="product-sort-container"]') }
    get sortingDropdown() { return $('.product_sort_container'); }
    get optionNameAscending () { return this.productSortSelect.$('[value="az"]') }
    get optionNameDescending () { return this.productSortSelect.$('[value="za"]') }
    get optionPriceLow () { return this.productSortSelect.$('[value="lohi"]') }
    get optionPriceHigh () { return this.productSortSelect.$('[value="hilo"]') }

    get allProductNameElement () { return $$('[data-test="inventory-item-name"]') }
    get allProductPriceElement () { return $$('[data-test="inventory-item-price"]') }

    get cartIcon() { return $('.shopping_cart_link'); }
    get addToCartSauceLabsBackpackBtn() { return $('[data-test="add-to-cart-sauce-labs-backpack"]'); }
    get removeSauceLabsBackpackBtn() { return $('[data-test="remove-sauce-labs-backpack"]'); }
    get addToCartTShirtBtn() { return $('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'); }
    get removeTShirtBtn() { return $('[data-test="remove-test.allthethings()-t-shirt-(red)"]'); }

    get addToCartBtn() { return $('[data-test="add-to-cart"]'); }
    get removeBtn() { return $('[data-test="remove"]'); }

    get productLink() { return $('a[id="item_4_title_link"]'); }
    get productTitle() { return $('.inventory_details_name'); }


    // page actions
    async openPage() {
        await browser.url('https://www.saucedemo.com/inventory.html')
    }

    async orderProductByNameDesc () {
        await this.productSortSelect.click()
        await this.optionNameDescending.click()
    }

    async orderProductByNameAsc () {
        await this.productSortSelect.click()
        await this.optionNameAscending.click()
    }

    async orderProductByPriceLow () {
        await this.productSortSelect.click()
        await this.optionPriceLow.click()
    }

    async orderProductByPriceHigh () {
        await this.productSortSelect.click()
        await this.optionPriceHigh.click()
    }

    async getAllProductName () {
        const allProductNameText = []
        const products = await this.allProductNameElement
        for (const productName of products){
            const productNameText = await productName.getText()
            allProductNameText.push(productNameText)
        }

        return allProductNameText
    }

    async getAllProductPrice() {
        const allProductPriceText = []
        const productsPrice = await this.allProductPriceElement
        for (const productPrice of productsPrice) {
            const productPriceText = await productPrice.getText()
            allProductPriceText.push(productPriceText)
        }
    
        return allProductPriceText
    }
    
    async goToCartPage() {
        await this.cartIcon.click()
    }

    async addSauceLabsBackpackToCart() {
        await this.addToCartSauceLabsBackpackBtn.click()
    }

    async removeSauceLabsBackpack() {
        await this.removeSauceLabsBackpackBtn.click();
    }

    async addTShirtToCart() {
        await this.addToCartTShirtBtn.click();
    }

    async removeTShirt() {
        await this.removeTShirtBtn.click();
    }

    async openProductDetail() {
        await this.productLink.click();
    }

    async addButton() {
        await this.addToCartBtn.click()
    }

    async removeButton() {
        await this.removeBtn.click();
    }
}

export default new InventoryPage()