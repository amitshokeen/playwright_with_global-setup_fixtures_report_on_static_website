import { Page, expect } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

export default class LoginPage {
    constructor(public page: Page) {}

    async login() {
        if (!process.env.BASE_URL) {
            throw new Error("BASE_URL environment variable is not set");
        }
        await this.page.goto(process.env.BASE_URL);
        await expect(this.page).toHaveTitle('Narratives AI - Pulsar111111111', { timeout: 5000 });
    }

    async logout() {
        await this.page.locator('button>svg[name="manageAccounts"]').click();
        await this.page.getByRole('menuitem', { name: 'Sign out' }).click();
        await expect(this.page.getByRole('tab', { name: 'Sign In' })).toBeVisible();
        await expect(this.page.getByRole('tab', { name: 'Create Account' })).toBeVisible();
    }
}