import { test as setup, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const authFile = path.join(__dirname, '../testProject.outputDir/user_login.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps.
  await page.goto('https://narratives-fe.dev.ml-feapps.pulsarinternal.com/');
  await page.getByPlaceholder('Enter your Username').fill(process.env.LOGIN_USERNAME!);
  await page.getByPlaceholder('Enter your Password').fill(process.env.LOGIN_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://narratives-fe.dev.ml-feapps.pulsarinternal.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page).toHaveTitle('Narratives AI - Pulsar', { timeout: 10000 });
  await expect(page.locator('h2')).toContainText('Discover what narratives are shaping public opinion...');

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});