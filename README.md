# QA Automation Exercise

This repository contains automated End-to-End (E2E) tests for the Snyk QA Automation Exercise. The tests cover Authentication (Login) and User Management functionalities using **Playwright** with **TypeScript**.

## Exercise Details

The exercise details are available in the [EXERCISE.md](docs/EXERCISE.md) file.

## Application Details

- **URL**: http://cova-dev.vulnapp.io:8080
- **Test Credentials**:
  - Email: `<provided in .env>`
  - Password: `<provided in .env>`

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (usually comes with Node.js)

## Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone <repository-url>
   cd snyk-qa-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Configuration

Create a `.env` file in the root directory to store your environment variables. You can use the following template:

```env
valid_user_username=<valid_user_username>
valid_user_password=<valid_user_password>
```

## Running Tests

You can execute the tests using the Playwright CLI. Below are common commands:

### Run All Tests
To run all tests in the project:
```bash
npx playwright test
```

### Run Tests in a Specific Folder
To run all tests within a specific directory (e.g., login tests):
```bash
npx playwright test src/tests/login
```

### Run a Specific Test File
To run tests from a single file:
```bash
npx playwright test src/tests/login/login.spec.ts
```

### Run Tests in UI Mode
To open the interactive UI mode (useful for debugging and watching tests run):
```bash
npx playwright test --ui
```

### Run Tests in Headed Mode
To run tests with the browser visible:
```bash
npx playwright test --headed
```

### View Test Report
After running tests, you can view the HTML report:
```bash
npx playwright show-report
```

## Project Structure

- `src/pom`: Page Object Models (POM) representing pages of the application.
- `src/tests`: Test specifications grouped by feature (e.g., `login`, `user-list`).
- `playwright.config.ts`: Playwright configuration file.

## Test Plan

The test plan is available in the [TEST_PLAN.md](docs/TEST_PLAN.md) file.
