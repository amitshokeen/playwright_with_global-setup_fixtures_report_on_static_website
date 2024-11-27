import { test, expect } from '@playwright/test';

test('search feature', async ({ page }) => {
    await page.goto('https://narratives-fe.dev.ml-feapps.pulsarinternal.com/');
    await page.getByPlaceholder('Search for narratives about').fill("Putin");
    await page.getByTestId('search-button').click();
});