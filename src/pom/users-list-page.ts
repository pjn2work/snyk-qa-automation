import { expect, type Locator, type Page } from '@playwright/test';
import { urls } from './urls';

export class UsersListPage {
    readonly page: Page;
    readonly usersListHeader: Locator;
    readonly searchUsers: Locator;
    readonly usersTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usersListHeader = page.getByRole("heading").getByText("List Users");
        this.searchUsers = page.getByRole("textbox", { name: "Search", exact: true });
        this.usersTable = page.locator("#dataTable");
    }

    async goto() {
        await this.page.goto(urls.USERS_LIST_PAGE);
        await this.isUsersListPage();
    }

    async isUsersListPage() {
        await expect(this.usersListHeader).toBeVisible();
    }

    async waitForUsersTable() {
        await this.usersTable.waitFor({ state: 'visible' });
    }

    async searchForUsers(username: string) {
        await this.searchUsers.fill(username);
        await this.searchUsers.press('Enter');
    }

    // Get locator for rows/users in the table
    getUsersRows(): Locator {
        return this.usersTable.locator('tbody').locator('tr');
    }

    // Get total of rows/users shown in the table
    async getTotalRows(): Promise<number> {
        return this.getUsersRows().count();
    }

    // assert that every row/user has the name in the first column
    async assertEveryUserHasName(name: string, strict: boolean = false) {
        const regex_name: RegExp = (strict) ? new RegExp(`^${name}$`) : new RegExp(`.*${name}.*`);
        const rows = await this.getUsersRows().all();
        for (const row of rows) {
            const nameCell = row.locator('td').first();
            await expect(nameCell).toContainText(regex_name);
        }
    }
}