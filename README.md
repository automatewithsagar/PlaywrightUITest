# 🧪 Playwright Automation Practice Project

This repository contains personal practice scripts for automating web applications using **Playwright**. It's a sandbox environment for learning browser testing, experimenting with features, and building clean, reliable test cases.

## 🔧 Tech Stack
- [Playwright](https://playwright.dev/) – end-to-end browser automation
- JavaScript/TypeScript
- Node.js & npm
- Visual Studio Code
- Git & GitHub

## 🚀 What's Included
- Sample test scenarios (login forms, page navigation, etc.)
- Cross-browser testing (Chromium, Firefox, WebKit)
- Page Object Model (POM) structure
- Custom test hooks and configuration

## 📁 Project Structure
PlaywrightAutomation/ ├── tests/ # Actual test scripts ├── pages/ # Page objects for reusable selectors ├── utils/ # Helper functions ├── test-data/ # Sample data for test inputs 
├── playwright.config.js # Playwright settings └── README.md # You're here!


## ▶️ How to Run
```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Generate HTML report
npx playwright show-report
