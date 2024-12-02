
# Playwright with global-setup (for one-time login), POM, fixtures, and the report published on a static website 

This project demonstrates key features of **Playwright** and automates the publishing of test results on a static website accessible to anyone on the internet.

## The useful features of Playwright incorporated in this project are:
1. **Authentication** approach takes inspiration from https://playwright.dev/docs/auth - basically, an **auth.setup.ts** file is created and some updates are made to the **playwright.config.ts** file. When run, a **user_login.json** gets generated. This is nothing but the json form of the session cookie - which is later consumed by the other tests and helps avoid re-login steps for each test.
2. Use of **Fixtures** for the **Page Object Model** 
    >- notice the **import { test } from '../pages/fixtures/basePage';** stmt. in the **spec** files under the **./tests** folder.
    >- This lets the main test be neat and allows for a professional POM approach to arranging tests as per pages.
    >- The pages are instantiated in the **./pages/fixtures/basePage.ts** file.
    >- The test functions of each page live here: **./pages**

## Automated publishing of the Playwright test results on a static website:
1. The default **playwright.yml** file has been modified: steps to **Configure AWS credentials** and **Deploy to S3** have been added.
2. Care has been taken to ensure the above new steps **always** run, irrespective of whether the Playwright tests pass or fail.
3. AWS S3 bucket setup:
   >- An S3 bucket with **static website hosting** has been used.
   >- The index document of the static website is "index.html" - the same name as the playwright report file.
   >- The bucket policy has been setup to allow public read access.
4. Static Website hosting with custom domain and TLS has been inspired by: https://www.youtube.com/watch?v=X9cdkqBgLbs
5. AWS credentials to GitHub Secrets have been added:
   >- Github repo settings > Secrets and Variables > Actions
   >- The secrets added are: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
6. The S3 bucket CORS config has been updated to allow access from the GitHub Pages domain.
   >- S3 bucket > "Permissions" tab > the CORS section edited as below: 
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
7. As soon as new code is pushed to the GitHub repo, it triggers the GitHub Actions which updates the S3 bucket with the latest **index.html** Playwright report file.
8. If following the above step #4, then due to CloudFront caching, the S3 website end point will not show the latest **index.html** file.
   - to fix that, the CloudFront cache should be "invalidated".
9. **Automatic invalidation**: Set up an AWS Lambda function triggered by S3 events to automatically create a CloudFront invalidation whenever the index.html file gets updated.
   
### This setup ensures seamless integration of Playwright tests with automated result publishing, providing an efficient and accessible way to view test outcomes.


