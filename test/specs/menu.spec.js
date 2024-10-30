import { browser, $, expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import menuPage from '../pageobjects/menu.page.js'

describe('FITUR MENU', function () {
    beforeEach('User harus login', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'secret_sauce')
        await menuPage.openMenu()
    })

    it('Memverifikasi menu All Items', async function () {
        await menuPage.clickAllItems()
        await expect(inventoryPage.pageTitle).toHaveText('Products')
    })

    it('Memverifikasi menu About', async function () {
        await menuPage.clickAbout()
        //await expect(browser).toHaveUrlContaining('saucelabs.com');
    })

    it('Memverifikasi Reset App State', async function () {
        await menuPage.clickResetAppState()
    })

    it('Memverifikasi logout dari menu burger', async function () {
        await menuPage.clickLogout()
        await expect(loginPage.submitButton).toBeExisting()
    })

    it('Memverifikasi tombol cart', async function () {
        await inventoryPage.goToCartPage()
        await expect(cartPage.pageTitle).toHaveText('Your Cart')
    })

})
