import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../../pages/login-page";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import { expect } from "@playwright/test";
// @ts-ignore
import * as data from "../../helper/util/test-data/user_data.json";

let loginPage: LoginPage;
let assert: Assert;

Given('I navigate to the login page', async function () {
    loginPage = new LoginPage(fixture.page);
    assert = new Assert(fixture.page);
    await loginPage.navigateToLoginPage();
});

Then('I verify "Username" input field visibility', async function () {
    await expect(loginPage.usernameInputField).toBeVisible();
});

Then('I verify "Password" input field visibility', async function () {
    await expect(loginPage.passwordInputField).toBeVisible();
});

Then('I verify "Login" button visibility', async function () {
    await expect(loginPage.loginButton).toBeVisible();
});

Then('I verify "Forgot Password" visibility', async function () {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
});

When('I enter the username {string}', async function (username: string) {
    await loginPage.enterUsername(username);
});

When('I enter the password {string}', async function (password: string) {
    await loginPage.enterPassword(password);
});

When('I click on the login button', async function () {
    await loginPage.clickLoginButton();
});

Then('I should be redirected to the dashboard', async function () {
    await assert.assertURL(loginPage.successfullyLoggedInURL);
});

When('I log in with invalid username', async function () {
    await loginPage.login(data.invusername, data.password);
});

Then('I should see an invalid username error message', async function () {
    await expect(loginPage.isInvalidErrorMessageVisible()).toBeTruthy();
});

When('I log in with invalid password', async function () {
    await loginPage.login(data.username, "incorrectPassword");
});

Then('I should see an invalid password error message', async function () {
    await expect(loginPage.isInvalidErrorMessageVisible()).toBeTruthy();
});
