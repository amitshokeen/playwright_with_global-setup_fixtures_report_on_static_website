import { test } from '../pages/fixtures/basePage';

test('search feature', async ({ searchPage }) => {
    await searchPage.search();
});