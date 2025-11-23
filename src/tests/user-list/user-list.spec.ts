import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../../pom/login-page";
import { AdminPage } from "../../pom/admin-page";
import { UsersListPage } from "../../pom/users-list-page";

const validUserUsername = process.env.valid_user_username ?? "define valid_user_username in .env";
const validUserPassword = process.env.valid_user_password ?? "define valid_user_password in .env";

// Extend basic test by providing an already logged in "Page" fixture.
const test = base.extend<{ usersListPage: UsersListPage }>({
    usersListPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.fillUsername(validUserUsername);
        await loginPage.fillPassword(validUserPassword);
        await loginPage.submitLogin();

        const adminPage = new AdminPage(page);
        await adminPage.isAdminPage();
        await adminPage.clickListUsers();

        const usersListPage = new UsersListPage(page);
        await usersListPage.isUsersListPage();
        await use(usersListPage);
    },
});

test("1. User List tables is visible, with users, after login", async ({ usersListPage }) => {
    await usersListPage.waitForUsersTable();
    const rows = await usersListPage.getTotalRows();
    expect(rows).toBeGreaterThan(2);
});

test("2. Search for full user name, having 1 user", async ({ usersListPage }) => {
    // Search for user "James Glenn" and expect that only 1 row
    await usersListPage.searchForUsers("James Glenn");
    const rows = await usersListPage.getTotalRows();    
    expect(rows).toBe(1);
});

test("3. Search for partial user name, having 2+ users", async ({ usersListPage }) => {
    // Search for user 'James' and expect that only 2 rows
    await usersListPage.searchForUsers("James");
    const rows = await usersListPage.getTotalRows();
    expect(rows).toBe(2);
});

test("4. Search for non-existent user name, no results expected", async ({ usersListPage }) => {
    // Search for an unexisting user and expect that no rows are shown
    await usersListPage.searchForUsers("NonExistentUserRandom123");
    const rows = await usersListPage.getTotalRows();
    expect(rows).toBe(0);
});
