import { Page, expect } from "@playwright/test";

export default class SearchPage {
    constructor(public page: Page) {}

    async search(){
        await this.page.goto('https://narratives-fe.dev.ml-feapps.pulsarinternal.com/');
        await this.page.getByPlaceholder('Search for narratives about').fill("Putin");
        await this.page.getByTestId('search-button').click();
    }
    
}