import { Page, expect } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();


export default class SearchPage {
    constructor(public page: Page) {}

    async search(){
        if (!process.env.BASE_URL) {
            throw new Error("BASE_URL environment variable is not set");
        }
        await this.page.goto(process.env.BASE_URL);
        await this.page.getByPlaceholder('Search for narratives about').fill("Putin");
        await this.page.getByTestId('search-button').click();
    }
    
}