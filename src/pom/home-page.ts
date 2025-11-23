import { expect, type Locator, type Page } from '@playwright/test';
import { urls } from './urls';

export class HomePage {
    readonly page: Page;
    readonly homePageHeader: Locator;
    readonly homePageLogin: Locator;
    readonly homePageLogin2fa: Locator;
    readonly homePageLogin2faEmail: Locator;
    readonly homePageLoginCaptcha: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homePageHeader = page.getByRole('heading', { name: 'Welcome', exact: true })
        this.homePageLogin = page.locator('#link-login')
        this.homePageLogin2fa = page.locator('#link-login-2fa')
        this.homePageLogin2faEmail = page.locator('#link-login-2fa-email')
        this.homePageLoginCaptcha = page.locator('#link-login-captcha-simple');
    }

    async goto() {
        await this.page.goto(urls.HOME_PAGE);
        await expect(this.homePageHeader).toBeVisible();
    }

    async clickLogin() {
        await this.homePageLogin.click();
    }

    async clickLogin2fa() {
        await this.homePageLogin2fa.click();
    }

    async clickLogin2faEmail() {
        await this.homePageLogin2faEmail.click();
    }

    async clickLoginCaptcha() {
        await this.homePageLoginCaptcha.click();
    }

}