import { expect, type Locator, type Page } from '@playwright/test';
import { urls } from './urls';

export class AdminPage {
    readonly page: Page;
    readonly adminHeader: Locator;
    readonly listUsers: Locator;
    readonly searchUsers: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminHeader = page.locator("//h1[@id='admin_page']").filter({ hasText: 'Admin Page' });
        this.listUsers = page.locator("a").locator("span").filter({ hasText: 'List Users' });
        this.searchUsers = page.locator('input[name="search"]');
    }

    async goto() {
        await this.page.goto(urls.ADMIN_PAGE);
        await this.isAdminPage();
    }

    async isAdminPage() {
        await expect(this.adminHeader).toBeVisible();
    }

    async clickListUsers() {
        await this.listUsers.click();
    }

    async searchForUsers(username: string) {
        await this.searchUsers.fill(username);
        await this.searchUsers.press('Enter');
    }
}