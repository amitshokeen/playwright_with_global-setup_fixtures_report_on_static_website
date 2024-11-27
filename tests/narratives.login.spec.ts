import { test, expect } from '@playwright/test';

test('login, check title, and logout', async ({ page }) => {
    await page.goto('https://narratives-fe.dev.ml-feapps.pulsarinternal.com/');
    await expect(page).toHaveTitle('Narratives AI - Pulsar', { timeout: 5000 });
    await page.locator('button>svg[name="manageAccounts"]').click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
});

test('search feature', async ({ page }) => {
    await page.goto('https://narratives-fe.dev.ml-feapps.pulsarinternal.com/');
    await page.getByPlaceholder('Search for narratives about').fill("Putin");
    await page.getByTestId('search-button').click();
});
