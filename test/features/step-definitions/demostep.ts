import { Given, When,Then } from "@wdio/cucumber-framework"

Given(/^ Google page is opened$/, async function (){
    browser.url("https://www.google.co.in/");
});
When(/^search with <searchItem> $/, async function () {
    
});
Then(/^click on first search result$/, async function () {

});
Then(/^ URL should match <ExpectedURL> $/, async function (){
    
});
        