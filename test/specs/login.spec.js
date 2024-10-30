import { browser, $, expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('FITUR LOGIN', function () {
    beforeEach(async function() {
        await loginPage.openPage()
    })

    it('User dapat login dengan username dan password yang benar', async function () {
        await loginPage.loginProcess('standard_user', 'secret_sauce')

        await browser.pause(2000)
        await expect(inventoryPage.pageTitle).toHaveText('Products')
    })

    it('User login dengan mengosongkan username', async function () {
        await loginPage.loginProcess('', 'secret_sauce')
        await browser.pause(2000)

        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required')
    })

    it('User login dengan mengosongkan password', async function () {
        await loginPage.loginProcess('standard_user', '')
        await browser.pause(2000)

        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required')
    })

    it('User login dengan username yang benar, namun password yang salah', async function () {
        await loginPage.loginProcess('standard_user', 'ini_salahbro')
        await browser.pause(2000)

        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    it('User login dengan username yang salah, namun password yang benar', async function () {
        await loginPage.loginProcess('bukan_user', 'secret_sauce')
        await browser.pause(2000)

        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

})