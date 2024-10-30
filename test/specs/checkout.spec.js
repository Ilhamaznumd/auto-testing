import loginPage from '../pageobjects/login.page';
import inventoryPage from '../pageobjects/inventory.page';
import cartPage from '../pageobjects/cart.page';
import checkoutPage from '../pageobjects/checkout.page';

describe('FITUR PADA HALAMAN CHECKOUT', function() {
    beforeEach('User harus login dan memiliki item produk di keranjang', async function () {
        await loginPage.openPage()
        await loginPage.loginProcess('standard_user', 'secret_sauce')

        //await inventoryPage.openPage()
        await inventoryPage.addSauceLabsBackpackToCart()
        await inventoryPage.goToCartPage()
        await cartPage.checkout()
    })

    afterEach( async function () {
        await inventoryPage.goToCartPage()
        if (await cartPage.isCartNotEmpty()) {
            await cartPage.clearCart();
        }
    })

    it('Menyelesaikan proses checkout dengan mengisi semua field dan cek harga produk', async function () {
        await checkoutPage.fillInformation('Standard', 'User', '12345')
        await browser.pause(2000)
        const itemPrice = await checkoutPage.getItemPrice();
        const totalPrice = await checkoutPage.getTotalPrice();
        await expect(totalPrice).toEqual(itemPrice);
        await browser.pause(2000)
    })

    it('Proses checkout dengan mengisi semua field dan menyelesaikan pemesanan', async function () {
        await checkoutPage.fillInformation('Standard', 'User', '12345')
        await browser.pause(2000)
        await checkoutPage.finishCheckout()
        const message = await checkoutPage.getCompleteMessage()
        await expect(message).toEqual('Thank you for your order!')
        await browser.pause(2000)
    })

    it('Proses checkout dengan mengisi semua field kecuali first name', async function () {
        await checkoutPage.fillInformation('', 'User', '12345')
        await browser.pause(2000)
        const message = await checkoutPage.getErrorMessage()
        await expect(message).toEqual('Error: First Name is required')
        await browser.pause(2000)
    })

    it('Proses checkout dengan mengisi semua field kecuali last name', async function () {
        await checkoutPage.fillInformation('Standard', '', '12345')
        await browser.pause(2000)
        const message = await checkoutPage.getErrorMessage()
        await expect(message).toEqual('Error: Last Name is required')
        await browser.pause(2000)
    })

    it('Proses checkout dengan mengisi semua field kecuali postal code', async function () {
        await checkoutPage.fillInformation('Standard', 'User', '')
        await browser.pause(2000)
        const message = await checkoutPage.getErrorMessage()
        await expect(message).toEqual('Error: Postal Code is required')
        await browser.pause(2000)
    })

    it('Klik tombol "cancel" dan kembali ke halaman Cart', async function () {
        await checkoutPage.cancelCheckout();
        const url = await browser.getUrl();
        await expect(cartPage.pageTitle).toHaveText('Your Cart')
    })

})
