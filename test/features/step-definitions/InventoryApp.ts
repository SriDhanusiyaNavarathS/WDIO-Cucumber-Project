import { Given, Then, When } from "@cucumber/cucumber";
import chai from "chai";

Given(/^Login into inventory web app$/, async function () {
  await browser.url("https://www.saucedemo.com/");
  await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  await browser.maximizeWindow();

  // await $(`#user-name`).setValue("standard_user");
  // await $(`#password`).setValue("secret_sauce");
  // await $(`#login-button`).click();

  //Login with another user -Reload page
  // await browser.pause(2000);
  // await browser.reloadSession();
  // await browser.url("https://www.saucedemo.com/");
  // await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  // await browser.maximizeWindow();

  // await $(`#user-name`).setValue("problem_user");
  // await $(`#password`).setValue("secret_sauce");
  // await $(`#login-button`).click();

  //Refresh  -Retrying
  try {
    await $(`#user-nam`).setValue("standard_user");
    await $(`#password`).setValue("secret_sauce");
    await $(`#login-button`).click();
  } catch (err) {
    console.log(" Error in login.. Retrying");
    await browser.refresh();
    await browser.pause(1000);
    await $(`#user-name`).setValue("standard_user");
    await $(`#password`).setValue("secret_sauce");
    await $(`#login-button`).click();
  }

  //Back and forward
  await browser.back();
  await browser.pause(1000);
  await browser.forward();
  //await browser.debug();
});
When(/^Inventory page should list (.*)$/, async function (NoOfProducts) {
  if (!NoOfProducts) throw Error("Invalid product counts:${NoOfProducts}");
  let ProdArr = await $$(`.inventory_item_name`);
  chai.expect(ProdArr.length).to.equal(parseInt(NoOfProducts));
});
Then(/^Validate all products have valid price$/, async function () {
  //Get Price list
  let PriceArr = await $$(`.inventory_item_price`);
  let PriceStrArr = [];
  for (let i = 0; i < PriceArr.length; i++) {
    let GetPriceList = await PriceArr[i].getText();
    PriceStrArr.push(GetPriceList);
  }
  console.log(`==Price List==: ${PriceStrArr}`);
  //convert string to number
  //let PriceNoArr = PriceStrArr.map(ele=>parseInt(ele.replace("$", ""))) //ParseInt rounds of the values and gives //The output is [ 29, 9, 15, 49, 7, 15 ]
  let PriceNoArr = PriceStrArr.map((ele) => +ele.replace("$", "")); //output is [ 29.99, 9.99, 15.99, 49.99, 7.99, 15.99 ]
  console.log(PriceNoArr);

  //Assert if value is <=0
  let invalidPriceArr = PriceNoArr.filter((ele) => ele <= 0); //PriceNoArr is a Array filter and map works with Array
  chai.expect(invalidPriceArr.length).to.equal(0);
});
