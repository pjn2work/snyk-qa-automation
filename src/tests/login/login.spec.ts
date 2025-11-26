import { test, expect } from "@playwright/test";
import { HomePage } from "../../pom/home-page";
import { LoginPage } from "../../pom/login-page";
import { urls } from "../../pom/urls";

const validUserUsername = process.env.valid_user_username ?? "define valid_user_username in .env";
const validUserPassword = process.env.valid_user_password ?? "define valid_user_password in .env";

const scenarios = [
  // Positive Scenarios
  {
    name: "1. should login with valid credentials",
    username: validUserUsername,
    password: validUserPassword,
    expectedUrl: urls.ADMIN_PAGE,
  },
  // Negative Scenarios
  {
    name: "2. should NOT login with invalid password",
    username: validUserUsername,
    password: "invalid",
    expectedUrl: urls.LOGIN_PAGE,
  },
  {
    name: "3. should NOT login with invalid username",
    username: "invalid",
    password: validUserPassword,
    expectedUrl: urls.LOGIN_PAGE,
    expectedUserNotFound: true,
  },
  {
    name: "4.should NOT login with empty credentials",
    username: "",
    password: "",
    expectedUrl: urls.LOGIN_PAGE,
  },
]

test.describe("Login Scenarios", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Arrange
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await loginPage.clearCookies();
    await homePage.goto();
  });

  scenarios.forEach((scenario) => {
    test(`${scenario.name}`, async ({ page }) => {
      // Act    
      await homePage.clickLogin();
      await loginPage.fillUsername(scenario.username);
      await loginPage.fillPassword(scenario.password);
      await loginPage.submitLogin();

      // Assert
      await expect(page).toHaveURL(scenario.expectedUrl);
      if (scenario.expectedUserNotFound) {
        await loginPage.hasUserNotFound(scenario.username);
      }
    });
  });

});
