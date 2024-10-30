import loginPage from '../pageobjects/login.page';
import inventoryPage from '../pageobjects/inventory.page';
import cartPage from '../pageobjects/cart.page';
import checkoutPage from '../pageobjects/checkout.page';

describe('FITUR CART', function() {
    beforeEach('User harus login dan memiliki item produk di keranjang', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'secret_sauce')

        await inventoryPage.addSauceLabsBackpackToCart()
        await inventoryPage.goToCartPage()
    })
    
    afterEach( async function () {
        await inventoryPage.goToCartPage()
        if (await cartPage.isCartNotEmpty()) {
            await cartPage.clearCart();
        }
    })

    it('Memastikan informasi item produk yang ditambahkan pada Halaman Cart', async function () {
        await inventoryPage.goToCartPage()
        const isProductInCart = await cartPage.isProductInCart('Sauce Labs Backpack')
        await expect(isProductInCart).toBe(true)
    })

    it('Melakukan Checkout dengan adanya produk di Cart', async function () {
        //await cartPage.openPage()
        await browser.pause(2000)
        await cartPage.checkout()
        await browser.pause(2000)
        await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information')
        await checkoutPage.cancelCheckout()
    })

    it('Menghapus produk dari Cart', async function () {
        //await cartPage.openPage()
        await browser.pause(2000)
        await cartPage.removeSauceLabsBackpack()

        let isProductInCart = await cartPage.isProductInCart('Sauce Labs Backpack')
        await expect(isProductInCart).toBe(false)
    })

    it('Melakukan Checkout ketika tidak ada produk di Cart', async function () {
        //await cartPage.openPage();
        const isCheckoutClickable = await cartPage.isCheckoutBtnClickable()
        expect(isCheckoutClickable).toBe(false)
        await checkoutPage.cancelCheckout()
    })

    it('Klik "continue shopping" pada Halaman Cart', async function () {
        await cartPage.continueShopping();
        await browser.pause(2000)
        const url = await browser.getUrl();
        await expect(inventoryPage.pageTitle).toHaveText('Products')
    });

})
