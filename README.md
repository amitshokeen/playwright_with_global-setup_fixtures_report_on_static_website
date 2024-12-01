
# Playwright with global-setup (for one-time login), POM, fixtures, and the report published on a static website 

The purpose of this project is to demonstrate some useful features of **Playwright** along with automated publishing of the test results on a static website - available for anyone on the internet.

## The useful features of Playwright incorporated in this project are:
1. **Authentication** approach takes inspiration from https://playwright.dev/docs/auth - basically, an **auth.setup.ts** file is created and some updates are made to the **playwright.config.ts** file. When run, a **user_login.json** gets generated. This is nothing but the json form of the session cookie - which is later consumed by the other tests and helps avoid re-login steps for each test.
2. Use of **Fixtures** for the **Page Object Model** 
    >- notice the **import { test } from '../pages/fixtures/basePage';** stmt. in the **spec** files under the **./tests** folder.
    >- This lets the main test be neat and allows for a professional POM approach to arranging tests as per pages.
    >- The pages are instantiaed in the **./pages/fixtures/basePage.ts** file.
    >- The test functions of each page live here: **./pages**

## Automated publishing of the Playwright test results on a static website:
1. Modified **playwright.yml** file: steps to **Configure AWS credentials** and **Deploy to S3** added.
2. Care was taken to ensure the above new steps **always** ran, irrespective of whether the Playwright tests passed or failed.
3. AWS S3 bucket setup:
   >- Created an S3 bucket and enabled static website hosting for the bucket.
   >- Let the index document be "index.html" - the same name as the playwright report file.
   >- Set the bucket policy to allow public read access.
4. Static Website hosting with custom domain and TLS inspired by: https://www.youtube.com/watch?v=X9cdkqBgLbs
5. Added AWS credentials to GitHub Secrets:
   >- Github repo settings > Secrets and Variables > Actions
   >- Added the secrets: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
6. Updated the S3 bucket CORS config to allow access from GitHub Pages domain.
   >- S3 bucket > "Permissions" tab > Edit the CORS section as below: 
   ```json
   [
    {
        "AllowedOrigins": ["https://<username>.github.io"],
        "AllowedMethods": ["GET", "HEAD"],
        "AllowedHeaders": ["*"],
        "MaxAgeSeconds": 3000
        
    }
   ]
   ```
   (here `<username>` is the GitHub username)
7. Push new code to the GitHub repo - should trigger the GitHub Actions which should update the S3 bucket with the latest **index.html** Playwright report file.
8. If following the above step #4, then due to CloudFront caching, the S3 website end point will not show the latest **index.html** file.
   - to fix that, the CloudFront cache should be "invalidated".
9. **Automatic invalidation**: Set up an AWS Lambda function triggered by S3 events to automatically create a CloudFront invalidation whenever the index.html file gets updated.
   


