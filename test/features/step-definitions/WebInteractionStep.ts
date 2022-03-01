import { Given, When } from "@wdio/cucumber-framework";

Given(/^A web page opened$/, async function () {
  console.log("Before browser opens");
  await browser.url("/inputs");
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
});
When(/^perform web Interactions$/, async function () {
  /* Web Interaction with Input box
   */
  //convert num to string
  let num = 45454;
  let strNum = num.toString();

  let input = await $(`[type=number]`);
  //await input.setValue(strNum);
  await browser.pause(1000);
  // to type slow in text field
  await input.click();
  for(let i = 0; i <strNum.length ; i ++)
  {
    let chatStr = strNum.charAt(i);
    await browser.pause(1000)
    await browser.keys(chatStr)
  }
});
