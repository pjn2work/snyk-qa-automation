# Test Plan

## 1. Introduction
This document outlines the test strategy for the QA Automation Take-Home Exercise. The goal is to implement automated E2E tests for the Login and User Management functionalities of the application hosted at `http://cova-dev.vulnapp.io:8080`.

## 2. Tools and Framework
- **Language:** TypeScript
- **Framework:** Playwright
- **Rationale:** Playwright is chosen for its speed, reliability, and native support for modern web features. It handles auto-waiting and has excellent debugging tools. TypeScript ensures type safety and better code maintainability.

## 3. Test Strategy
- **Page Object Model (POM) / Selector Pattern:** We will use a centralized selector management strategy (as seen in `src/selectors`) to decouple test logic from UI implementation details.
- **Configuration:** Base URL and environment settings are managed in `playwright.config.ts`.
- **CI/CD:** Tests are designed to be runnable in CI environments (headless mode).
- **Best Practices:**
    - Independent tests (no shared state).
    - DRY (Don't Repeat Yourself) principle for common actions like login.
    - AAA (Arrange, Act, Assert) pattern for test organization.
    - TDT (Table-Driven Tests) for repeatable test steps with different inputs/outputs.

## 4. Test Cases

### 4.1 Login Authentication
| ID | Title | Steps | Expected Result |
|----|-------|-------|-----------------|
| LOG-01 | Successful Login | 1. Navigate to Login Page<br>2. Enter valid email (`u*******`)<br>3. Enter valid password (`*******s`)<br>4. Click Login | User is redirected to the User List page. |
| LOG-02 | Invalid Password | 1. Navigate to Login Page<br>2. Enter valid email<br>3. Enter invalid password<br>4. Click Login | Error message displayed. User remains on Login page. |
| LOG-03 | Invalid Email | 1. Navigate to Login Page<br>2. Enter invalid email<br>3. Enter valid password<br>4. Click Login | Error message displayed. User remains on Login page. |
| LOG-04 | Empty Credentials | 1. Navigate to Login Page<br>2. Leave fields empty<br>3. Click Login | Validation error/prompt displayed. |

***note:** *After loggin in with valid credentials, we need to clear cookies to ensure that the login is not cached and the test is repeatable.*

### 4.2 User List and Search
| ID | Title | Steps | Expected Result |
|----|-------|-------|-----------------|
| USR-01 | User List Display | 1. Login successfully<br>2. Navigate to User List | List loads, at least one user is visible, user details (Name, Age, Start Date, Salary) are correct. |
| USR-02 | Search - Valid input, full name | 1. Login successfully<br>2. Enter full existing user name in search | List filters to show only the matching user. |
| USR-03 | Search - Partial input, one name | 1. Login successfully<br>2. Enter partial name in search | List shows all users containing the partial name. |
| USR-04 | Search - No Results | 1. Login successfully<br>2. Enter non-existent name | "No results found" empty table is displayed, just headers are visible. |

## 5. BONUS Challenge: Critical QA Eye (Improvements)
1. **Stable Selectors:** The application currently relies on generic classes (e.g., `.alert-danger`) or name attributes. Adding `data-testid` attributes to critical elements (inputs, buttons, rows) would make tests more robust against style/layout changes.
2. **Accessibility:** Improving ARIA labels and roles would not only help accessibility but also allow testing with semantic locators (e.g., `getByRole('button', { name: 'Login' })`), which are more resilient.
3. **API Testability:** Exposing a clean API for seeding/resetting data would allow tests to set up their own state (e.g., creating a specific user for search tests) rather than relying on pre-existing data, making tests more deterministic.
4. **No Clear "No Results" State for Search:** When a search yields no results, the user list simply becomes empty. There is no explicit "No results found" message or indicator. This makes it harder to write a definitive test case to verify the "no results" scenario. The test would have to assert that the list is empty, which could also happen if there's a bug in the rendering of the list. A clear message would provide a more robust assertion point.
