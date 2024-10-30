import { browser, $, expect } from '@wdio/globals'

import loginPage from '../pageobjects/login.page.js'
import { isAscending, isDescending } from '../helpers/checkSorting.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('FITUR INVENTORY', function () {
    before('User harus login', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'secret_sauce')
    })

    it('Membuka detail informasi item produk', async () => {
        //await inventoryPage.openPage();
        await inventoryPage.openProductDetail();
        const title = await inventoryPage.productTitle.getText();
        expect(title).toBe('Sauce Labs Backpack');
        await browser.pause(2000)
    });

    it('Menambahkan produk ke keranjang dan pastikan terdapat di halaman cart', async function () {
        //await inventoryPage.openPage()
        await browser.pause(2000)
        await inventoryPage.addButton()

        await inventoryPage.goToCartPage()
        await browser.pause(2000)

        const isProductInCart = await cartPage.isProductInCart('Sauce Labs Backpack')
        await expect(isProductInCart).toBe(true)
        await cartPage.continueShopping()
        await browser.pause(2000)
    });

    it('Menghapus produk dari detail item produk', async function () {
        //await inventoryPage.openPage();
        await inventoryPage.openProductDetail();
        await browser.pause(2000)
        await inventoryPage.removeButton()
        
        await inventoryPage.goToCartPage()
        let isProductInCart = await cartPage.isProductInCart('Sauce Labs Backpack')
        await browser.pause(2000)
        isProductInCart = await cartPage.isProductInCart('Sauce Labs Backpack')
        await expect(isProductInCart).toBe(false)
        await cartPage.continueShopping()
    });

})