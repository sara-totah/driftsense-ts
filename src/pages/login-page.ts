import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class LoginPage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        usernameInputField: '[placeholder="Enter your email address"]',
        passwordInputField: '[placeholder="Enter your password"]',
        forgotPasswordLink: 'text=Forgot your password?',
        loginButton: 'text = Sign In',
        logOutButton: 'text=Log out',
        invalidErrorMessage: 'text=Invalid email address or password.',
        emptyErrorMessage: 'text=Please fill out this field.',
        successfullyLoggedInURL: 'https://dev.drift-sense.com/dashboard'
    }

    get usernameInputField() {
        return this.page.locator(this.Elements.usernameInputField);
    }

    get passwordInputField() {
        return this.page.locator(this.Elements.passwordInputField);
    }

    get forgotPasswordLink() {
        return this.page.locator(this.Elements.forgotPasswordLink);
    }

    get loginButton() {
        return this.page.getByRole('button', { name: /Sign In/i });
    }

    get successfullyLoggedInURL() {
        return this.Elements.successfullyLoggedInURL;
    }
    async navigateToLoginPage() {
        await this.base.goto("https://dev.drift-sense.com/login");
    }

    async enterUsername(username: string) {
        await this.page.fill(this.Elements.usernameInputField, username);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.Elements.passwordInputField, password);
    }

    async clickLoginButton() {
        await this.page.click(this.Elements.loginButton);
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async isInvalidErrorMessageVisible() {
        return await this.page.isVisible(this.Elements.invalidErrorMessage);
    }

    async InvalidErrorMessageText() {
        return await this.page.textContent(this.Elements.invalidErrorMessage);
    }

    async isEmptyErrorMessageVisible() {
        return await this.page.isVisible(this.Elements.emptyErrorMessage);
    }

    async EmptyErrorMessageText() {
        return await this.page.textContent(this.Elements.emptyErrorMessage);
    }
}
