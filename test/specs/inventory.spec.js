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

    it('Urutkan produk berdasarkan Name Descending', async function () {
        //await inventoryPage.openPage()
        await inventoryPage.orderProductByNameDesc()
        
        const allProductName = await inventoryPage.getAllProductName()

        const isProductSortedDesc = isDescending(allProductName)

        console.log('<===||||===> Is Product Sorted Descending:', allProductName)
        console.log('<===||||===> Is Product Sorted Descending:', isProductSortedDesc)

        await browser.pause(3000)
        await expect(isProductSortedDesc).toBe(true)
    })

    it('Urutkan produk berdasarkan Harga Terendah', async function () {
        //await inventoryPage.openPage()
        await inventoryPage.orderProductByPriceLow()
        
        const allProductPrice = await inventoryPage.getAllProductPrice()

        const productPricesAsNumbers = allProductPrice.map(price => parseFloat(price.replace('$', '')))
        
        const isPriceSortedAsc = isAscending(productPricesAsNumbers)

        console.log('<===||||===> Is Price Sorted Ascending:', allProductPrice)
        console.log('<===||||===> Is Price Sorted Ascending:', isPriceSortedAsc)

        await browser.pause(3000)
        await expect(isPriceSortedAsc).toBe(true)
    })

    it('Urutkan produk berdasarkan Harga Tertinggi', async function () {
        //await inventoryPage.openPage()
        await inventoryPage.orderProductByPriceHigh()

        const allProductPrice = await inventoryPage.getAllProductPrice()

        const productPricesAsNumbers = allProductPrice.map(price => parseFloat(price.replace('$', '')))
        
        const isPriceSortedDesc = isDescending(productPricesAsNumbers)

        console.log('<===||||===> Is Price Sorted Descending:', allProductPrice)
        console.log('<===||||===> Is Price Sorted Descending:', isPriceSortedDesc)

        await browser.pause(3000)
        await expect(isPriceSortedDesc).toBe(true)
    })

    it('Urutkan produk berdasarkan Name Ascending', async function () {
        //await inventoryPage.openPage()
        await inventoryPage.orderProductByNameDesc()
        await inventoryPage.orderProductByNameAsc()
        
        const allProductName = await inventoryPage.getAllProductName()

        const isProductSortedAsc = isAscending(allProductName)

        console.log('<===||||===> Is Product Sorted Ascending:', allProductName)
        console.log('<===||||===> Is Product Sorted Ascending:', isProductSortedAsc)

        await browser.pause(3000)
        await expect(isProductSortedAsc).toBe(true)
    })

    it('Menambahkan produk pertama ke keranjang dan pastikan terdapat di halaman cart', async function () {
        //await inventoryPage.openPage()
        await inventoryPage.addSauceLabsBackpackToCart()
        await browser.pause(2000)

        await inventoryPage.goToCartPage()
        await browser.pause(2000)

        let isProductInCart = await cartPage.isProductInCart('Sauce Labs Backpack')
        await expect(isProductInCart).toBe(true)
        await cartPage.continueShopping()
        await browser.pause(2000)
    })

    it('Menghapus produk pertama melalui halaman inventory', async function () {
        //await inventoryPage.openPage();

        await inventoryPage.removeTShirt()
        await browser.pause(2000)
        
        await inventoryPage.goToCartPage()
        let isProductInCart = await cartPage.isProductInCart('Sauce Labs Backpack')
        await browser.pause(2000)
        await expect(isProductInCart).toBe(false)
        await cartPage.continueShopping()
    })

    it('Menambahkan produk terakhir ke keranjang dan pastikan terdapat di halaman cart', async function () {
        //await inventoryPage.openPage()
        await inventoryPage.addTShirtToCart()
        await browser.pause(2000)

        await inventoryPage.goToCartPage()
        await browser.pause(2000)

        let isProductInCart = await cartPage.isProductInCart('Test.allTheThings() T-Shirt (Red)')
        await expect(isProductInCart).toBe(true)
        await cartPage.continueShopping()
        await browser.pause(2000)
    })

    it('Menghapus produk terakhir melalui halaman inventory', async function () {
        //await inventoryPage.openPage();

        await inventoryPage.removeTShirt()
        await browser.pause(2000)
        
        await inventoryPage.goToCartPage()
        let isProductInCart = await cartPage.isProductInCart('Test.allTheThings() T-Shirt (Red)')
        await browser.pause(2000)
        await expect(isProductInCart).toBe(false)
        await cartPage.continueShopping()
    })

})
