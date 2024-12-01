import { Page, expect } from "@playwright/test";

export default class LoginPage {
    constructor(public page: Page) {}

    async login() {
        await this.page.goto('https://narratives-fe.dev.ml-feapps.pulsarinternal.com/');
        await expect(this.page).toHaveTitle('Narratives AI - Pulsar111', { timeout: 5000 });
    }

    async logout() {
        await this.page.locator('button>svg[name="manageAccounts"]').click();
        await this.page.getByRole('menuitem', { name: 'Sign out' }).click();
        await expect(this.page.getByRole('tab', { name: 'Sign In' })).toBeVisible();
        await expect(this.page.getByRole('tab', { name: 'Create Account' })).toBeVisible();
    }
}