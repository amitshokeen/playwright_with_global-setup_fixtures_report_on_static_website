import { test } from '../pages/fixtures/basePage';

test('login, check title, and logout', async ({ loginPage }) => {
    await loginPage.login();
    await loginPage.logout();
});