import { expect, type Locator, type Page } from '@playwright/test';
import { urls } from './urls';

export class LoginPage {
    readonly page: Page;
    readonly loginHeader: Locator;
    readonly loginUsername: Locator;
    readonly loginPassword: Locator;
    readonly loginSubmitButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginHeader = page.getByRole('heading', { name: 'Login!', exact: true })
        this.loginUsername = page.locator('#username')
        this.loginPassword = page.locator('#password')
        this.loginSubmitButton = page.getByRole('button', { name: 'Login' })
        this.loginError = page.locator('div.bg-danger:visible').locator('div.card-body')
    }

    async goto() {
        await this.page.goto(urls.LOGIN_PAGE);
        await this.isLoginPage();
    }

    async isLoginPage() {
        await expect(this.loginHeader).toBeVisible();
    }

    async fillUsername(username: string) {
        await this.loginUsername.fill(username);
    }

    async fillPassword(password: string) {
        await this.loginPassword.fill(password);
    }

    async submitLogin() {
        await this.loginSubmitButton.click();
    }

    async clearCookies() {
        await this.page.context().clearCookies();
    }

    async hasUserNotFound(username: string) {
        await expect(this.loginError).toContainText(`User "${username}" does not exist`);
    }

}