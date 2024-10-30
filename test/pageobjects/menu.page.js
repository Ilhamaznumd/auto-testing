import { $, browser } from '@wdio/globals';

class MenuPage {
    // Element locators for Burger Menu
    get menuButton() { return $('#react-burger-menu-btn'); }
    get allItemsLink() { return $('#inventory_sidebar_link'); }
    get aboutLink() { return $('#about_sidebar_link'); }
    get logoutLink() { return $('#logout_sidebar_link'); }
    get resetAppStateLink() { return $('#reset_sidebar_link'); }
    get closeMenuButton() { return $('#react-burger-cross-btn'); }

    // Page actions for Burger Menu
    async openMenu() {
        await this.menuButton.click();
    }

    async closeMenu() {
        await this.closeMenuButton.click();
    }

    async clickAllItems() {
        await this.allItemsLink.click();
    }

    async clickAbout() {
        await this.aboutLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async clickResetAppState() {
        await this.resetAppStateLink.click();
    }
}

export default new MenuPage();
