import { test as base } from "@playwright/test";
import LoginPage from "../loginPage";
import SearchPage from "../searchPage";

export const test = base.extend<{
    loginPage: LoginPage;
    searchPage: SearchPage;
}>({
    //define the fixtures
    loginPage: async({ page }, use) => {
        await use(new LoginPage(page));
    },
    searchPage: async({ page }, use) => {
        await use(new SearchPage(page));
    },
})