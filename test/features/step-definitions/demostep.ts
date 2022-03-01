import { Given, When,Then } from "@wdio/cucumber-framework"
import chai from "chai";

Given(/^ Google page is opened$/, async function (){
    console.log("Before browser opens")
    await browser.url("https://www.google.com");
    await browser.pause(1000)
    console.log("After browser openning");
});
When(/^search with (.*)$/, async function (searchItem) {
    let elem =await $(`[name=q]`)
    await elem.setValue(searchItem)
    await browser.keys("Enter")
});
Then(/^click on first search result$/, async function () {
    let elem = await $('<h3>')
    elem.click();
});
Then(/^ URL should match (.*)$/, async function (ExpectedURL){
    console.log(`>> expectedURL: ${ExpectedURL}`)
    let url = await browser.getUrl();
   chai.expect(url).to.equal(ExpectedURL);
});
        